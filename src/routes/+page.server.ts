import type { PageServerLoad } from './$types';
import { getPostList } from '$lib/server/helpers/post';

export const load: PageServerLoad = async () => {
	const posts = await getPostList(10);

	return { posts: posts };
};
