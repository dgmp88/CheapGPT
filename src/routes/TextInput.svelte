<script lang="ts">
	import SendIcon from '$lib/images/SendIcon.svelte';
	import { tick } from 'svelte';
	export let onComplete: (value: string) => void;
	let value = '';
	$: value = '';
	$: disabled = value.length === 0;

	// Focus on page load
	let inputElement: HTMLTextAreaElement;
	const textFocus = async () => {
		await tick();
		if (inputElement) inputElement.focus();
	};
	textFocus();
</script>

<div class="absolute bottom-0 left-0 w-full p-3 flex">
	<label class="input-sizer stacked w-full">
		<textarea
			class="textarea textarea-primary"
			bind:this={inputElement}
			on:input={(event) => {
				if (inputElement.parentNode) {
					inputElement.parentNode.dataset.value = inputElement.value;
				}
			}}
			bind:value
			on:keydown={(event) => {
				if (event.key == 'Enter' && !event.shiftKey) {
					event.preventDefault();
					if (!disabled) {
						onComplete(value);
						value = '';
					}
				}
			}}
			rows="1"
			placeholder="Type a message..."
		/>
	</label>

	<button
		class="btn btn-circle btn-primary ml-3"
		on:click={(event) => {
			if (!disabled) {
				onComplete(value);
				value = '';
			}
		}}
		{disabled}
	>
		<SendIcon class="w-10 h-10 p-1" />
	</button>
</div>

<style>
	/* https://css-tricks.com/auto-growing-inputs-textareas/ */
	/* Modified from  */
	/* https://codepen.io/shshaw/pen/bGNJJBE */

	.input-sizer {
		display: inline-grid;
		vertical-align: top;
		align-items: center;
		position: relative;
	}

	.input-sizer::after {
		content: attr(data-value) ' ';
		visibility: hidden;
		white-space: pre-wrap;
	}

	.input-sizer::after,
	textarea {
		width: auto;
		min-width: 1em;
		font: inherit;
		resize: none;
	}

	.stacked {
		align-items: stretch;
	}

	.stacked::after,
	textarea {
		grid-area: 2 / 1;
	}
</style>
