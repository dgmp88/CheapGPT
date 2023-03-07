import type { Chat } from './types';

import Dexie, { type Table } from 'dexie';

export interface ChatLog {
	id: string;
	chats: Chat[];
	timestamp: Date;
}

export class ChatsDb extends Dexie {
	chats!: Table<ChatLog>;

	constructor() {
		super('myDatabase');
		this.version(2).stores({
			chats: '++id,timestamp' // Primary key and indexed props
		});
	}
}

export const db = new ChatsDb();
