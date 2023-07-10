<script lang="ts">
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';
	import { db } from '../../db';
	import chats from '../../stores';
	import { getModel, type GPTModel } from '../../api';

	export let closeDrawer: () => void;

	// Workaround for sveltekit
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

{#each $chatHistory || [] as chatlog}
	<div class="w-full truncate">
		<button
			class="btn btn-ghost lowercase w-full text-left truncate justify-start"
			on:click={() => {
				chats.set(chatlog.chats);
				closeDrawer();
			}}>
			{chatlog.chats[0].content}
		</button>
	</div>
{/each}
