import { fetchEventSource } from '@microsoft/fetch-event-source';

import { get } from 'svelte/store';

import type { Chat } from './types';
import chats from './routes/stores';
import { db } from './db';

export async function getResults() {
	const currentChats = get(chats);
	const body = {
		model: 'gpt-3.5-turbo',
		messages: currentChats.map((chat) => ({ role: chat.role, content: chat.content })),
		stream: true
	};

	const token = getApiKey();

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
	const url = 'https://api.openai.com/v1/chat/completions';

	// Create a new chat
	// The ID could be null until at least 1 response has come through
	let id = currentChats.find((chat) => chat.id)?.id;
	const chat: Chat = {
		role: 'assistant',
		content: '...',
		id,
		timestamp: new Date()
	};
	chats.update(() => [...currentChats, chat]);

	const ctrl = new AbortController();

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
				chat.content = ''; // clear placeholder
				chat.id = id;
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
			console.error(err);
			throw new Error('woopsie');
		}
	});
}

export function getApiKey() {
	return localStorage.getItem('apiKey');
}

export function apiKeyIsSet() {
	return getApiKey() !== null;
}

export function setApiKey(apiKey: string) {
	localStorage.setItem('apiKey', apiKey);
}
