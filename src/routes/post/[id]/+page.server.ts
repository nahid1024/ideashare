import { getPostById, getRefinements } from '$lib/server/helpers/post';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, locals }) => {
	const postId = params.id;
	if (!locals.user) {
		return redirect(302, '/auth/login');
	}

	const post = await getPostById(postId);

	const refinements = await getRefinements(post.id);

	return { post: post, refinements: refinements, userId: locals.user.id };
};
