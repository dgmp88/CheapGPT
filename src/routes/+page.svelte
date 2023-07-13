<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { apiKeyIsSet, setApiKey } from '../api';
	import Chat from './chat/Chat.svelte';
	import Intro from './index/Intro.svelte';
	import TextInput from './chat/TextInput.svelte';
	import Drawer from './index/Drawer.svelte';
	import Header from './index/Header.svelte';
	import './styles.css';

	import chats from '../stores';
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

<Drawer>
	<div class="flex h-screen w-screen flex-col">
		<Header />

		{#if requestApiKey}
			<Intro />
		{:else}
			<Chat />
		{/if}
		<TextInput onComplete={requestApiKey ? onSubmitApiKey : onEnterChatText} />
	</div>
</Drawer>

<style>
	#bg {
		background-size: cover;
		background-position: center;
	}
</style>
