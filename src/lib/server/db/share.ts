import { pgTable, uuid, timestamp, text } from 'drizzle-orm/pg-core';

import { posts } from './posts';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';

export const shares = pgTable('shares', {
	id: uuid('id').primaryKey().defaultRandom(),
	postId: uuid('postId').references(() => posts.id),
	userId: text('userId').references(() => user.id),
	createdAt: timestamp('created_at', {
		withTimezone: true,
		mode: 'date'
	})
		.defaultNow()
		.notNull()
});

export const sharesRelation = relations(shares, ({ one }) => ({
	post: one(posts, {
		fields: [shares.postId],
		references: [posts.id]
	}),
	user: one(user, {
		fields: [shares.userId],
		references: [user.id]
	})
}));
