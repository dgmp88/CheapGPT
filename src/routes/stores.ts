import { writable } from 'svelte/store';
import type { Chat } from '../types';
import { db } from '../db';

const chats = writable<Chat[]>([]);
chats.subscribe((chats) => {
	const id = chats.find((chat) => chat.id)?.id;
	if (!id) return;
	db.chats.put({ id, chats });
	console.log('Added to db');
});
export default chats;
