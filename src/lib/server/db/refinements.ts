import { pgTable, uuid, varchar, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import type { AnyPgColumn } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';
import { refinementVotes } from './refinementVotes';

export const refinements = pgTable('refinements', {
	id: uuid('id').primaryKey().defaultRandom(),
	postId: uuid('postId')
		.references(() => posts.id)
		.notNull(),
	userId: text('userId')
		.references(() => user.id)
		.notNull(),
	parentRefinementId: uuid('parentRefinementId').references((): AnyPgColumn => refinements.id),
	body: text('body').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().notNull(),
	isHidden: boolean('isHidden').default(false).notNull(),
	isEdited: boolean('isEdited').default(false).notNull(),
	refinementType: varchar('refinementType').notNull()
});

export const refinementsRelation = relations(refinements, (rel) => ({
	post: rel.one(posts, {
		fields: [refinements.postId],
		references: [posts.id]
	}),
	user: rel.one(user, {
		fields: [refinements.userId],
		references: [user.id]
	}),
	parent: rel.one(refinements, {
		fields: [refinements.parentRefinementId],
		references: [refinements.id],
		relationName: 'parent'
	}),
	children: rel.many(refinements, {
		relationName: 'parent'
	}),
	votes: rel.many(refinementVotes)
}));

export type RefinementTable = typeof refinements.$inferSelect;
export type NewRefinement = typeof refinements.$inferInsert;
