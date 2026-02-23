export type WorkItem = {
	slug: string;
	title: string;
	role: string;
	period: string | null;
	image: string;
	externalLink?: string;
};

const modules = import.meta.glob<{
	metadata: Record<string, unknown>;
	default: import('svelte').Component;
}>('/src/lib/work/*.md', { eager: true });

export function getWorkItems(): WorkItem[] {
	return Object.entries(modules).map(([path, mod]) => {
		const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';
		const meta = mod.metadata ?? {};
		return {
			slug,
			title: (meta.title as string) ?? slug,
			role: (meta.role as string) ?? '',
			period: (meta.period as string | null) ?? null,
			image: (meta.image as string) ?? '',
			externalLink: meta.externalLink as string | undefined
		};
	});
}

export function getWorkBySlug(slug: string): {
	content: import('svelte').Component;
	meta: WorkItem;
} | null {
	const mod = modules[`/src/lib/work/${slug}.md` as keyof typeof modules];
	if (!mod) return null;
	const meta = (mod as (typeof modules)[string]).metadata ?? {};
	return {
		content: (mod as (typeof modules)[string]).default,
		meta: {
			slug,
			title: (meta.title as string) ?? slug,
			role: (meta.role as string) ?? '',
			period: (meta.period as string | null) ?? null,
			image: (meta.image as string) ?? '',
			externalLink: meta.externalLink as string | undefined
		}
	};
}
