<script lang="ts">
	import './layout.css';
	import { page } from '$app/state';
	import { base } from '$app/paths';
	import { onNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();

	onNavigate((navigation) => {
		if (typeof document === 'undefined') return;
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

	const title = 'Iver Lindholm / portfolio';
	const description = 'Portfolio of Iver Lindholm';
	const logoUrl = $derived(page.url.origin + base + '/logo.png');
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="icon" href={favicon} />
	<!-- Open Graph -->
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={logoUrl} />
	<meta property="og:type" content="website" />
	<!-- Twitter -->
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={logoUrl} />
</svelte:head>
<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>
	<Footer />
</div>
