<script lang="ts">
	import WorkRow from '$lib/components/WorkRow.svelte';
	import type { WorkItem } from '$lib/work';

	let {
		categories,
		onRowEnter,
		onRowLeave,
		fadeDelay
	}: {
		categories: { label: string; items: WorkItem[] }[];
		onRowEnter: (rowEl: HTMLElement, item: WorkItem) => void;
		onRowLeave: () => void;
		fadeDelay: string;
	} = $props();
</script>

<div
	class="fade-up grid grid-cols-1 items-start gap-x-5 gap-y-2 md:grid-cols-[3.5rem_1fr] md:gap-y-6"
	style="--fade-delay: {fadeDelay}"
>
	<div class="flex items-center gap-3 md:col-span-2">
		<p class="text-sm leading-none font-medium whitespace-nowrap text-blue-600 md:font-normal">
			Projects
		</p>
		<div class="h-px flex-1 rounded bg-gray-200"></div>
	</div>

	{#each categories as cat (cat.label)}
		<p class="text-xs tracking-wider text-gray-500 uppercase md:pt-1">{cat.label}</p>
		<div class="flex w-full min-w-0 flex-col">
			{#each cat.items as item (item.slug)}
				<WorkRow {item} onenter={(el) => onRowEnter(el, item)} onleave={onRowLeave} />
			{/each}
		</div>
	{/each}
</div>
