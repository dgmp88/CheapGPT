<script lang="ts">
	import GitHub from '$lib/images/GitHub.svelte';
	import Hamburger from '$lib/images/Hamburger.svelte';
	import { db } from '../db';
	import { browser } from '$app/environment';
	import { liveQuery } from 'dexie';
	let chatHistory = liveQuery(async () => {
		if (!browser) return [];
		// Sort by time
		return await db.chats.orderBy('timestamp').reverse().toArray();
	});
</script>

<div class="navbar bg-base-100 bg-opacity-50">
	{#if $chatHistory && $chatHistory.length > 0}
		<label for="drawer" class="btn btn-ghost drawer-button lg:hidden">
			<Hamburger class="w-10 h-10" />
		</label>
	{/if}
	<div class="flex-1">
		<span class="pl-4 font-semibold normal-case text-xl">CheapGPT</span>
	</div>
	<div class="flex-none">
		<a href="https://github.com/dgmp88/CheapGPT">
			<button class="btn btn-square btn-ghost">
				<GitHub class="w-10 h-10 px-1" />
			</button>
		</a>
	</div>
</div>
