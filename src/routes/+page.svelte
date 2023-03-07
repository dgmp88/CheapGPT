<script lang="ts">
	import { browser } from '$app/environment';
	import { apiKeyIsSet, setApiKey } from '../main';
	import Chats from './Chats.svelte';
	import Intro from './Intro.svelte';
	import TextInput from './TextInput.svelte';

	import chats from './stores';
	import { getResults } from '../main';

	$: requestApiKey = browser && !apiKeyIsSet();
	// $: requestApiKey = true; // For dev

	const onSubmitApiKey = (apiKey: string) => {
		setApiKey(apiKey);
		requestApiKey = false;
	};

	const onEnterChatText = (text: string) => {
		const newChats = [...$chats];
		newChats.push({ content: text, role: 'user' });
		chats.update(() => newChats);
		getResults();
	};
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="CheapGPT" />
</svelte:head>

<section>
	<div class="flex flex-col h-screen static py-4">
		{#if requestApiKey}
			<Intro onSubmit={onSubmitApiKey} />
		{:else}
			<Chats />
			<TextInput onComplete={onEnterChatText} />
		{/if}
	</div>
</section>
