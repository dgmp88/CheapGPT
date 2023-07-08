export type Message = {
	content: string;
	role: 'assistant' | 'user';
	id?: string;
	timestamp?: Date;
};
