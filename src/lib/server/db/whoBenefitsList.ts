import { relations } from 'drizzle-orm';
import { index, pgTable, uuid, text } from 'drizzle-orm/pg-core';
import { postTopics } from './postTopics';

export const whoBenefitsList = pgTable(
	'whoBenefitsList',
	{
		id: uuid('id').primaryKey().defaultRandom(),
		name: text('name').notNull()
	},
	(table) => [index().on(table.name)]
);

export const whoBenefitsListRelation = relations(whoBenefitsList, ({ many }) => ({
	postTag: many(postTopics)
}));
