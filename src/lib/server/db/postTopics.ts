import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { topics } from './topics';
import { relations } from 'drizzle-orm';

export const postTopics = pgTable('post_topics', {
	id: uuid('id').primaryKey().defaultRandom(),
	postId: uuid('postId').references(() => posts.id, { onDelete: 'cascade' }),
	tagId: uuid('tagId').references(() => topics.id, { onDelete: 'cascade' })
});

export const postTopiceRelation = relations(postTopics, ({ one }) => ({
	tag: one(topics, {
		fields: [postTopics.tagId],
		references: [topics.id]
	}),
	posts: one(posts, {
		fields: [postTopics.postId],
		references: [posts.id]
	})
}));
