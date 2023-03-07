import { fetchEventSource } from '@microsoft/fetch-event-source';

import { get } from 'svelte/store';

import type { Chat } from './types';
import chats from './routes/stores';
import { db } from './db';

export async function getResults() {
	const body = {
		model: 'gpt-3.5-turbo',
		messages: get(chats).map((chat) => ({ role: chat.role, content: chat.content })),
		stream: true
	};

	const token = getApiKey();

	const headers = {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`
	};
	const url = 'https://api.openai.com/v1/chat/completions';

	const chat: Chat = { role: 'assistant', content: '...', id: undefined };
	chats.update((chats) => [...chats, chat]);

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

			if (!chat.id) {
				chat.id = response.id as string;
				chat.content = ''; // clear placeholder
			}

			const text = choice.delta.content;

			if (typeof text === 'string') {
				chat.content += text;
			}
			const newChat = [...get(chats).slice(0, -1), chat];
			chats.update(() => newChat);
			db.chats.put({ id: chat.id, chats: newChat, timestamp: new Date() });
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
	return !!getApiKey();
}

export function setApiKey(apiKey: string) {
	localStorage.setItem('apiKey', apiKey);
}
