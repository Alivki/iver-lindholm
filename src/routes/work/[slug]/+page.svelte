<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- internal link uses base; external links cannot use resolve */
	import { base } from '$app/paths';
	import { tick, onMount } from 'svelte';
	import { page } from '$app/state';
	import { ArrowUpRight } from 'lucide-svelte';
	import type { PageProps } from './$types';

	onMount(() => {
		window.scrollTo(0, 0);
	});

	let { data }: PageProps = $props();
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

	// rAF-throttle the scroll handler so getBoundingClientRect runs at most once per frame.
	let scrollTicking = false;
	function onScroll() {
		if (scrollTicking) return;
		scrollTicking = true;
		requestAnimationFrame(() => {
			updateActiveFromScroll();
			scrollTicking = false;
		});
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
			window.addEventListener('scroll', onScroll, { passive: true });
		});
		return () => window.removeEventListener('scroll', onScroll);
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
	<meta name="twitter:title" content={pageTitle} />
	<meta name="twitter:description" content={pageDescription} />
	<meta name="twitter:image" content={pageImage} />
</svelte:head>

<div
	class="mx-auto flex w-full max-w-full flex-col px-4 pb-12 sm:px-6 lg:max-w-5xl lg:flex-row lg:flex-nowrap lg:gap-6"
>
	<div class="hidden w-48 shrink-0 lg:block" aria-hidden="true"></div>
	<article
		class="mx-auto w-full max-w-full min-w-0 flex-1 overflow-x-clip lg:mx-0 lg:max-w-2xl lg:px-6"
	>
		<nav class="pt-4 pb-6">
			<a href={base + '/'} class="text-sm text-gray-500 hover:text-gray-700">← back to home</a>
		</nav>
		<header class="mb-8">
			<h1 class="text-2xl font-medium text-gray-900">{meta.heading}</h1>
			<p class="mt-1 text-sm text-gray-500">
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
						class="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:underline"
					>
						Visit site
						<ArrowUpRight size={14} strokeWidth={2} aria-hidden="true" />
					</a>
				</p>
			{/if}
		</header>

		{#if meta.image}
			<figure
				class="work-img work-hero-transition mb-8 overflow-hidden rounded-xl border border-gray-200 shadow-md"
			>
				<img src={meta.image} alt={meta.title} class="block h-auto w-full" />
			</figure>
		{/if}

		<div
			bind:this={bodyEl}
			class="work-prose prose prose-sm max-w-full text-gray-700 prose-headings:font-medium prose-headings:text-gray-900 prose-p:text-gray-700 prose-blockquote:max-w-full prose-pre:max-w-full prose-pre:overflow-x-auto prose-pre:rounded-xl prose-pre:!bg-white prose-pre:text-inherit prose-img:block prose-img:h-auto prose-img:w-full prose-img:max-w-full prose-img:overflow-hidden prose-img:rounded-xl prose-img:border prose-img:border-gray-200 prose-img:shadow-md"
		>
			{#if Content}
				<Content />
			{:else}
				<p>Project description and details can go here.</p>
			{/if}
		</div>
	</article>

	<aside
		class="hidden w-48 shrink-0 pt-20 lg:block"
		aria-hidden={tocItems.length === 0 ? 'true' : undefined}
	>
		{#if tocItems.length > 0}
			<nav aria-label="In this post" class="sticky top-24">
				<h2 class="mb-3 text-xs font-semibold tracking-wider text-gray-500 uppercase">
					In this post
				</h2>
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
								class="block transition-colors {activeId === item.id
									? 'font-medium text-gray-900'
									: 'text-gray-600 hover:text-gray-900'}"
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
