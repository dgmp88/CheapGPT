<script lang="ts">
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import chats from './stores';

	// Workaround for sveltekit
	let checked = false;
	let chatHistory = liveQuery(async () => {
		if (!browser) return [];
		// Sort by time
		const results = await db.chats.orderBy('timestamp').reverse().toArray();
		return results;
	});
</script>

<div class="drawer drawer-mobile">
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked />
	<div class="drawer-content">
		<slot />
	</div>

	<div class="drawer-side">
		<label for="drawer" class="drawer-overlay" />
		<ul class="menu p-4 w-80 bg-secondary bg-opacity-95 text-base-content overflow-hidden">
			<li class="text-center pb-2">
				<button
					class="mx-auto btn font-bold"
					on:click={() => {
						chats.update(() => []);
						checked = false;
					}}>
					+ New Chat
				</button>
			</li>
			{#each $chatHistory || [] as chatLog}
				<li class="max-w-full">
					<button
						class="max-w-full"
						on:click={() => {
							chats.set(chatLog.chats);
							checked = false;
						}}>
						<p class="truncate">
							{chatLog.chats[0].content}
						</p>
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
