<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const status = $derived(page.status ?? 500);
	const message = $derived(page.error?.message ?? '');
	const is404 = $derived(status === 404);
</script>

<svelte:head>
	<title>{is404 ? 'Page not found' : 'Error'} — Iver Lindholm</title>
</svelte:head>

<div class="flex-1 flex flex-col justify-center px-4 sm:px-6 py-12">
		<div class="w-full max-w-2xl mx-auto flex flex-col items-center text-center">
		<p class="text-blue-600 text-sm font-medium mb-2">
			{is404 ? '404' : status}
		</p>
		<h1 class="text-xl font-medium text-gray-900 mb-2">
			{is404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="text-sm text-gray-600 max-w-md">
			{is404
				? 'The page you’re looking for doesn’t exist or has been moved.'
				: message || 'An unexpected error occurred.'}
		</p>
	</div>
</div>
