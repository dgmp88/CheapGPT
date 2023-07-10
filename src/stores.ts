import { writable } from 'svelte/store';
import type { Message } from './types';

const chats = writable<Message[]>([]);

export default chats;
