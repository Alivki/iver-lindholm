<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- base + link is the internal-download convention */
	import { base } from '$app/paths';
	import { Download } from 'lucide-svelte';

	let { fadeDelay }: { fadeDelay: string } = $props();

	const extrasItems = [{ title: 'CV', label: 'Download', link: '/cv.pdf', download: true }];
</script>

<div
	class="fade-up flex flex-col items-start gap-2 md:flex-row md:gap-5"
	style="--fade-delay: {fadeDelay}"
>
	<div class="shrink-0 md:w-14">
		<p class="text-sm leading-none font-medium text-blue-600 md:font-normal">Extras</p>
	</div>
	<div class="flex w-full min-w-0 flex-col">
		{#each extrasItems as extra (extra.title)}
			<a
				href={base + extra.link}
				download={extra.download || undefined}
				target={extra.download ? undefined : '_blank'}
				rel={extra.download ? undefined : 'noopener noreferrer'}
				class="group/row flex cursor-pointer items-start gap-3 rounded pb-1 text-inherit no-underline"
			>
				<p class="mt-0.5 text-sm leading-none whitespace-nowrap">{extra.title}</p>
				<div class="h-px min-w-0 flex-1 self-center rounded bg-gray-300"></div>
				<div
					class="flex items-center gap-0 whitespace-nowrap decoration-current underline-offset-2 transition-colors group-hover/row:text-blue-600 group-hover/row:underline group-hover/row:decoration-blue-600"
				>
					<p class="text-sm text-gray-500">{extra.label}</p>
					<Download
						size={14}
						strokeWidth={2}
						class="ml-1 shrink-0 text-gray-400 transition-colors duration-200 ease-out group-hover/row:text-blue-600"
						aria-hidden="true"
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
