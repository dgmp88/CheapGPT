<script>
	import Drawer from './Drawer.svelte';
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="w-screen h-screen">
	<!-- <div class="w-screen h-screen" id="bg"> -->
	<Drawer>
		<div class="h-screen relative">
			<Header />
			<slot />
		</div>
	</Drawer>
</div>

<style>
	#bg {
		background-image: url('background.svg');
		background-size: cover;
		background-position: center;
	}
</style>
