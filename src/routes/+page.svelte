<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- external links (work, social, preview) must not use resolve(); only internal (extras) use resolve() */
	import MainBodyHeader from '$lib/components/MainBodyHeader.svelte';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	let { data } = $props();
	const workItems = $derived(data?.workItems ?? []);

	let hoveredWorkIndex = $state<number | null>(null);
	let previewTop = $state(0);
	let previewContainerEl = $state<HTMLElement | null>(null);

	function updatePreviewTop(row: HTMLElement) {
		const container = previewContainerEl;
		if (!container) return;
		const rowRect = row.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		previewTop = rowRect.top + rowRect.height / 2 - containerRect.top;
	}

	const SCROLL_KEY = 'home:scrollY';

	beforeNavigate(({ to }) => {
		if (to?.url.pathname.startsWith(base + '/work/')) {
			sessionStorage.setItem(SCROLL_KEY, String(window.scrollY));
		}
	});

	afterNavigate(({ from }) => {
		if (!from) return;
		if (!from.url.pathname.startsWith(base + '/work/')) return;
		const saved = sessionStorage.getItem(SCROLL_KEY);
		if (saved === null) return;
		sessionStorage.removeItem(SCROLL_KEY);
		const y = parseInt(saved, 10);
		if (!Number.isNaN(y)) {
			requestAnimationFrame(() => window.scrollTo(0, y));
		}
	});


	const socialItems = [
		{ title: 'LinkedIn', handle: 'Follow', link: 'https://linkedin.com' },
		{ title: 'GitHub', handle: 'Follow', link: 'https://github.com' },
	];

	const schoolItems = [
		{ title: 'NTNU', degree: 'BSc Computer Science', period: '2024–27' },
	];

	const extrasItems = [
		{ title: 'CV', label: 'Download', link: '/cv.pdf', download: true },
	];
</script>

<div class="w-full flex flex-col lg:flex-row lg:justify-center min-h-screen my-6 sm:my-10 px-4 sm:px-6">
	<!-- Left spacer: hidden on mobile/tablet, same width as preview on lg+ so center is centered -->
	<div class="hidden lg:block w-[min(520px,34vw)] xl:max-w-125 shrink-0" aria-hidden="true"></div>
	<!-- Center column: full width mobile, capped and centered on large screens -->
	<div class="w-full md:max-w-2xl lg:w-[30vw] lg:min-w-75 lg:max-w-xl xl:max-w-2xl min-w-0 flex gap-10 flex-col shrink-0 lg:-translate-x-6">
			<div class="flex flex-col md:flex-row md:gap-5 items-stretch">
				<div class="hidden md:block w-14 shrink-0 opacity-0 select-none pointer-events-none" aria-hidden="true">about</div>
				<div class="min-w-0 flex-1">
					<MainBodyHeader />
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5">
				<p class="text-blue-600 text-sm font-medium md:font-normal shrink-0 md:w-14">About</p>
				<div class="gap-5 flex flex-col">
					<p class="text-sm flex flex-col gap-3">
					<span>
						Tempor consectetur aute nisi est deserunt eu consequat labore. Deserunt Lorem dolore cillum ullamco sunt mollit eiusmod. Voluptate ullamco dolore veniam culpa dolore anim elit. Elit ea duis laboris minim cillum proident amet sit veniam velit officia exercitation sint minim.
					</span>
						<span>
						Mollit eiusmod cupidatat irure officia deserunt commodo mollit irure ex. Id velit sint exercitation cillum officia dolore sit fugiat consectetur. Magna excepteur cupidatat eu eiusmod amet cillum minim exercitation. Sunt eu minim amet exercitation voluptate cillum fugiat non qui nostrud in quis anim id. Reprehenderit aliquip sit duis. Aliquip labore veniam voluptate Lorem aliqua sit laboris sit elit deserunt voluptate. Culpa elit do aute. Ad eu eiusmod non et non esse eu cupidatat fugiat.
					</span>
					</p>

					<img class="aspect-square object-cover object-top rounded-lg max-w-full min-w-0 w-full" src="/iver_compressed.webp" alt="logo" />
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start">
				<div class="shrink-0 md:w-14">
					<p class="text-blue-600 text-sm leading-none font-medium md:font-normal">Work</p>
					<div class="opacity-0 text-sm hidden md:block">about</div>
				</div>
				<div class="w-full flex flex-col min-w-0">
					{#each workItems as work, i (work.slug)}
						<a
							href={base + '/work/' + work.slug}
							class="work-row flex flex-col gap-3 flex-1 group pb-1 cursor-pointer no-underline text-inherit"
							role="button"
							tabindex="0"
							onmouseenter={(e) => { updatePreviewTop(e.currentTarget); hoveredWorkIndex = i; }}
							onmouseleave={() => { hoveredWorkIndex = null; }}
						>
							<div class="flex items-start gap-3">
								<p class="text-sm whitespace-nowrap leading-none mt-0.5">{work.title}</p>
								<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
								<div class="flex items-center gap-2 whitespace-nowrap">
									<p class="text-sm">{work.role}</p>
									{#if work.period}
										<p class="text-sm text-gray-500">{work.period}</p>
									{/if}
									<span class="text-gray-400 group-hover:text-blue-600 transition-colors p-0.5">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>


			<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start">
				<div class="shrink-0 md:w-14">
					<p class="text-blue-600 text-sm leading-none font-medium md:font-normal">School</p>
				</div>
				<div class="w-full flex flex-col min-w-0">
					{#each schoolItems as school (school.title + school.period)}
						<div class="flex items-start gap-3 pb-1">
							<p class="text-sm whitespace-nowrap leading-none mt-0.5">{school.title}</p>
							<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
							<div class="flex items-center gap-2 whitespace-nowrap">
								<p class="text-sm">{school.degree}</p>
								<p class="text-sm text-gray-500">{school.period}</p>
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start">
				<div class="shrink-0 md:w-14">
					<p class="text-blue-600 text-sm leading-none font-medium md:font-normal">Extras</p>
				</div>
				<div class="w-full flex flex-col min-w-0">
					{#each extrasItems as extra (extra.title)}
						<a
							href={base + extra.link}
							download={extra.download || undefined}
							target={extra.download ? undefined : '_blank'}
							rel={extra.download ? undefined : 'noopener noreferrer'}
							class="flex items-start gap-3 pb-1 cursor-pointer group/row rounded no-underline text-inherit"
						>
							<p class="text-sm whitespace-nowrap leading-none mt-0.5">{extra.title}</p>
							<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
							<div class="flex items-center gap-0 whitespace-nowrap underline-offset-2 group-hover/row:underline group-hover/row:text-blue-600 group-hover/row:decoration-blue-600 decoration-current transition-colors">
								<p class="text-sm text-gray-500">{extra.label}</p>
								<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover/row:text-blue-600 transition-colors shrink-0" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
							</div>
						</a>
					{/each}
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5">
				<p class="text-blue-600 text-sm font-medium md:font-normal shrink-0 md:w-14">About</p>
				<p class="text-sm flex flex-col gap-3 min-w-0">
					<span>
						Tempor consectetur aute nisi est deserunt eu consequat labore. Deserunt Lorem dolore cillum ullamco sunt mollit eiusmod. Voluptate ullamco dolore veniam culpa dolore anim elit. Elit ea duis laboris minim cillum proident amet sit veniam velit officia exercitation sint minim.
					</span>
					<span>
						Mollit eiusmod cupidatat irure officia deserunt commodo mollit irure ex. Id velit sint exercitation cillum officia dolore sit fugiat consectetur. Magna excepteur cupidatat eu eiusmod amet cillum minim exercitation. Sunt eu minim amet exercitation voluptate cillum fugiat non qui nostrud in quis anim id. Reprehenderit aliquip sit duis. Aliquip labore veniam voluptate Lorem aliqua sit laboris sit elit deserunt voluptate. Culpa elit do aute. Ad eu eiusmod non et non esse eu cupidatat fugiat.
					</span>
				</p>
			</div>


		<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start">
			<div class="shrink-0 md:w-14">
				<p class="text-blue-600 text-sm leading-none font-medium md:font-normal">Social</p>
				<div class="opacity-0 text-sm hidden md:block">about</div>
			</div>
			<div class="w-full flex flex-col min-w-0">
				{#each socialItems as social (social.title)}
					<a
						href={social.link}
						target="_blank"
						rel="noopener noreferrer"
						class="flex items-start gap-3 pb-1 cursor-pointer group/row rounded"
					>
						<p class="text-sm whitespace-nowrap leading-none mt-0.5">{social.title}</p>
						<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
						<div class="flex items-center gap-0 whitespace-nowrap underline-offset-2 group-hover/row:underline group-hover/row:text-blue-600 group-hover/row:decoration-blue-600 decoration-current transition-colors">
							<p class="text-sm text-gray-500">{social.handle}</p>
							<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 group-hover/row:text-blue-600 transition-colors shrink-0" aria-hidden="true"><path d="M7 7h10v10"/><path d="M7 17 17 7"/></svg>
						</div>
					</a>
				{/each}
			</div>
		</div>
	</div>

	<!-- Preview column: hidden on mobile/tablet, same width as left spacer on lg+ -->
	<div
		class="hidden lg:block w-[min(520px,34vw)] xl:max-w-125 shrink-0 relative pl-4"
		bind:this={previewContainerEl}
		style="min-height: 420px;"
	>
		{#if hoveredWorkIndex !== null}
			<div
				class="absolute left-4 w-[calc(100%-1rem)] -translate-y-1/2 transition-[top] duration-300 ease-out"
				style="top: {previewTop}px;"
			>
				<a
					href={base + '/work/' + workItems[hoveredWorkIndex].slug}
					class="work-preview block rounded-xl overflow-hidden border border-gray-200 bg-gray-100"
					style="view-transition-name: work-hero;"
					in:fly={{ y: -12, duration: 280, easing: cubicOut }}
					out:fly={{ y: 6, duration: 180, easing: cubicOut }}
				>
					<img
						src={workItems[hoveredWorkIndex].image}
						alt={workItems[hoveredWorkIndex].title}
						class="w-full aspect-video object-cover"
					/>
				</a>
			</div>
		{/if}
	</div>
</div>