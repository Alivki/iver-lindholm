<script lang="ts">
	import { base } from '$app/paths';
	import type { PageData } from './$types';

	let { data } = $props() as { data: PageData };
	const work = $derived(data.work);
</script>

<svelte:head>
	<title>{work.title} — Work</title>
</svelte:head>

<article class="max-w-2xl mx-auto px-4 sm:px-6 pb-12">
	<nav class="pt-4 pb-6">
		<a href={base + '/'} class="text-sm text-gray-500 hover:text-gray-700">← back to home</a>
	</nav>
	<header class="mb-8">
		<h1 class="text-2xl font-medium text-gray-900">{work.title}</h1>
		<p class="text-sm text-gray-500 mt-1">
			{work.role}
			{#if work.period}
				· {work.period}
			{/if}
		</p>
		{#if work.externalLink}
			<p class="mt-3">
				<a
					href={work.externalLink}
					target="_blank"
					rel="noopener noreferrer"
					class="text-blue-600 hover:underline inline-flex items-center gap-1.5 text-sm"
				>
					Visit site
					<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
				</a>
			</p>
		{/if}
	</header>

	{#if work.image}
		<figure class="rounded-xl overflow-hidden border border-gray-200 shadow-sm mb-8">
			<img
				src={work.image}
				alt={work.title}
				class="w-full aspect-video object-cover"
			/>
		</figure>
	{/if}

	{#if work.body}
		<div class="prose prose-sm text-gray-700 prose-p:text-gray-700 prose-headings:text-gray-900" data-body>
			{@html work.body}
		</div>
	{:else}
		<div class="prose prose-sm text-gray-700">
			<p>Project description and details can go here.</p>
		</div>
	{/if}
	</article>
