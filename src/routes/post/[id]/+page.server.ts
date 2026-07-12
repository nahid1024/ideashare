import { getPostById } from '$lib/server/helpers/post';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const postId = params.id;

	const post = await getPostById(postId);

	return { post: post };
};
