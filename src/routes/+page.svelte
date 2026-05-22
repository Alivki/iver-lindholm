<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- preview link points at an internal work route */
	import MainBodyHeader from '$lib/components/MainBodyHeader.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import ProjectsSection from '$lib/components/ProjectsSection.svelte';
	import SchoolSection from '$lib/components/SchoolSection.svelte';
	import ExtrasSection from '$lib/components/ExtrasSection.svelte';
	import NowSection from '$lib/components/NowSection.svelte';
	import SocialSection from '$lib/components/SocialSection.svelte';
	import BottomGlow from '$lib/components/BottomGlow.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import type { WorkItem } from '$lib/work';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const categories = $derived([
		{ label: 'Work', items: data.workItems.filter((i) => i.category === 'work') },
		{ label: 'School', items: data.workItems.filter((i) => i.category === 'school') },
		{ label: 'Hobby', items: data.workItems.filter((i) => i.category === 'hobby') }
	]);

	let hoveredPreview = $state<{ image: string; href: string | null } | null>(null);
	let previewTop = $state(0);
	let previewContainerEl = $state<HTMLElement | null>(null);

	function updatePreviewTop(row: HTMLElement) {
		const container = previewContainerEl;
		if (!container) return;
		const rowRect = row.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		previewTop = rowRect.top + rowRect.height / 2 - containerRect.top;
	}

	function handleRowEnter(rowEl: HTMLElement, item: WorkItem) {
		updatePreviewTop(rowEl);
		hoveredPreview = { image: item.image, href: base + '/work/' + item.slug };
	}

	function handleRowLeave() {
		hoveredPreview = null;
	}

	const SCROLL_KEY = 'home:scrollY';
	const WORK_ROUTE = '/work/[slug]';

	beforeNavigate(({ to }) => {
		if (to?.route?.id === WORK_ROUTE) {
			sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
		}
	});

	afterNavigate(({ from }) => {
		if (from?.route?.id !== WORK_ROUTE) return;
		const saved = sessionStorage.getItem(SCROLL_KEY);
		if (saved === null) return;
		sessionStorage.removeItem(SCROLL_KEY);
		const y = parseInt(saved, 10);
		if (!Number.isNaN(y)) {
			requestAnimationFrame(() => window.scrollTo(0, y));
		}
	});

	const jsonLd =
		'<script type="application/ld+json">' +
		JSON.stringify({
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: 'Iver Lindholm',
			url: 'https://iverlindholm.no',
			jobTitle: 'Fullstack Developer',
			sameAs: ['https://www.linkedin.com/in/iver-lindholm', 'https://github.com/Alivki']
		}) +
		'</' +
		'script>';
</script>

<svelte:head>
	<title>Iver Lindholm — Fullstack Developer</title>
	<meta
		name="description"
		content="Iver Lindholm — fullstack developer based in Trondheim, Norway. Portfolio with writeups of professional work, school projects, and hobby projects."
	/>
	<link rel="canonical" href="https://iverlindholm.no/" />
	<meta property="og:title" content="Iver Lindholm — Fullstack Developer" />
	<meta
		property="og:description"
		content="Fullstack developer based in Trondheim, Norway. Portfolio with writeups of professional work, school projects, and hobby projects."
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://iverlindholm.no/" />
	<meta property="og:image" content="https://iverlindholm.no/preview.png" />
	<meta name="twitter:title" content="Iver Lindholm — Fullstack Developer" />
	<meta
		name="twitter:description"
		content="Fullstack developer based in Trondheim, Norway. Portfolio with writeups of professional work, school projects, and hobby projects."
	/>
	<meta name="twitter:image" content="https://iverlindholm.no/preview.png" />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted, static JSON-LD string -->
	{@html jsonLd}
</svelte:head>

<div class="mt-6 flex w-full flex-col px-4 sm:mt-10 sm:px-6 lg:flex-row lg:justify-center">
	<!-- Left spacer: hidden on mobile/tablet, same width as preview on lg+ so center is centered -->
	<div class="hidden w-[min(520px,34vw)] shrink-0 lg:block xl:max-w-125" aria-hidden="true"></div>
	<!-- Center column: full width mobile, capped and centered on large screens -->
	<div
		class="flex w-full min-w-0 shrink-0 flex-col gap-14 md:max-w-2xl lg:w-[30vw] lg:max-w-xl lg:min-w-75 lg:-translate-x-6 xl:max-w-2xl"
	>
		<div
			class="fade-up flex flex-col items-stretch md:flex-row md:gap-5"
			style="--fade-delay: 80ms"
		>
			<div
				class="pointer-events-none hidden w-14 shrink-0 opacity-0 select-none md:block"
				aria-hidden="true"
			>
				about
			</div>
			<div class="min-w-0 flex-1">
				<MainBodyHeader />
			</div>
		</div>

		<AboutSection fadeDelay="140ms" />
		<ProjectsSection
			{categories}
			onRowEnter={handleRowEnter}
			onRowLeave={handleRowLeave}
			fadeDelay="200ms"
		/>
		<SchoolSection fadeDelay="260ms" />
		<ExtrasSection fadeDelay="320ms" />
		<NowSection fadeDelay="380ms" />
		<SocialSection fadeDelay="440ms" />
	</div>

	<!-- Preview column: hidden on mobile/tablet, same width as left spacer on lg+ -->
	<div
		class="relative hidden w-[min(520px,34vw)] shrink-0 pl-4 lg:block xl:max-w-125"
		bind:this={previewContainerEl}
		style="min-height: 420px;"
	>
		{#if hoveredPreview?.href}
			<div
				class="absolute left-4 w-[calc(100%-1rem)] -translate-y-1/2 transition-[top] duration-300 ease-out"
				style="top: {previewTop}px;"
			>
				<a
					href={hoveredPreview.href}
					class="work-preview work-hero-transition block overflow-hidden rounded-xl border border-gray-200 bg-gray-100 shadow-md"
					in:fly={{ y: -12, duration: 280, easing: cubicOut }}
					out:fly={{ y: 6, duration: 180, easing: cubicOut }}
				>
					<img src={hoveredPreview.image} alt="" class="aspect-video w-full object-cover" />
				</a>
			</div>
		{/if}
	</div>
</div>

<div class="md:hidden">
	<Footer />
</div>
<div class="hidden md:block">
	<BottomGlow />
</div>
