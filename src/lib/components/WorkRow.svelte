<script lang="ts">
	/* eslint-disable svelte/no-navigation-without-resolve -- base + path is the internal-link convention here */
	import { base } from '$app/paths';
	import { ExternalLink } from 'lucide-svelte';
	import type { WorkItem } from '$lib/work';

	let {
		item,
		onenter,
		onleave
	}: {
		item: WorkItem;
		onenter: (rowEl: HTMLElement) => void;
		onleave: () => void;
	} = $props();
</script>

<a
	href={base + '/work/' + item.slug}
	class="group flex flex-1 flex-col gap-3 pb-1"
	onmouseenter={(e) => onenter(e.currentTarget)}
	onmouseleave={onleave}
>
	<div class="flex items-start gap-3">
		<p class="mt-0.5 text-sm leading-none whitespace-nowrap">{item.title}</p>
		<div class="h-px min-w-0 flex-1 self-center rounded bg-gray-300"></div>
		<div class="flex items-center gap-2 whitespace-nowrap">
			<p class="text-sm">{item.role}</p>
			{#if item.period}
				<p class="text-sm text-gray-500">{item.period}</p>
			{/if}
			<span
				class="inline-flex p-0.5 text-gray-400 transition-colors duration-200 ease-out group-hover:text-blue-600"
			>
				<ExternalLink size={14} strokeWidth={2} aria-hidden="true" />
			</span>
		</div>
	</div>
</a>
