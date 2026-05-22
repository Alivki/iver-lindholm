<script lang="ts">
	let { fadeDelay }: { fadeDelay: string } = $props();
</script>

<div class="fade-up flex flex-col gap-2 md:flex-row md:gap-5" style="--fade-delay: {fadeDelay}">
	<p class="shrink-0 text-sm font-medium text-blue-600 md:w-14 md:font-normal">About</p>
	<div class="flex flex-col gap-5">
		<p class="flex flex-col gap-3 text-sm">
			<span>
				I'm a computer engineering student at NTNU in Trondheim. Before university I took the IKT-SK
				course at Gausdal high school, then served fifteen months in the Royal Norwegian Air Force
				as a guard at 113 Air Wing, Evenes Air Base.
			</span>
			<span>
				I work hard, plan carefully, and pick up new things quickly. That's how I learned to
				program, and it's how I show up for the projects I care about. Most of that energy now goes
				into the bachelor at NTNU and a volunteer role in TIHLDE as fullstack developer for Index on
				tihlde.org. It's a real codebase with real users, and the place where I've learned how
				proper team workflows actually work in practice.
			</span>
		</p>

		<img
			class="aspect-square w-full max-w-full min-w-0 rounded-lg object-cover object-top"
			src="/iver_compressed.webp"
			alt="Iver Lindholm"
		/>
	</div>
</div>
