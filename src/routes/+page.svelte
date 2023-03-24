<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { apiKeyIsSet, setApiKey } from '../main';
	import Chats from './chat/Chats.svelte';
	import Intro from './Intro.svelte';
	import TextInput from './TextInput.svelte';

	import chats from './stores';
	import { getResults } from '../main';

	const src = 'background.svg';

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
	<div class="flex-1 overflow-y-scroll pb-10" id="bg" style="background-image:url({src})">
		<div class="flex min-h-0">
			<Chats />
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
