import type { getPostList, getRefinements } from '$lib/server/helpers/post';
import type {
	postSchema,
	profileSchema,
	refinementSchema,
	tagSchema,
	topicSchema
} from '$lib/validation_schema';
import type z from 'zod';

//Refinement Types
export type RefinementWithRelations = Awaited<ReturnType<typeof getRefinements>>[number];
export type RefinementSchema = z.infer<typeof refinementSchema>;

//Post Types
export type PostList = Awaited<ReturnType<typeof getPostList>>[number];
export type PostCreation = z.infer<typeof postSchema>;
export type Tags = z.infer<typeof tagSchema>;
export type Topics = z.infer<typeof topicSchema>;

//User types
export type Profile = z.infer<typeof profileSchema>;
