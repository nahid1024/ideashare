import { form, getRequestEvent } from '$app/server';
import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { posts } from '$lib/server/db/posts';
import { postSchema } from '$lib/validation_schema';
import { error, redirect } from '@sveltejs/kit';

export const createPost = form(
	postSchema,
	async ({ title, description, solvedProblems, isAnonymous, intent }) => {
		const isPublished = intent === 'publish';
		const event = getRequestEvent();
		const session = await auth.api.getSession({
			headers: event.request.headers
		});

		if (!session?.user?.id) {
			error(401, 'Unauthorized');
		}
		await db.insert(posts).values([
			{
				title,
				description,
				solvedProblems,
				isAnonymous,
				isPublished,
				authorId: session.user.id
			}
		]);
		redirect(303, '/');
	}
);
