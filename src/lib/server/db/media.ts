import { pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { relations } from 'drizzle-orm';

export const media = pgTable('media', {
	id: uuid('id').primaryKey().defaultRandom(),
	url: varchar('url'),
	postId: uuid('postId').references(() => posts.id, { onDelete: 'cascade' })
});

export const mediaRelation = relations(media, ({ one }) => ({
	post: one(posts, {
		fields: [media.postId],
		references: [posts.id]
	})
}));
