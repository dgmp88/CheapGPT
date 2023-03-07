<script>
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<Drawer>
	<div class="h-screen relative">
		<Header />
		<slot />
	</div>
</Drawer>
