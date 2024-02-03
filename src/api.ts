import { fetchEventSource } from '@microsoft/fetch-event-source';

import { get } from 'svelte/store';

import type { Message } from './types';
import chats from './stores';
import { db } from './db';

export async function getResults() {
	const currentChats = get(chats);
	const body = {
		model: getModel(),
		messages: currentChats.map((chat) => ({ role: chat.role, content: chat.content })),
		stream: true
	};
	console.log('body', body);

	const token = getApiKey();

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
	const url = 'https://api.openai.com/v1/chat/completions';

	// Create a new chat
	// The ID could be null until at least 1 response has come through
	let id = currentChats.find((chat) => chat.id)?.id;
	const chat: Message = {
		role: 'assistant',
		content: '...',
		id,
		timestamp: new Date()
	};
	chats.update(() => [...currentChats, chat]);

	const ctrl = new AbortController();

	let waiting = true;

	fetchEventSource(url, {
		method: 'POST',
		headers,
		body: JSON.stringify(body),
		signal: ctrl.signal,
		onmessage(ev) {
			const response = JSON.parse(ev.data);
			const choice = response.choices[0];

			if (choice.finish_reason === 'stop') {
				ctrl.abort();
			}

			if (!id) {
				id = response.id as string;
				chat.id = id;
			}

			if (waiting) {
				waiting = false;
				chat.content = '';
			}

			const text = choice.delta.content;

			if (typeof text === 'string') {
				chat.content += text;
			}
			const newChat = [...get(chats).slice(0, -1), chat];
			chats.update(() => newChat);
			db.chats.put({ id, chats: newChat, timestamp: new Date() });
		},
		onerror(err) {
			ctrl.abort();
			chats.update((chats) => [
				...chats.slice(0, -1),
				{ content: 'Error :(. Check your API key or the console perhaps?', role: 'assistant' }
			]);
			console.error('error', err);
			console.error('error', err.data);
			throw new Error('woopsie');
		}
	});
}

export function getApiKey() {
	return localStorage.getItem('apiKey');
}

export function getApiKeyStatus(): 'unset' | 'set' | 'georges' {
	const key = getApiKey();
	if (key === null) {
		return 'unset';
	}
	if (key === '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') {
		// if (key === 'sk-LHc') {
		return 'georges';
	}

	return 'set';
}

export function setApiKey(apiKey: string) {
	localStorage.setItem('apiKey', apiKey);
}

export const GPT3 = 'gpt-3.5-turbo';
export const GPT4 = 'gpt-4-0125-preview';
const models = [GPT3, GPT4];

export type GPTModel = (typeof models)[number];

export function setModel(model: GPTModel) {
	console.log('set model to', model);
	localStorage.setItem('model', model);
}

export function getModel(): GPTModel {
	// Default to 3.5
	const res = localStorage.getItem('model');
	if (models.includes(res as GPTModel)) {
		return res as GPTModel;
	}
	return GPT4;
}
