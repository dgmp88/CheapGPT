<script lang="ts">
	import SendIcon from '$lib/images/SendIcon.svelte';
	import { tick } from 'svelte';
	export let onComplete: (value: string) => void;
	let value = '';
	$: disabled = value.length === 0;

	// Focus on page load
	let inputElement: HTMLDivElement;
	const textFocus = async () => {
		await tick();
		if (inputElement) inputElement.focus();
	};
	textFocus();
</script>

<div class="fixed bottom-0 left-0 flex p-2 w-full lg:pl-[21rem] pr-4">
	<div
		class="textarea textarea-primary items-start justify-start w-full"
		contenteditable="true"
		bind:this={inputElement}
		bind:innerHTML={value}
		on:keydown={(event) => {
			// We're done if the user presses enter without shift
			if (event.key == 'Enter' && !event.shiftKey) {
				event.preventDefault();
				if (!disabled) {
					// We could bind:innerText to avoid parsing <br> when it's released, probably next time you read thiss
					// https://github.com/sveltejs/svelte/commit/aa4d0fc2643bdf968dbd72bceda1cce8bdfb5306
					onComplete(value.replace('<br>', '\n'));
					value = '';
				}
			}
		}} />

	<div>
		<button
			class="btn btn-circle btn-primary ml-3"
			on:click={(event) => {
				console.log('Clicked');
				if (!disabled) {
					onComplete(value);
					value = '';
				}
			}}
			{disabled}>
			<SendIcon class="w-8 h-10 p-0 translate-x-[2px]" />
		</button>
	</div>
</div>
