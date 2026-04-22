<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- internal link uses base; external links cannot use resolve */
	import { base } from '$app/paths';
	import { tick, onMount } from 'svelte';
	import { page } from '$app/state';
	import { ArrowUpRight } from 'lucide-svelte';
	import type { PageData } from './$types';

	onMount(() => {
		window.scrollTo(0, 0);
	});

	let { data } = $props() as { data: PageData };
	const meta = $derived(data.meta);
	const Content = $derived(data.content);

	const pageTitle = $derived(`${meta.title} · Iver Lindholm`);
	const pageDescription = $derived(
		`${meta.title}${meta.role ? ' · ' + meta.role : ''}${meta.period ? ' · ' + meta.period : ''}. Project writeup by Iver Lindholm.`
	);
	const pageImage = $derived(page.url.origin + base + (meta.image || '/preview.png'));
	const canonical = $derived(page.url.origin + page.url.pathname);

	let bodyEl = $state<HTMLElement | null>(null);
	let tocItems = $state<{ id: string; text: string; level: number }[]>([]);
	let activeId = $state<string | null>(null);

	function updateActiveFromScroll() {
		const el = bodyEl;
		if (!el) return;
		const headings = el.querySelectorAll<HTMLElement>('h2[id], h3[id]');
		if (headings.length === 0) return;
		const topLine = 120;
		let current: string | null = null;
		for (let i = 0; i < headings.length; i++) {
			const rect = headings[i].getBoundingClientRect();
			if (rect.top <= topLine) {
				current = headings[i].id;
			}
		}
		activeId = current ?? headings[0]?.id ?? null;
	}

	$effect(() => {
		const el = bodyEl;
		if (!el || !Content) return;
		tick().then(() => {
			const headings = el.querySelectorAll('h2, h3');
			tocItems = Array.from(headings).map((h) => ({
				id: h.id || '',
				text: h.textContent?.trim() ?? '',
				level: parseInt(h.tagName.charAt(1), 10)
			}));
			updateActiveFromScroll();
			window.addEventListener('scroll', updateActiveFromScroll, { passive: true });
		});
		return () => window.removeEventListener('scroll', updateActiveFromScroll);
	});

	$effect(() => {
		const handler = () => {
			const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
			if (hash) activeId = hash;
		};
		if (typeof window !== 'undefined') {
			window.addEventListener('hashchange', handler);
		}
		handler();
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('hashchange', handler);
			}
		};
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href={canonical} />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={pageImage} />
	<meta property="og:type" content="article" />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
</svelte:head>

<div class="w-full max-w-full flex flex-col lg:flex-row lg:flex-nowrap lg:gap-6 lg:max-w-5xl mx-auto px-4 sm:px-6 pb-12">
	<div class="hidden lg:block w-48 shrink-0" aria-hidden="true"></div>
	<article class="min-w-0 flex-1 w-full max-w-full lg:max-w-2xl mx-auto lg:mx-0 lg:px-6 overflow-x-hidden">
		<nav class="pt-4 pb-6">
			<a href={base + '/'} class="text-sm text-gray-500 hover:text-gray-700">← back to home</a>
		</nav>
		<header class="mb-8">
			<h1 class="text-2xl font-medium text-gray-900">{meta.title}</h1>
			<p class="text-sm text-gray-500 mt-1">
				{meta.role}
				{#if meta.period}
					· {meta.period}
				{/if}
			</p>
			{#if meta.externalLink}
				<p class="mt-3">
					<a
						href={meta.externalLink}
						target="_blank"
						rel="noopener noreferrer"
						class="text-blue-600 hover:underline inline-flex items-center gap-1.5 text-sm"
					>
						Visit site
						<ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
					</a>
				</p>
			{/if}
		</header>

		{#if meta.image}
			<figure
				class="work-img work-hero-transition rounded-xl overflow-hidden border border-gray-200 shadow-md mb-8"
			>
				<img
					src={meta.image}
					alt={meta.title}
					class="w-full h-auto block"
				/>
			</figure>
		{/if}

		<div
			bind:this={bodyEl}
			class="prose prose-sm prose-img:max-w-full prose-blockquote:max-w-full prose-pre:max-w-full text-gray-700 prose-p:text-gray-700 prose-headings:text-gray-900 prose-headings:font-medium prose-img:rounded-xl prose-img:overflow-hidden prose-img:border prose-img:border-gray-200 prose-img:shadow-md prose-img:w-full prose-img:h-auto prose-img:block prose-pre:rounded-xl prose-pre:overflow-x-auto prose-pre:!bg-white prose-pre:text-inherit work-prose max-w-full"
		>
			{#if Content}
				<Content />
			{:else}
				<p>Project description and details can go here.</p>
			{/if}
		</div>
	</article>

	<aside class="hidden lg:block w-48 shrink-0 pt-20" aria-hidden={tocItems.length === 0 ? 'true' : undefined}>
		{#if tocItems.length > 0}
			<nav aria-label="In this post" class="sticky top-24">
				<h2 class="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">In this post</h2>
				<ul class="space-y-2 text-sm">
					{#each tocItems as item (item.id)}
						<li class={item.level === 3 ? 'pl-3' : ''}>
							<a
								href={item.id ? `#${item.id}` : undefined}
								onclick={(e) => {
									if (!item.id) return;
									e.preventDefault();
									activeId = item.id;
									const el = document.getElementById(item.id);
									el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
									history.replaceState(null, '', `#${item.id}`);
								}}
								class="block transition-colors {activeId === item.id ? 'text-gray-900 font-medium' : 'text-gray-600 hover:text-gray-900'}"
							>
								{item.text}
							</a>
						</li>
					{/each}
				</ul>
			</nav>
		{/if}
	</aside>
</div>
