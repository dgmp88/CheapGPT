<script lang="ts">
	import type { Message } from '../../types';
	import hljs from 'highlight.js/lib/common';
	import 'highlight.js/styles/agate.css';

	export let message: Message;

	const styles = message.role === 'assistant' ? 'bg-base-300' : '';

	// Split into text/code block
	type Section = {
		content: string;
		isCode: boolean;
	};

	function getSections(content: string) {
		const sections: Section[] = [];
		let lastIndex = 0;
		let inTicks = false;

		while (true) {
			const ticksIndex = content.indexOf('```', lastIndex);

			if (ticksIndex === -1) {
				// Reached the end of the text
				sections.push({ content: content.slice(lastIndex).trim(), isCode: inTicks });
				break;
			}

			sections.push({ content: content.slice(lastIndex, ticksIndex).trim(), isCode: inTicks });

			inTicks = !inTicks;
			lastIndex = ticksIndex + 3;
		}
		return sections;
	}
	$: sections = getSections(message.content);
</script>

<div class={`p-10 ${styles}`}>
	{#each sections as section}
		{#if section.isCode}
			<pre>
			<code class="hljs rounded">{@html hljs.highlightAuto(section.content).value.trim()}</code>
				</pre>
		{:else}
			<div class="whitespace-pre-wrap">
				{section.content}
			</div>
		{/if}
	{/each}
</div>
