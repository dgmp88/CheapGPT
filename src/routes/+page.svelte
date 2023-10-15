<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { getApiKeyStatus, setApiKey } from '../api';
	import Chat from './chat/Chat.svelte';
	import Intro from './index/Intro.svelte';
	import TextInput from './chat/TextInput.svelte';
	import Drawer from './index/Drawer.svelte';
	import Header from './index/Header.svelte';
	import './styles.css';

	import chats from '../stores';
	import { getResults } from '../api';
	import UsingGeorgesKey from './chat/UsingGeorgesKey.svelte';

	let status = 'set';

	if (browser) {
		status = getApiKeyStatus();
		const urlParams = new URLSearchParams(window.location.search);
		const apiKey = urlParams.get('apiKey');
		if (apiKey) {
			setApiKey(apiKey);
			goto('./');
			status = getApiKeyStatus();
		}
	}

	const onSubmitApiKey = (apiKey: string) => {
		setApiKey(apiKey);
		status = getApiKeyStatus();
	};

	const onEnterChatText = (text: string) => {
		const newChats = [...$chats];
		newChats.push({ content: text, role: 'user' });
		chats.update(() => newChats);
		getResults();
	};
</script>

<svelte:head>
	<title>Cheap GPT</title>
	<meta name="description" content="CheapGPT" />
</svelte:head>

<Drawer>
	<Header />

	{#if status === 'unset'}
		<Intro />
	{:else if status === 'georges'}
		<UsingGeorgesKey />
	{:else}
		<Chat />
	{/if}
	<TextInput onComplete={status === 'set' ? onEnterChatText : onSubmitApiKey} />
</Drawer>
