<script>
	import Drawer from './index/Drawer.svelte';
	import Header from './index/Header.svelte';
	import './styles.css';
</script>

<Drawer>
	<div class="flex h-full w-full flex-col">
		<Header />
		<slot />
	</div>
</Drawer>
