import { CreatePost } from '$lib/server/helpers/post';
import { postSchema } from '$lib/validation_schema';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms'
import {zod4} from 'sveltekit-superforms/adapters'

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
  }

  const form = await superValidate(zod4(postSchema))
	return {form};
};


export const actions: Actions = {
  create: async (event) => {
    const form = await superValidate(event.request, zod4(postSchema));
    console.log(form.data);
    if (!form.valid) {
      return fail(400, {form})
    }

    const postId = await CreatePost({
      ...form.data
    }, event.locals.user.id)

    return message(form, { postId: postId, success:true });
  }
}
