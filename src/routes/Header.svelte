<script lang="ts">
	import GitHub from '$lib/images/GitHub.svelte';
	import Hamburger from '$lib/images/Hamburger.svelte';
</script>

<div class="navbar bg-base-100 bg-opacity-50">
	<label for="drawer" class="btn btn-ghost drawer-button lg:hidden">
		<Hamburger class="w-10 h-10" />
	</label>
	<div class="flex-1">
		<span class="pl-4 normal-case text-xl">CheapGPT</span>
	</div>
	<div class="flex-none">
		<!-- A link to github with  -->
		<a href="https://github.com/dgmp88/CheapGPT" target="_blank">
			<button class="btn btn-square btn-ghost">
				<GitHub class="w-10 h-10 px-1" />
			</button>
		</a>
	</div>
</div>
