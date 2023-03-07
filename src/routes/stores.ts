import { writable } from 'svelte/store';
import type { Chat } from '../types';

const chats = writable<Chat[]>([]);

export default chats;
