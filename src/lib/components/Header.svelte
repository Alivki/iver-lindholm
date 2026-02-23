<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- home link: base + '/' is equivalent to resolve('/') */
	import { base } from '$app/paths';
</script>

<header class="w-full px-4 sm:px-6 py-3 flex flex-row justify-start items-center gap-3">
	<a
		href={base + '/'}
		class="flex flex-row items-center gap-3 no-underline text-inherit hover:opacity-80 transition-opacity"
	>
		<img class="h-10" src="/logo.png" alt="" />
		<span class="text-lg font-medium">Iver Lindholm</span>
	</a>
</header>
