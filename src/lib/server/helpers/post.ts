import { db } from '../db';
import { posts } from '../db/posts';
import { postTopics } from '../db/postTopics';
import { desc, eq } from 'drizzle-orm';
import { error } from '@sveltejs/kit';
import { refinements } from '../db/refinements';
import type { PostCreation, Tags, Topics, RefinementSchema } from '$lib/types';

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

export const CreatePost = async (data: PostCreation, authorId: string) => {
	const isPublished = data.intent === 'publish';

	const [post] = await db
		.insert(posts)
		.values([
			{
				title: data.title,
				description: data.description,
				solvedProblems: data.solvedProblem ?? null,
				whoBenefits: data.whoBenefits ?? null,
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

export const getPostById = async (postId: string) => {
	const post = await db.query.posts.findFirst({
		where: eq(posts.id, postId),
		with: {
			postTopics: {
				with: {
					topic: true
				}
			},
			author: true
		}
	});

	if (!post) {
		throw error(404, 'Post not found');
	}
	return post;
};

export const getPostList = async (limit: number) => {
	const post = await db.query.posts.findMany({
		limit: limit,
		orderBy: desc(posts.createdAt),
		with: {
			postTopics: {
				with: {
					topic: true
				}
			},
			author: true
		}
	});
	if (!post) {
		throw error(404, 'Posts not found');
	}
	return post;
};

export const getRefinements = async (postId: string) => {
	const refinement = await db.query.refinements.findMany({
		orderBy: desc(refinements.createdAt),
		where: eq(refinements.postId, postId),
		with: {
			user: true,
			votes: true
		}
	});
	return refinement;
};

export const createRefinement = async (data: RefinementSchema) => {
	const [inserted] = await db
		.insert(refinements)
		.values({
			postId: data.postId,
			userId: data.userId,
			parentRefinementId: data.parentRefinementId ?? null,
			body: data.body,
			isHidden: data.isHidden ?? false,
			isEdited: data.isEdited ?? false,
			refinementType: data.refinementType
		})
		.returning({ id: refinements.id });
	if (!inserted) {
		throw new Error('Failed to create refinement');
	}
	const refinement = await db.query.refinements.findFirst({
		where: eq(refinements.id, inserted.id),
		with: {
			user: true,
			votes: true
		}
	});
	if (!refinement) {
		throw new Error('Created refinement not found');
	}
	return refinement;
};
