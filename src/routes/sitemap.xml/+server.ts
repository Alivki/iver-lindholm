import { getWorkItems } from '$lib/work';
import type { RequestHandler } from './$types';

const SITE_URL = 'https://iverlindholm.no';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const items = getWorkItems();
	const today = new Date().toISOString().split('T')[0];

	const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
		{ loc: `${SITE_URL}/`, lastmod: today, changefreq: 'monthly', priority: '1.0' },
		...items.map((item) => ({
			loc: `${SITE_URL}/work/${item.slug}`,
			lastmod: today,
			changefreq: 'monthly',
			priority: '0.8'
		}))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
	.map(
		(u) => `	<url>
		<loc>${u.loc}</loc>
		<lastmod>${u.lastmod}</lastmod>
		<changefreq>${u.changefreq}</changefreq>
		<priority>${u.priority}</priority>
	</url>`
	)
	.join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
