<script lang="ts">
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import chats from './stores';

	// Workaround for sveltekit
	let chatHistory = liveQuery(() => (browser ? db.chats.toArray() : []));
</script>

<div class="drawer drawer-mobile">
	<input id="drawer" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-gray-800 bg-opacity-90 text-base-content">
			{#if $chatHistory}
				{#each $chatHistory as chat (chat.id)}
					<li>
						<button
							on:click={() => {
								chats.update(() => chat.chats);
								document.querySelector('#drawer').checked = false;
							}}
						>
							{chat.chats[0].content}
						</button>
					</li>
				{/each}
			{/if}
		</ul>
	</div>
</div>
