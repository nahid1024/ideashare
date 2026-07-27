import { pgTable, text, unique, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';

export const followers = pgTable(
	'followers',
	{
		id: uuid().notNull().defaultRandom().primaryKey(),
		userId: text().references(() => user.id, { onDelete: 'cascade' }),
		followerId: uuid().references(() => user.id, { onDelete: 'cascade' })
	},
	(table) => [unique().on(table.userId, table.followerId)]
);

export const followerRelation = relations(followers, ({ one }) => ({
	user: one(user, {
		fields: [followers.userId],
		references: [user.id],
		relationName: 'follower'
	}),
	follower: one(user, {
		fields: [followers.followerId],
		references: [user.id],
		relationName: 'following'
	})
}));
