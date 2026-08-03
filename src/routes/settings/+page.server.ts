import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../$types';
import { getUserInfo } from '$lib/server/helpers';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals.user) {
		return redirect(302, '/auth/login');
	}

	return {
		userInfo: await getUserInfo(locals.user.username)
	};
};
