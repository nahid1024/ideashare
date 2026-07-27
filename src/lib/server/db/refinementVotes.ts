import { pgTable, text, unique, uuid } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { refinements } from './refinements';
import { relations } from 'drizzle-orm';

export const refinementVotes = pgTable(
	'refinementVotes',
	{
		id: uuid().defaultRandom().notNull().primaryKey(),
		userId: text().references(() => user.id, { onDelete: 'cascade' }),
		refinementId: uuid().references(() => refinements.id, { onDelete: 'cascade' })
	},
	(table) => [unique().on(table.userId, table.refinementId)]
);

export const refinementVotesRelation = relations(refinementVotes, ({ one }) => ({
	user: one(user, {
		fields: [refinementVotes.userId],
		references: [user.id]
	}),
	refinement: one(refinements, {
		fields: [refinementVotes.refinementId],
		references: [refinements.id]
	})
}));
