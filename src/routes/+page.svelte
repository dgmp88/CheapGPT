<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { apiKeyIsSet, setApiKey } from '../api';
	import Chat from './chat/Chat.svelte';
	import Intro from './Intro.svelte';
	import TextInput from './TextInput.svelte';

	import chats from './stores';
	import { getResults } from '../api';

	let requestApiKey = browser;

	if (browser) {
		requestApiKey = !apiKeyIsSet();
		const urlParams = new URLSearchParams(window.location.search);
		const apiKey = urlParams.get('apiKey');
		if (apiKey) {
			setApiKey(apiKey);
			goto('./');
			requestApiKey = false;
		}
	}

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
	<div class="flex-1 overflow-y-auto pb-10" id="bg">
		<div class="flex min-h-0">
			<Chat />
		</div>
	</div>
{/if}
<TextInput onComplete={requestApiKey ? onSubmitApiKey : onEnterChatText} />

<style>
	#bg {
		background-size: cover;
		background-position: center;
	}
</style>
