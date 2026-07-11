import type { postSchema, tagSchema } from '$lib/validation_schema';
import { db } from '../db';
import { posts } from '../db/posts';
import z from 'zod';
//import { postTags } from '../db/postTags';

type CreatePost = z.infer<typeof postSchema>;
type AttachTag = z.infer<typeof tagSchema>;

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

export const AttachTag = async (tags: string[], postId: string) => {
	const values: AttachTag[] = [];

	tags.forEach((tag) => {
		values.push({ tagId: tag, postId: postId });
	});

	console.log(values);
};
