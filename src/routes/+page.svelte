<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- external links (work, social, preview) must not use resolve(); only internal (extras) use resolve() */
	import MainBodyHeader from '$lib/components/MainBodyHeader.svelte';
	import BottomGlow from '$lib/components/BottomGlow.svelte';
	import { base } from '$app/paths';
	import { fly } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { ExternalLink, Download, ArrowUpRight } from 'lucide-svelte';

	let { data } = $props();
	const allItems = $derived(data?.workItems ?? []);
	const workItems = $derived(allItems.filter((i: { category: string }) => i.category === 'work'));
	const schoolItems = $derived(allItems.filter((i: { category: string }) => i.category === 'school'));
	const hobbyItems = $derived(allItems.filter((i: { category: string }) => i.category === 'hobby'));

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
		{ title: 'LinkedIn', handle: 'Follow', link: 'https://www.linkedin.com/in/iver-lindholm' },
		{ title: 'GitHub', handle: 'Follow', link: 'https://github.com/Alivki' },
	];

	const extrasItems = [
		{ title: 'CV', label: 'Download', link: '/cv.pdf', download: true },
	];
</script>

<svelte:head>
	<title>Iver Lindholm</title>
</svelte:head>

<div class="w-full flex flex-col lg:flex-row lg:justify-center mt-6 sm:mt-10 px-4 sm:px-6">
	<!-- Left spacer: hidden on mobile/tablet, same width as preview on lg+ so center is centered -->
	<div class="hidden lg:block w-[min(520px,34vw)] xl:max-w-125 shrink-0" aria-hidden="true"></div>
	<!-- Center column: full width mobile, capped and centered on large screens -->
	<div class="w-full md:max-w-2xl lg:w-[30vw] lg:min-w-75 lg:max-w-xl xl:max-w-2xl min-w-0 flex gap-14 flex-col shrink-0 lg:-translate-x-6">
			<div class="flex flex-col md:flex-row md:gap-5 items-stretch fade-up" style="--fade-delay: 80ms">
				<div class="hidden md:block w-14 shrink-0 opacity-0 select-none pointer-events-none" aria-hidden="true">about</div>
				<div class="min-w-0 flex-1">
					<MainBodyHeader />
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5 fade-up" style="--fade-delay: 140ms">
				<p class="text-blue-600 text-sm font-medium md:font-normal shrink-0 md:w-14">About</p>
				<div class="gap-5 flex flex-col">
					<p class="text-sm flex flex-col gap-3">
					<span>
						I'm a computer engineering student at NTNU in Trondheim. Before university I took the IKT-SK course at Gausdal upper secondary school, then served fifteen months in the Royal Norwegian Air Force as a guard at 113 Air Wing, Evenes Air Base.
					</span>
						<span>
						I work hard, plan carefully, and pick up new things quickly. That's how I learned to program, and it's how I show up for the projects I care about. Most of that energy now goes into the bachelor at NTNU and a volunteer role in TIHLDE as fullstack developer for Index on tihlde.org. It's a real codebase with real users, and the place where I've learned how proper team workflows actually work in practice.
					</span>
					</p>

					<img class="aspect-square object-cover object-top rounded-lg max-w-full min-w-0 w-full" src="/iver_compressed.webp" alt="logo" />
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-[3.5rem_1fr] gap-x-5 gap-y-2 md:gap-y-6 items-start fade-up" style="--fade-delay: 200ms">
				<div class="md:col-span-2 flex items-center gap-3">
					<p class="text-blue-600 text-sm leading-none font-medium md:font-normal whitespace-nowrap">Projects</p>
					<div class="flex-1 h-px bg-gray-200 rounded"></div>
				</div>

				<p class="text-gray-500 text-xs uppercase tracking-wider md:pt-1">Work</p>
				<div class="w-full flex flex-col min-w-0">
					{#each workItems as work (work.slug)}
						<a
							href={base + '/work/' + work.slug}
							class="work-row flex flex-col gap-3 flex-1 group pb-1 cursor-pointer no-underline text-inherit"
							role="button"
							tabindex="0"
							onmouseenter={(e) => { updatePreviewTop(e.currentTarget); hoveredPreview = { image: work.image, href: base + '/work/' + work.slug }; }}
							onmouseleave={() => { hoveredPreview = null; }}
						>
							<div class="flex items-start gap-3">
								<p class="text-sm whitespace-nowrap leading-none mt-0.5">{work.title}</p>
								<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
								<div class="flex items-center gap-2 whitespace-nowrap">
									<p class="text-sm">{work.role}</p>
									{#if work.period}
										<p class="text-sm text-gray-500">{work.period}</p>
									{/if}
									<span class="text-gray-400 group-hover:text-blue-600 transition-colors duration-200 ease-out p-0.5 inline-flex">
										<ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>

				<p class="text-gray-500 text-xs uppercase tracking-wider md:pt-1">School</p>
				<div class="w-full flex flex-col min-w-0">
					{#each schoolItems as school (school.slug)}
						<a
							href={base + '/work/' + school.slug}
							class="work-row flex flex-col gap-3 flex-1 group pb-1 cursor-pointer no-underline text-inherit"
							role="button"
							tabindex="0"
							onmouseenter={(e) => { updatePreviewTop(e.currentTarget); hoveredPreview = { image: school.image, href: base + '/work/' + school.slug }; }}
							onmouseleave={() => { hoveredPreview = null; }}
						>
							<div class="flex items-start gap-3">
								<p class="text-sm whitespace-nowrap leading-none mt-0.5">{school.title}</p>
								<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
								<div class="flex items-center gap-2 whitespace-nowrap">
									<p class="text-sm">{school.role}</p>
									{#if school.period}
										<p class="text-sm text-gray-500">{school.period}</p>
									{/if}
									<span class="text-gray-400 group-hover:text-blue-600 transition-colors duration-200 ease-out p-0.5 inline-flex">
										<ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>

				<p class="text-gray-500 text-xs uppercase tracking-wider md:pt-1">Hobby</p>
				<div class="w-full flex flex-col min-w-0">
					{#each hobbyItems as hobby (hobby.slug)}
						<a
							href={base + '/work/' + hobby.slug}
							class="work-row flex flex-col gap-3 flex-1 group pb-1 cursor-pointer no-underline text-inherit"
							role="button"
							tabindex="0"
							onmouseenter={(e) => { updatePreviewTop(e.currentTarget); hoveredPreview = { image: hobby.image, href: base + '/work/' + hobby.slug }; }}
							onmouseleave={() => { hoveredPreview = null; }}
						>
							<div class="flex items-start gap-3">
								<p class="text-sm whitespace-nowrap leading-none mt-0.5">{hobby.title}</p>
								<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
								<div class="flex items-center gap-2 whitespace-nowrap">
									<p class="text-sm">{hobby.role}</p>
									{#if hobby.period}
										<p class="text-sm text-gray-500">{hobby.period}</p>
									{/if}
									<span class="text-gray-400 group-hover:text-blue-600 transition-colors duration-200 ease-out p-0.5 inline-flex">
										<ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
									</span>
								</div>
							</div>
						</a>
					{/each}
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start fade-up" style="--fade-delay: 260ms">
				<div class="shrink-0 md:w-14">
					<p class="text-blue-600 text-sm leading-none font-medium md:font-normal">School</p>
				</div>
				<div class="w-full flex flex-col min-w-0">
					<div class="flex items-start gap-3 pb-1">
						<p class="text-sm whitespace-nowrap leading-none mt-0.5">NTNU</p>
						<div class="flex-1 h-px bg-gray-300 rounded self-center min-w-0"></div>
						<div class="flex items-center gap-2 whitespace-nowrap">
							<p class="text-sm">BSc Computer Science</p>
							<p class="text-sm text-gray-500">2024–27</p>
						</div>
					</div>
					<p class="text-sm text-gray-600 mt-3">
						A three-year engineering bachelor in computer science at NTNU Trondheim, specialising in systems development and agile methodology. The program covers the fundamentals of building software that can be trusted in production: system design, programming, databases, networks, cybersecurity and privacy, alongside operations and maintenance. Much of it runs through team projects where we use tools that give a solid baseline to keep building skills on top of, while working on real problems.
					</p>
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start fade-up" style="--fade-delay: 320ms">
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
								<Download size={14} strokeWidth={2} class="text-gray-400 group-hover/row:text-blue-600 transition-colors duration-200 ease-out shrink-0 ml-1" aria-hidden="true" />
							</div>
						</a>
					{/each}
				</div>
			</div>

			<div class="flex flex-col md:flex-row gap-2 md:gap-5 fade-up" style="--fade-delay: 380ms">
				<p class="text-blue-600 text-sm font-medium md:font-normal shrink-0 md:w-14">Now</p>
				<p class="text-sm flex flex-col gap-3 min-w-0 text-gray-600">
					<span>
						Sticking with Index through the last year of the bachelor. Next semester I'll most likely take INFT2503 (C++ for programmers), IMAT3011 (Mathematics for engineering 3 A), IDATT2503 (Software security and cryptography), and TDT4172 (Introduction to machine learning).
					</span>
					<span>
						Outside of that I tinker with whatever I find interesting and worth learning from in my spare time.
					</span>
				</p>
			</div>


		<div class="flex flex-col md:flex-row gap-2 md:gap-5 items-start fade-up mb-40" style="--fade-delay: 440ms">
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
							<ArrowUpRight size={14} strokeWidth={2} class="text-gray-400 group-hover/row:text-blue-600 transition-colors duration-200 ease-out shrink-0" aria-hidden="true" />
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
		{#if hoveredPreview?.href}
			<div
				class="absolute left-4 w-[calc(100%-1rem)] -translate-y-1/2 transition-[top] duration-300 ease-out"
				style="top: {previewTop}px;"
			>
				<a
					href={hoveredPreview.href}
					class="work-preview work-hero-transition block rounded-xl overflow-hidden border border-gray-200 shadow-md bg-gray-100"
					in:fly={{ y: -12, duration: 280, easing: cubicOut }}
					out:fly={{ y: 6, duration: 180, easing: cubicOut }}
				>
					<img
						src={hoveredPreview.image}
						alt=""
						class="w-full aspect-video object-cover"
					/>
				</a>
			</div>
		{/if}
	</div>
</div>

<BottomGlow />
