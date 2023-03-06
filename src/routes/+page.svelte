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
	<div class="flex flex-col h-screen static p-4">
		<h1 class="text-center text-6xl font-semibold pb-4">CheapGPT</h1>
		{#if requestApiKey}
			<article class="prose">
				<h2>API Key is not set</h2>
				<p>
					Get an API key from <a href="https://platform.openai.com/account/api-keys">here</a> and paste
					it below.
				</p>
				<p>
					I strongly recommend setting a <a
						href="https://platform.openai.com/account/billing/limits">usage limit</a
					> you can afford to lose
				</p>
				<p>
					Is it secure? Not particularly :D. I'm not sending it anywhere except to OpenAPI though,
					see <a href="https://github.com/dgmp88/CheapGPT">here</a> for the full source code.
				</p>
			</article>
			<TextInput onComplete={onSubmitApiKey} />
		{:else}
			<Chats />
			<TextInput onComplete={onEnterChatText} />
		{/if}
	</div>
</section>
