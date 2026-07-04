import { pgTable, uuid, unique, text } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';

export const sparked = pgTable(
	'sparked',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		postId: uuid('postId').references(() => posts.id),
		userId: text('userId').references(() => user.id)
	},
	(table) => [unique().on(table.userId, table.postId)]
);

export const sparkedRelation = relations(sparked, ({ one }) => ({
	post: one(posts, {
		fields: [sparked.postId],
		references: [posts.id]
	}),
	user: one(user, {
		fields: [sparked.userId],
		references: [user.id]
	})
}));
