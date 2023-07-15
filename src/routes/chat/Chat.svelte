<script lang="ts">
	import { onDestroy, tick } from 'svelte';
	import Message from './Message.svelte';
	import chats from '../../stores';

	let element: HTMLDivElement;
	const scrollToBottom = async () => {
		await tick(); // wait for state updates to finish

		if (element) {
			element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
		}
	};

	// Ensure scrollToBottom runs when chat store updates
	const unsubscribe = chats.subscribe(scrollToBottom);

	onDestroy(() => unsubscribe());
</script>

<div bind:this={element} class="py-5 overflow-y-auto overflow-x-none flex-1">
	{#if $chats.length === 0}
		<div class="text-center">Send a message to begin...</div>
	{:else}
		{#each $chats as chat}
			<Message message={chat} />
		{/each}
	{/if}
</div>
