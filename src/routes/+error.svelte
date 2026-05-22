<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- base + '/' is equivalent to resolve('/') */
	import { base } from '$app/paths';
	import { page } from '$app/state';

	const status = $derived(page.status ?? 500);
	const message = $derived(page.error?.message ?? '');
	const is404 = $derived(status === 404);
</script>

<svelte:head>
	<title>{is404 ? 'Page not found' : 'Error'} · Iver Lindholm</title>
</svelte:head>

<div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6">
	<div class="mx-auto flex w-full max-w-2xl flex-col items-center text-center">
		<p class="mb-2 text-sm font-medium text-blue-600">
			{is404 ? '404' : status}
		</p>
		<h1 class="mb-2 text-xl font-medium text-gray-900">
			{is404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="max-w-md text-sm text-gray-600">
			{is404
				? 'The page you’re looking for doesn’t exist or has been moved.'
				: message || 'An unexpected error occurred.'}
		</p>
		<a href={base + '/'} class="mt-6 text-sm text-blue-600 hover:underline">← back to home</a>
	</div>
</div>
