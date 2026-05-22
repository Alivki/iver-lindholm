<script lang="ts">
	let { fadeDelay }: { fadeDelay: string } = $props();
</script>

<div class="fade-up flex flex-col gap-2 md:flex-row md:gap-5" style="--fade-delay: {fadeDelay}">
	<p class="shrink-0 text-sm font-medium text-blue-600 md:w-14 md:font-normal">Now</p>
	<p class="flex min-w-0 flex-col gap-3 text-sm text-gray-600">
		<span>
			Sticking with Index through the last year of the bachelor. Next semester I'll most likely take
			INFT2503 (C++ for programmers), IMAT3011 (Mathematics for engineering 3 A), IDATT2503
			(Software security and cryptography), and TDT4172 (Introduction to machine learning).
		</span>
		<span>
			Outside of that I tinker with whatever I find interesting and worth learning from in my spare
			time.
		</span>
	</p>
</div>
