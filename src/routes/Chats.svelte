<script lang="ts">
	import ChatText from './ChatText.svelte';
	import chats from './stores.js';
</script>

<div>
	{#if $chats.length === 0}
		<div class="text-center">Send a message to begin...</div>
	{:else}
		{#each $chats as chat}
			<ChatText {chat} />
			<hr />
			<br />
		{/each}
	{/if}
</div>
