<script lang="ts">
	import { browser } from '$app/environment';
	import GitHub from '$lib/images/GitHub.svelte';
	import Hamburger from '$lib/images/Hamburger.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	let darkMode = false;

	if (browser) {
		darkMode = localStorage.getItem('theme') === 'forest';
	}

	// NOTE: the element that is using one of the theme attributes must be in the DOM on mount
	onMount(() => {
		themeChange(false);
		// 👆 false parameter is required for svelte
	});
</script>

<div class="navbar bg-base-100 bg-opacity-50">
	<label for="drawer" class="btn btn-ghost drawer-button lg:hidden">
		<Hamburger class="w-10 h-10" />
	</label>
	<div class="flex-1">
		<span class="pl-4 normal-case text-xl">CheapGPT</span>
	</div>
	<button
		class="text-lg flex gap-2 pr-4"
		data-toggle-theme="fantasy,forest"
		data-act-class="ACTIVECLASS">
		🌞
		<input type="checkbox" class="toggle" bind:checked={darkMode} />
		🌚
	</button>

	<div class="flex-none">
		<!-- A link to github with  -->
		<a href="https://github.com/dgmp88/CheapGPT" target="_blank">
			<button class="btn btn-square btn-ghost">
				<GitHub class="w-10 h-10 px-1" />
			</button>
		</a>
	</div>
</div>
