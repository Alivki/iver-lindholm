<script lang="ts">
	import { onMount } from 'svelte';

	type Props = { hue?: number; saturate?: number };
	let { hue = 263, saturate = 1 }: Props = $props();
	const hueRotate = $derived(hue - 263);

	let sectionEl: HTMLElement | null = $state(null);
	let domeEl: HTMLElement | null = $state(null);

	onMount(() => {
		const section = sectionEl;
		const dome = domeEl;
		if (!section || !dome) return;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let cancelled = false;

		// Scroll-driven shape + opacity
		let unsubSize: (() => void) | undefined;
		let unsubFade: (() => void) | undefined;
		if (reduced) {
			dome.style.setProperty('--p', '1');
			dome.style.setProperty('--fade', '1');
		} else {
			import('motion').then(({ scroll }) => {
				if (cancelled) return;
				unsubSize = scroll(
					(progress: number) => {
						const p = Math.min(Math.max(progress, 0), 1);
						dome.style.setProperty('--p', String(p));
					},
					{ target: section, offset: ['start end', 'end end'] }
				);
				// Opacity ramps in early — well before the section enters the viewport
				unsubFade = scroll(
					(progress: number) => {
						const f = Math.min(Math.max(progress, 0), 1);
						dome.style.setProperty('--fade', String(f));
					},
					{ target: section, offset: ['start end', 'start 0.7'] }
				);
			});
		}

		// Smooth scroll only while the glow section is in the viewport
		let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
		let rafId = 0;

		const startLenis = () => {
			if (lenis || reduced || cancelled) return;
			import('lenis').then(({ default: Lenis }) => {
				if (cancelled || lenis) return;
				lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: false });
				const tick = (t: number) => {
					if (!lenis) return;
					lenis.raf(t);
					rafId = requestAnimationFrame(tick);
				};
				rafId = requestAnimationFrame(tick);
			});
		};

		const stopLenis = () => {
			if (rafId) cancelAnimationFrame(rafId);
			rafId = 0;
			lenis?.destroy();
			lenis = null;
		};

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) startLenis();
					else stopLenis();
				}
			},
			{ threshold: 0, rootMargin: '500px 0px 0px 0px' }
		);
		observer.observe(section);

		return () => {
			cancelled = true;
			unsubSize?.();
			unsubFade?.();
			observer.disconnect();
			stopLenis();
		};
	});
</script>

<section bind:this={sectionEl} class="bottom-glow">
	<p class="copyright">© 2025 Iver Lindholm. All rights reserved.</p>
</section>

<div
	bind:this={domeEl}
	class="dome-fixed"
	style="--hue-rotate: {hueRotate}deg; --saturate: {saturate}"
	aria-hidden="true"
></div>

<style>
	.bottom-glow {
		position: relative;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		height: 75vh;
		overflow: hidden;
	}

	.copyright {
		position: absolute;
		bottom: 1.25rem;
		left: 0;
		right: 0;
		text-align: center;
		font-size: 0.8125rem;
		color: rgb(75 85 99);
		z-index: 2;
	}

	.dome-fixed {
		--p: 0;
		--fade: 0;
		position: fixed;
		bottom: -30px;
		left: 0;
		width: 100vw;
		height: 100vh;
		pointer-events: none;
		z-index: 0;
		opacity: var(--fade);
		background-image:
			/* layer 1a — taller thinner white column — softer to blend */
			radial-gradient(
				ellipse calc(22vw + 14vw * var(--p)) calc(16vh + 150vh * var(--p)) at 50% 100% in oklch,
				oklch(1 0 0 / 0.7) 0%,
				oklch(1 0 0 / 0.66) 8%,
				oklch(1 0 0 / 0.61) 16%,
				oklch(1 0 0 / 0.55) 24%,
				oklch(0.99 0.01 240 / 0.48) 32%,
				oklch(0.98 0.02 244 / 0.41) 40%,
				oklch(0.96 0.035 248 / 0.34) 48%,
				oklch(0.94 0.05 254 / 0.27) 56%,
				oklch(0.92 0.06 260 / 0.21) 64%,
				oklch(0.9 0.07 268 / 0.15) 72%,
				oklch(0.88 0.08 278 / 0.1) 80%,
				oklch(0.88 0.07 290 / 0.05) 88%,
				oklch(0.88 0.06 305 / 0.02) 95%,
				transparent 100%
			),
			/* layer 1b — lower wider white arch — full width */
			radial-gradient(
				ellipse calc(60vw + 35vw * var(--p)) calc(10vh + 60vh * var(--p)) at 50% 100% in oklch,
				oklch(1 0 0 / 0.94) 0%,
				oklch(1 0 0 / 0.92) 8%,
				oklch(1 0 0 / 0.88) 18%,
				oklch(1 0 0 / 0.82) 28%,
				oklch(1 0 0 / 0.74) 38%,
				oklch(0.99 0.008 240 / 0.62) 48%,
				oklch(0.97 0.02 244 / 0.48) 58%,
				oklch(0.94 0.04 250 / 0.34) 68%,
				oklch(0.92 0.06 260 / 0.22) 78%,
				oklch(0.9 0.07 272 / 0.12) 86%,
				oklch(0.89 0.07 285 / 0.05) 94%,
				transparent 100%
			),
			/* layer 2 — tall narrow blue peak — heavier */
			radial-gradient(
				ellipse calc(28vw + 14vw * var(--p)) calc(5vh + 220vh * var(--p)) at 50% 100% in oklch,
				oklch(0.44 0.35 263 / 0.88) 0%,
				oklch(0.46 0.34 263 / 0.84) 6%,
				oklch(0.48 0.34 263 / 0.8) 12%,
				oklch(0.5 0.33 263 / 0.76) 18%,
				oklch(0.52 0.32 263 / 0.72) 24%,
				oklch(0.54 0.31 263 / 0.68) 30%,
				oklch(0.56 0.3 263 / 0.64) 36%,
				oklch(0.58 0.29 265 / 0.6) 42%,
				oklch(0.6 0.28 267 / 0.55) 48%,
				oklch(0.62 0.27 270 / 0.5) 54%,
				oklch(0.64 0.26 273 / 0.45) 60%,
				oklch(0.67 0.24 277 / 0.4) 66%,
				oklch(0.7 0.22 282 / 0.34) 72%,
				oklch(0.73 0.19 290 / 0.27) 78%,
				oklch(0.77 0.16 300 / 0.2) 84%,
				oklch(0.82 0.12 312 / 0.13) 90%,
				oklch(0.87 0.08 326 / 0.06) 95%,
				transparent 100%
			),
			/* layer 3 — bridge layer — heavier blue */
			radial-gradient(
				ellipse calc(60vw + 22vw * var(--p)) calc(8vh + 165vh * var(--p)) at 50% 100% in oklch,
				oklch(0.5 0.33 263 / 0.78) 0%,
				oklch(0.53 0.32 263 / 0.74) 10%,
				oklch(0.56 0.31 263 / 0.69) 20%,
				oklch(0.6 0.29 265 / 0.63) 32%,
				oklch(0.64 0.27 270 / 0.55) 44%,
				oklch(0.69 0.23 277 / 0.46) 56%,
				oklch(0.74 0.19 286 / 0.36) 68%,
				oklch(0.8 0.14 298 / 0.25) 78%,
				oklch(0.85 0.1 314 / 0.14) 87%,
				oklch(0.9 0.06 330 / 0.06) 94%,
				transparent 100%
			),
			/* layer 4 — wide blue base — taller and heavier (full width above the white) */
			radial-gradient(
				ellipse calc(86vw + 14vw * var(--p)) calc(18vh + 138vh * var(--p)) at 50% 100% in oklch,
				oklch(0.55 0.31 263 / 0.65) 0%,
				oklch(0.58 0.3 264 / 0.6) 14%,
				oklch(0.62 0.28 267 / 0.54) 28%,
				oklch(0.66 0.26 272 / 0.46) 42%,
				oklch(0.71 0.22 280 / 0.36) 56%,
				oklch(0.76 0.18 290 / 0.25) 70%,
				oklch(0.82 0.12 308 / 0.14) 82%,
				oklch(0.88 0.07 326 / 0.06) 92%,
				transparent 100%
			),
			/* layer 5 — wide soft halo — chilled */
			radial-gradient(
				ellipse calc(95vw + 8vw * var(--p)) calc(12vh + 88vh * var(--p)) at 50% 100% in oklch,
				oklch(0.74 0.17 266 / 0.18) 0%,
				oklch(0.78 0.14 276 / 0.16) 22%,
				oklch(0.83 0.11 290 / 0.13) 42%,
				oklch(0.87 0.08 308 / 0.09) 60%,
				oklch(0.9 0.06 328 / 0.05) 78%,
				oklch(0.94 0.03 350 / 0.02) 92%,
				transparent 100%
			),
			/* layer 6 — widest base — chilled mid, still fades to white at corners */
			radial-gradient(
				ellipse calc(115vw + 20vw * var(--p)) calc(22vh + 70vh * var(--p)) at 50% 100% in oklch,
				oklch(calc(0.58 - 0.1 * var(--p)) 0.3 263 / calc(0.32 + 0.26 * var(--p))) 0%,
				oklch(calc(0.62 - 0.08 * var(--p)) 0.27 264 / calc(0.28 + 0.22 * var(--p))) 12%,
				oklch(calc(0.66 - 0.06 * var(--p)) 0.24 268 / calc(0.24 + 0.18 * var(--p))) 24%,
				oklch(calc(0.7 - 0.05 * var(--p)) 0.21 274 / calc(0.2 + 0.14 * var(--p))) 36%,
				oklch(0.74 0.18 282 / calc(0.16 + 0.1 * var(--p))) 48%,
				oklch(0.79 0.14 292 / calc(0.11 + 0.07 * var(--p))) 60%,
				oklch(0.84 0.1 304 / calc(0.06 + 0.04 * var(--p))) 72%,
				oklch(0.89 0.07 320 / calc(0.03 + 0.015 * var(--p))) 82%,
				oklch(0.93 0.04 336 / 0.01) 90%,
				transparent 100%
			);
		filter: hue-rotate(calc(var(--hue-rotate, 0deg) + var(--p) * -15deg)) saturate(var(--saturate, 1));
	}

	@supports not (background-image: radial-gradient(in oklch, red, blue)) {
		.dome-fixed {
			background-image:
				radial-gradient(
					ellipse calc(58vw + 22vw * var(--p)) calc(10vh + 88vh * var(--p)) at 50% 100%,
					rgba(255, 255, 255, 0.88) 0%,
					rgba(255, 255, 255, 0.78) 20%,
					rgba(238, 244, 252, 0.56) 40%,
					rgba(200, 216, 248, 0.32) 60%,
					rgba(196, 200, 230, 0.13) 80%,
					transparent 100%
				),
				radial-gradient(
					ellipse calc(34vw + 18vw * var(--p)) calc(5vh + 200vh * var(--p)) at 50% 100%,
					rgba(36, 67, 240, 0.85) 0%,
					rgba(64, 96, 240, 0.7) 24%,
					rgba(108, 132, 238, 0.54) 40%,
					rgba(146, 162, 230, 0.42) 56%,
					rgba(180, 188, 222, 0.26) 72%,
					rgba(212, 206, 220, 0.12) 87%,
					transparent 100%
				),
				radial-gradient(
					ellipse calc(48vw + 14vw * var(--p)) calc(6vh + 130vh * var(--p)) at 50% 100%,
					rgba(54, 88, 240, 0.42) 0%,
					rgba(118, 144, 238, 0.27) 42%,
					rgba(188, 192, 222, 0.15) 70%,
					rgba(228, 212, 222, 0.04) 92%,
					transparent 100%
				),
				radial-gradient(
					ellipse calc(82vw + 12vw * var(--p)) calc(14vh + 70vh * var(--p)) at 50% 100%,
					rgba(80, 116, 240, 0.36) 0%,
					rgba(140, 160, 230, 0.25) 36%,
					rgba(196, 192, 220, 0.12) 70%,
					rgba(228, 212, 220, 0.03) 93%,
					transparent 100%
				),
				radial-gradient(
					ellipse calc(95vw + 8vw * var(--p)) calc(10vh + 78vh * var(--p)) at 50% 100%,
					rgba(140, 160, 240, 0.2) 0%,
					rgba(200, 198, 222, 0.13) 42%,
					rgba(228, 208, 220, 0.05) 78%,
					transparent 100%
				),
				radial-gradient(
					ellipse calc(110vw + 18vw * var(--p)) calc(18vh + 60vh * var(--p)) at 50% 100%,
					rgba(54, 88, 240, 0.32) 0%,
					rgba(120, 142, 235, 0.23) 28%,
					rgba(180, 188, 222, 0.13) 56%,
					rgba(220, 208, 220, 0.05) 82%,
					transparent 100%
				);
		}
	}
</style>
