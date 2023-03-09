<script lang="ts">
	import TextInput from './TextInput.svelte';
</script>

<article class="prose p-4">
	<h2>Why does this exist?</h2>
	<p>
		ChatGPT is fantastic and there is a free version. But sometimes you hit usage limits. ChatGPT
		Pro is great too, but costs $20/month.
	</p>

	<h2>To get started, set your API key</h2>
	<p>
		Get an API key from <a href="https://platform.openai.com/account/api-keys">here</a> and paste it
		below.
	</p>
	<p>
		I strongly recommend setting a <a href="https://platform.openai.com/account/billing/limits"
			>usage limit</a
		> you can afford to lose
	</p>
	<h3>Is it secure?</h3>
	<p>
		Nothing on this page is sent anywhere except to OpenAI. There is no tracking etc. See <a
			href="https://github.com/dgmp88/CheapGPT">here</a
		> for the full source code.
	</p>
	<p>It's unlikely but possible someone could get your key, so make sure to have a usage limit</p>

	<label for="security-modal" class="btn btn-primary btn-sm text-center">More security info</label>

	<!-- Put this part before </body> tag -->
	<input type="checkbox" id="security-modal" class="modal-toggle" />
	<label for="security-modal" class="modal cursor-pointer">
		<div class="modal-box prose">
			<h3>Security</h3>
			<p>
				Your API key is stored in plain text in <a
					href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage"
					>localStorage</a
				>. Someone with access to your computer could see it, or if someone managed to hack your
				browser.
			</p>
			<p>
				Neither of those are terribly likely, and with a spend limit the worst that could happen is
				it's maxed out and you'd need to change your keys.
			</p>
		</div>
	</label>
</article>
