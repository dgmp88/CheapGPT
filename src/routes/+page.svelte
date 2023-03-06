<script lang="ts">
	import { browser } from '$app/environment';
	import { apiKeyIsSet, setApiKey } from '../main';
	import Chats from './Chats.svelte';
	import TextInput from './TextInput.svelte';

	import chats from './stores';
	import { getResults } from '../main';

	$: requestApiKey = browser && !apiKeyIsSet();

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
	<div class="flex flex-col h-screen static">
		<h2 class="text-center text-2xl font-semibold">CheapGPT</h2>
		{#if requestApiKey}
			<article class="prose">
				<h1>API Key is not set</h1>
				<p>
					Get an API key from <a href="https://platform.openai.com/account/api-keys">here</a> and paste
					it below.
				</p>
				<p>
					Is it secure? Not particularly :D. I'm not sending it anywhere except to OpenAPI though,
					see here INSERT GITHUB LINK
				</p>
				<p>
					I strongly recommend setting a <a
						href="https://platform.openai.com/account/billing/limits">usage limit</a
					> you can afford to lose
				</p>
			</article>
			<TextInput onComplete={onSubmitApiKey} />
		{:else}
			<Chats />
			<TextInput onComplete={onEnterChatText} />
		{/if}
	</div>
</section>
