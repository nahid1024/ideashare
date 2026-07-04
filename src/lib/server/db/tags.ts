import { relations } from 'drizzle-orm';
import { index, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { postTags } from './postTags';

export const tags = pgTable(
	'tags',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name').notNull()
	},
	(table) => [index().on(table.name)]
);

export const tagsRelation = relations(tags, ({ many }) => ({
	postTag: many(postTags)
}));
