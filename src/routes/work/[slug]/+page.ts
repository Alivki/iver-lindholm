import { getWorkBySlug } from '$lib/work';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const result = getWorkBySlug(params.slug);
	if (!result) {
		error(404, { message: 'Work not found' });
	}
	return { content: result.content, meta: result.meta };
};
