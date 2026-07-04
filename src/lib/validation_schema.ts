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

export const postSchema = z.object({
	title: z.string().nonempty(),
	description: z.string(),
	solvedProblems: z.string(),
	isAnonymous: z.boolean().default(false),
	intent: z.enum(['draft', 'publish'])
});
