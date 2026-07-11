import type { postSchema, tagSchema, topicSchema } from '$lib/validation_schema';
import { db } from '../db';
import { posts } from '../db/posts';
import z from 'zod';
import { postTopics } from '../db/postTopics';

type CreatePost = z.infer<typeof postSchema>;
type Tags = z.infer<typeof tagSchema>;
type Topics = z.infer<typeof topicSchema>;

export const AttachTopic = async (tags: Topics[], postId: string) => {
	const values: Tags[] = [];

	tags.forEach((tag) => {
		values.push({ tagId: tag.id, postId: postId });
	});
	try {
		await db.insert(postTopics).values(values);
	} catch (error) {
		console.log(error);
	}
};

export const CreatePost = async (data: CreatePost, authorId: string) => {
	const isPublished = data.intent === 'publish';

	const [post] = await db
		.insert(posts)
		.values([
			{
				title: data.title,
				description: data.description,
				solvedProblems: data.solvedProblem,
				whoBenefits: data.whoBenefits,
				isAnonymous: data.isAnonymous,
				isPublished: isPublished,
				authorId: authorId
			}
		])
		.returning({ id: posts.id });

	if (data.topics) {
		await AttachTopic(data.topics, post.id);
	}
	return post.id;
};
