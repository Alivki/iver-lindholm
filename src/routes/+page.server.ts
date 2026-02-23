import { getWorkItems } from '$lib/work';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return { workItems: getWorkItems() };
};
