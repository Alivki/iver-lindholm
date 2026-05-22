<script lang="ts">
	import { lastUpdated } from '$lib/lastUpdated';
</script>

<div class="flex w-full items-center gap-3">
	<p class="text-md whitespace-nowrap">This is me</p>

	<div class="h-0.5 flex-1 rounded-md bg-blue-600"></div>

	<p class="text-sm whitespace-nowrap">
		Last updated: {lastUpdated}
	</p>
</div>
