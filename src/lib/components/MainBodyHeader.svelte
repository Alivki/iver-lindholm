<script lang="ts">
	import { lastUpdated } from '$lib/lastUpdated';
</script>

<div class="flex items-center gap-3 w-full">
	<p class="text-md whitespace-nowrap">
		This is me
	</p>

	<div class="flex-1 h-0.5 bg-blue-600 rounded-md"></div>

	<p class="whitespace-nowrap text-sm">
		Last updated: {lastUpdated}
	</p>
</div>

