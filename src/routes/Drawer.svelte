<script lang="ts">
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';
	import { db } from '../db';
	import chats from './stores';
	import { getModel, setModel, type GPTModel } from '../api';

	// Workaround for sveltekit
	let checked = false;
	let chatHistory = liveQuery(async () => {
		if (!browser) return [];
		// Sort by time
		const results = await db.chats.orderBy('timestamp').reverse().toArray();
		return results;
	});

	let model: GPTModel = 'gpt-3.5-turbo';
	if (browser) {
		model = getModel();
	}
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
					class="btn font-normal w-fit mx-auto"
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
			<div class="flex-1" />
			<div class="text-xs flex items-center justify-center gap-2">
				<span> GPT3.5 </span>
				<input
					type="checkbox"
					class="toggle"
					checked={model === 'gpt-4'}
					on:click={() => {
						model = model === 'gpt-4' ? 'gpt-3.5-turbo' : 'gpt-4';
						setModel(model);
					}} />
				<span> GPT4 </span>
			</div>
		</ul>
	</div>
</div>
