<script lang="ts">
	import type { Chat } from '../types';
	export let chat: Chat;

	const styles = chat.role === 'assistant' ? 'bg-white bg-opacity-10' : '';
</script>

<div class={`whitespace-pre-wrap p-4 ${styles}`}>
	{chat.content.trim()}
</div>
