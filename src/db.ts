import type { Chat } from './types';

import Dexie, { type Table } from 'dexie';

export interface ChatLog {
	id: string;
	chats: Chat[];
}

export class ChatsDb extends Dexie {
	// 'friends' is added by dexie when declaring the stores()
	// We just tell the typing system this is the case
	chats!: Table<ChatLog>;

	constructor() {
		super('myDatabase');
		this.version(1).stores({
			chats: '++id' // Primary key and indexed props
		});
	}
}

export const db = new ChatsDb();
