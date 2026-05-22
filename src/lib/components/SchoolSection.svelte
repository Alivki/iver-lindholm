<script lang="ts">
	let { fadeDelay }: { fadeDelay: string } = $props();
</script>

<div
	class="fade-up flex flex-col items-start gap-2 md:flex-row md:gap-5"
	style="--fade-delay: {fadeDelay}"
>
	<div class="shrink-0 md:w-14">
		<p class="text-sm leading-none font-medium text-blue-600 md:font-normal">School</p>
	</div>
	<div class="flex w-full min-w-0 flex-col">
		<div class="flex items-start gap-3 pb-1">
			<p class="mt-0.5 text-sm leading-none whitespace-nowrap">NTNU</p>
			<div class="h-px min-w-0 flex-1 self-center rounded bg-gray-300"></div>
			<div class="flex items-center gap-2 whitespace-nowrap">
				<p class="text-sm">BSc Computer Science</p>
				<p class="text-sm text-gray-500">2024–27</p>
			</div>
		</div>
		<p class="mt-3 text-sm text-gray-600">
			A three-year engineering bachelor in computer science at NTNU Trondheim, specialising in
			systems development and agile methodology. The program covers the fundamentals of building
			software that can be trusted in production: system design, programming, databases, networks,
			cybersecurity and privacy, alongside operations and maintenance. Much of it runs through team
			projects where we use tools that give a solid baseline to keep building skills on top of,
			while working on real problems.
		</p>
	</div>
</div>
