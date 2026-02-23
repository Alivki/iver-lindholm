import { getWorkBySlug } from '$lib/work';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ params }) => {
	const work = getWorkBySlug(params.slug);
	if (!work) {
		error(404, { message: 'Work not found' });
	}
	return { work };
};
