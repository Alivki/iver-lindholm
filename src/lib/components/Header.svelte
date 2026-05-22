<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- home link: base + '/' is equivalent to resolve('/') */
	import { base } from '$app/paths';
</script>

<header class="flex w-full flex-row items-center justify-start gap-3 px-4 py-3 sm:px-6">
	<a
		href={base + '/'}
		class="flex flex-row items-center gap-3 text-inherit no-underline transition-opacity hover:opacity-80"
	>
		<img class="h-10" src="/logo.png" alt="" />
		<span class="text-lg font-medium">Iver Lindholm</span>
	</a>
</header>
