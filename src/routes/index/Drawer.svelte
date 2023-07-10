<script lang="ts">
	import { browser } from '$app/environment';

	import chats from '../../stores';
	import { getModel, setModel, type GPTModel } from '../../api';
	import ChatHistory from '../chat/ChatHistory.svelte';

	let open = false;

	let model: GPTModel = 'gpt-3.5-turbo';
	if (browser) {
		model = getModel();
	}
</script>

<div class="drawer lg:drawer-open">
	<input id="drawer" type="checkbox" class="drawer-toggle" bind:checked={open} />
	<div class="drawer-content flex flex-col items-center justify-center">
		<slot />
	</div>
	<div class="drawer-side">
		<label for="drawer" class="drawer-overlay" />
		<div class="flex flex-col gap-4 p-4 w-80 h-full bg-base-200 text-base-content">
			<div class="text-center p-2">
				<button
					class="btn btn-primary font-normal w-fit"
					on:click={() => {
						chats.update(() => []);
						open = false;
					}}>
					+ new chat
				</button>
			</div>
			<div class="flex-1 overflow-auto">
				<ChatHistory
					closeDrawer={() => {
						open = false;
					}} />
			</div>
			<div class="text-xs flex items-center justify-center gap-2">
				<span> gpt3.5 </span>
				<input
					type="checkbox"
					class="toggle"
					checked={model === 'gpt-4'}
					on:click={() => {
						model = model === 'gpt-4' ? 'gpt-3.5-turbo' : 'gpt-4';
						setModel(model);
					}} />
				<span> gpt4 </span>
			</div>
		</div>
	</div>
</div>
