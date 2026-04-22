<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (typeof document === 'undefined') return;
		if (!window.matchMedia('(min-width: 1024px)').matches) return;
		const startViewTransition = (document as Document & {
			startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> };
		}).startViewTransition;
		if (!startViewTransition) return;
		return new Promise<void>((resolve) => {
			startViewTransition.call(document, async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	const siteName = 'Iver Lindholm';
	const defaultTitle = 'Iver Lindholm';
	const defaultDescription =
		'Portfolio of Iver Lindholm, a fullstack developer based in Trondheim. Projects across SvelteKit, TypeScript and cloud tooling, plus writeups of work, school and side projects.';
	const ogImage = $derived(page.url.origin + base + '/preview.png');
	const canonical = $derived(page.url.origin + page.url.pathname);
</script>

<svelte:head>
	<title>{defaultTitle}</title>
	<meta name="description" content={defaultDescription} />
	<meta name="author" content={siteName} />
	<meta name="theme-color" content="#ffffff" />
	<link rel="canonical" href={canonical} />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:title" content={defaultTitle} />
	<meta property="og:description" content={defaultDescription} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={canonical} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={defaultTitle} />
	<meta name="twitter:description" content={defaultDescription} />
	<meta name="twitter:image" content={ogImage} />
</svelte:head>
<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
