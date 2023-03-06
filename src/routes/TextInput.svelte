<script lang="ts">
	import { tick } from 'svelte';
	export let onComplete: (value: string) => void;

	let value = '';
	$: value = '';
	$: submitDisabled = value.length === 0;

	// Focus on page load
	let textAreaElement: HTMLTextAreaElement;
	const textFocus = async () => {
		await tick();
		if (textAreaElement) textAreaElement.focus();
	};
	textFocus();
</script>

<div class="absolute bottom-0 left-0">
	<textarea
		class="textarea textarea-primary w-full m-2"
		placeholder=""
		bind:value
		bind:this={textAreaElement}
		on:keydown={(event) => {
			if (event.key == 'Enter') {
				event.preventDefault();
				if (!submitDisabled) {
					onComplete(value);
					value = '';
				}
			}
		}}
	/>
</div>
