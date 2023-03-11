<script lang="ts">
	import type { Chat } from '../../types';
	import hljs from 'highlight.js/lib/common';
	import 'highlight.js/styles/agate.css';

	export let chat: Chat;

	const styles = chat.role === 'assistant' ? 'bg-white bg-opacity-10' : '';

	let { content } = chat;
	console.log(content);
	content = content.trim();

	// Split into text/code block
	const ticks = [...content.matchAll(/```/g)].map((m) => m.index);

	type Section = {
		content: string;
		isCode: boolean;
	};

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
</script>

<div class={`p-4 ${styles}`}>
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
