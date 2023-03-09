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

{#if requestApiKey}
	<Intro />
{:else}
	<div class="flex-1 overflow-y-scroll" id="bg">
		<div class="flex min-h-0">
			<Chats />
		</div>
	</div>
{/if}
<TextInput onComplete={requestApiKey ? onSubmitApiKey : onEnterChatText} />

<style>
	#bg {
		background-image: url('background.svg');
		background-size: cover;
		background-position: center;
	}
</style>
