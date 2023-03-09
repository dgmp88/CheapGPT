<script>
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<Drawer>
	<div class="flex h-screen w-full flex-col">
		<Header />
		<slot />
	</div>
</Drawer>
