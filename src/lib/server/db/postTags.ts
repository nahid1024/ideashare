import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { tags } from './tags';
import { relations } from 'drizzle-orm';

export const postTags = pgTable('post_tags', {
	id: uuid('id').primaryKey().defaultRandom(),
	postId: uuid('postId').references(() => posts.id),
	tagId: uuid('tagId').references(() => tags.id)
});

export const postTageRelation = relations(postTags, ({ one }) => ({
	tag: one(tags, {
		fields: [postTags.tagId],
		references: [tags.id]
	}),
	posts: one(posts, {
		fields: [postTags.postId],
		references: [posts.id]
	})
}));
