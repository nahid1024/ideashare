import { relations } from 'drizzle-orm';
import { index, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { postTopics } from './postTopics';

export const topics = pgTable(
	'topics',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: varchar('name').notNull()
	},
	(table) => [index().on(table.name)]
);

export const topicsRelation = relations(topics, ({ many }) => ({
	postTag: many(postTopics)
}));
