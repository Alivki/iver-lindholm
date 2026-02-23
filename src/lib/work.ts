export type WorkItem = {
	slug: string;
	title: string;
	role: string;
	period: string | null;
	image: string;
	/** Optional external URL (e.g. live site). Shown on the work post page. */
	externalLink?: string;
	/** Optional custom writeup (HTML). When set, shown instead of the default placeholder. */
	body?: string;
};

export const workItems: WorkItem[] = [
	{
		slug: 'index',
		title: 'Index',
		role: 'Fullstack',
		period: 'Present',
		image: '/cover-image.jpg',
		externalLink: 'https://example.com/index'
	},
	{
		slug: 'texicon',
		title: 'Texicon',
		role: 'Fullstack',
		period: 'Present',
		image: '/texicon.webp',
		externalLink: 'https://example.com/texicon'
	},
	{
		slug: 'fotograf-kirsti-hovde',
		title: 'Fotograf Kirsti Hovde',
		role: 'Portfolio website',
		period: null,
		image: '/fotokirsti.png',
		externalLink: 'https://fotokirsti-frontend-production.up.railway.app',
		body: `
		<p>
			Custom portfolio site for photographer Kirsti Hovde. Built with a focus on showcasing her work with a clean, image-led layout.
		</p>
		
		<p class="mt-6">
			Tech: SvelteKit, Tailwind, deployed on Railway.
		</p>`
	}
];

export function getWorkBySlug(slug: string): WorkItem | undefined {
	return workItems.find((w) => w.slug === slug);
}
