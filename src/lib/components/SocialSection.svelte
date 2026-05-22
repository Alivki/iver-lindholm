<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- external profile links, resolve() does not apply */
	import { ArrowUpRight } from 'lucide-svelte';

	let { fadeDelay }: { fadeDelay: string } = $props();

	const socialItems = [
		{ title: 'LinkedIn', handle: 'Follow', link: 'https://www.linkedin.com/in/iver-lindholm' },
		{ title: 'GitHub', handle: 'Follow', link: 'https://github.com/Alivki' }
	];
</script>

<div
	class="fade-up mb-40 flex flex-col items-start gap-2 md:flex-row md:gap-5"
	style="--fade-delay: {fadeDelay}"
>
	<div class="shrink-0 md:w-14">
		<p class="text-sm leading-none font-medium text-blue-600 md:font-normal">Social</p>
		<div class="hidden text-sm opacity-0 md:block">about</div>
	</div>
	<div class="flex w-full min-w-0 flex-col">
		{#each socialItems as social (social.title)}
			<a
				href={social.link}
				target="_blank"
				rel="noopener noreferrer"
				class="group/row flex cursor-pointer items-start gap-3 rounded pb-1"
			>
				<p class="mt-0.5 text-sm leading-none whitespace-nowrap">{social.title}</p>
				<div class="h-px min-w-0 flex-1 self-center rounded bg-gray-300"></div>
				<div
					class="flex items-center gap-0 whitespace-nowrap decoration-current underline-offset-2 transition-colors group-hover/row:text-blue-600 group-hover/row:underline group-hover/row:decoration-blue-600"
				>
					<p class="text-sm text-gray-500">{social.handle}</p>
					<ArrowUpRight
						size={14}
						strokeWidth={2}
						class="shrink-0 text-gray-400 transition-colors duration-200 ease-out group-hover/row:text-blue-600"
						aria-hidden="true"
					/>
				</div>
			</a>
		{/each}
	</div>
</div>
