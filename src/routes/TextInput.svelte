<script lang="ts">
	import SendIcon from '$lib/images/SendIcon.svelte';
	import { tick } from 'svelte';
	export let onComplete: (value: string) => void;
	let value = '';
	const minRows = 3;
	const maxRows = 10;
	let rows = 3;
	$: disabled = value.length === 0;

	// Focus on page load
	let inputElement: HTMLDivElement;
	const textFocus = async () => {
		await tick();
		if (inputElement) inputElement.focus();
	};
	textFocus();
</script>

<div class="fixed bottom-0 left-0 flex items-center bg-base-100 p-4 w-full lg:pl-[21rem] pr-4">
	<textarea
		class="textarea textarea-primary w-full resize-none"
		{rows}
		bind:value
		on:keydown={(event) => {
			if (event.key == 'Enter' && !event.shiftKey) {
				event.preventDefault();
				if (!disabled) {
					// We could bind:innerText to avoid parsing <br> when it's released, probably next time you read thiss
					// https://github.com/sveltejs/svelte/commit/aa4d0fc2643bdf968dbd72bceda1cce8bdfb5306
					const formatted = value.replace(/(&nbsp;)|(<br>)/gi, '');
					onComplete(formatted);
					value = '';
				}
			}

			// We're done if the user presses enter without shift
			const lines = value.split(/\r\n|\r|\n/).length;
			rows = Math.min(Math.max(minRows, lines), maxRows);
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
