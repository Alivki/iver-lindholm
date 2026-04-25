export type WorkCategory = 'work' | 'school' | 'hobby';

export type WorkItem = {
	slug: string;
	title: string;
	heading: string;
	role: string;
	period: string | null;
	image: string;
	externalLink?: string;
	category: WorkCategory;
	order: number;
	hidden: boolean;
};

const modules = import.meta.glob<{
	metadata: Record<string, unknown>;
	default: import('svelte').Component;
}>('/src/lib/work/*.md', { eager: true });

function toItem(path: string, mod: (typeof modules)[string]): WorkItem {
	const slug = path.split('/').at(-1)?.replace('.md', '') ?? '';
	const meta = mod.metadata ?? {};
	const category = (meta.category as WorkCategory) ?? 'work';
	const title = (meta.title as string) ?? slug;
	return {
		slug,
		title,
		heading: (meta.heading as string) ?? title,
		role: (meta.role as string) ?? '',
		period: (meta.period as string | null) ?? null,
		image: (meta.image as string) ?? '',
		externalLink: meta.externalLink as string | undefined,
		category,
		order: typeof meta.order === 'number' ? meta.order : 0,
		hidden: meta.hidden === true
	};
}

export function getWorkItems(): WorkItem[] {
	return Object.entries(modules)
		.map(([path, mod]) => toItem(path, mod))
		.filter((item) => !item.hidden)
		.sort((a, b) => a.order - b.order);
}

export function getWorkBySlug(slug: string): {
	content: import('svelte').Component;
	meta: WorkItem;
} | null {
	const key = `/src/lib/work/${slug}.md` as keyof typeof modules;
	const mod = modules[key];
	if (!mod) return null;
	return {
		content: mod.default,
		meta: toItem(key as string, mod)
	};
}
