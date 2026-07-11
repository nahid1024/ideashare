import { z } from 'zod';

export const signupSchema = z
	.object({
		first_name: z.string().min(2, 'Name must be at least 2 characters'),
		last_name: z.string().min(2, 'Name must be at least 2 characters'),
		email: z.email('Invalid email address'),
		password: z.string().min(8),
		confirm_password: z.string()
	})
	.refine((data) => data.password === data.confirm_password, {
		message: "Passwords don't match",
		path: ['confirm_password']
	});

export const tagSchema = z.object({
	tagId: z.string().nonempty(),
	postId: z.string().nonempty()
});

export const topicSchema = z.object({
	name: z.string(),
	id: z.string()
});

export const postSchema = z.object({
	title: z.string().nonempty('Title is required').max(120, 'Title cannot exceed 120 characters'),
	description: z.string().nonempty('Description is requred'),
	solvedProblem: z.string().nullable(),
	whoBenefits: z.string().nullable(),
	isAnonymous: z.boolean().default(false),
	intent: z.enum(['draft', 'publish']).default('publish'),
	topics: topicSchema.array()
});
