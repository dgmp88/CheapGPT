<script lang="ts">
	import Message from './Message.svelte';
	import chats from '../stores.js';
</script>

<div class="py-5 overflow-y-auto flex-1 w-[100px]">
	{#if $chats.length === 0}
		<div class="text-center">Send a message to begin...</div>
	{:else}
		{#each $chats as chat}
			<Message message={chat} />
		{/each}
	{/if}
</div>
