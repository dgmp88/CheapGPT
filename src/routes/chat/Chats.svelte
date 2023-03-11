<script lang="ts">
	import Chat from './Chat.svelte';
	import chats from '../stores.js';
</script>

<div class="py-2 overflow-y-auto flex-1">
	{#if $chats.length === 0}
		<div class="text-center">Send a message to begin...</div>
	{:else}
		{#each $chats as chat}
			<Chat {chat} />
		{/each}
	{/if}
</div>
