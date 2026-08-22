import type { PageServerLoad } from './$types';
import { getPostList } from '$lib/server/helpers/post';

export const load: PageServerLoad = async (event) => {
	const posts = getPostList(10);

	return { posts: posts, user: event.locals.user };
};
