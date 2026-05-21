<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	// Match on the route id, not the resolved pathname: it is stable regardless of base path.
	const isHome = $derived(page.route?.id === '/');

	onNavigate((navigation) => {
		if (typeof document === 'undefined') return;
		if (!window.matchMedia('(min-width: 1024px)').matches) return;
		const startViewTransition = (
			document as Document & {
				startViewTransition?: (cb: () => Promise<void> | void) => { finished: Promise<void> };
			}
		).startViewTransition;
		if (!startViewTransition) return;
		return new Promise<void>((resolve) => {
			startViewTransition.call(document, async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<!-- Site-wide tags only. Page-specific meta (title, description, og:*) lives in each +page. -->
	<title>Iver Lindholm</title>
	<meta name="author" content="Iver Lindholm" />
	<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
	<meta name="theme-color" content="#ffffff" />
	<link rel="manifest" href="/site.webmanifest" />
	<meta property="og:site_name" content="Iver Lindholm" />
	<meta property="og:locale" content="en_US" />
	<meta name="twitter:card" content="summary_large_image" />
</svelte:head>
<div class="flex min-h-screen flex-col">
	<Header />
	<main class="flex flex-1 flex-col">
		{@render children()}
	</main>
	{#if !isHome}
		<Footer />
	{/if}
</div>
