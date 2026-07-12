import { db } from '$lib/server/db';
import { topics } from '$lib/server/db/topics';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) {
		return redirect(302, '/auth/login');
	}

	const allTopics = await db.select().from(topics);

	return {
		topics: allTopics
	};
};
