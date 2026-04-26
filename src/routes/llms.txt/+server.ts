import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const body = `# Iver Lindholm

> Personal site of Iver Lindholm.

- [Home](https://iverlindholm.no/)
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600'
		}
	});
};
