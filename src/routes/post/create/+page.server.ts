import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}
};

// export const actions: Actions = {
// 	create: async (event) => {
// 		const form = await superValidate(event.request, zod4(postSchema));
// 		console.log(form.data);
// 		if (!form.valid) {
// 			return fail(400, { form });
// 		}

// 		const postId = await CreatePost(
// 			{
// 				...form.data
// 			},
// 			event.locals.user.id
// 		);

// 		return message(form, { postId: postId, success: true });
// 	}
// };
