import type { postSchema } from '$lib/validation_schema';
import { db } from '../db';
import { posts } from '../db/posts';
import z from 'zod';

type CreatePost = z.infer<typeof postSchema>;

export const CreatePost = async (data: CreatePost, authorId: string) => {
	const isPublished = data.intent === 'publish';

	const [post] = await db
		.insert(posts)
		.values([
			{
				title: data.title,
				description: data.description,
				solvedProblems: data.solvedProblem,
				isAnonymous: data.isAnonymous,
				isPublished: isPublished,
				authorId: authorId
			}
		])
		.returning({ id: posts.id });

	return post.id;
};
