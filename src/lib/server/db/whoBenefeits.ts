import { pgTable, uuid } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { relations } from 'drizzle-orm';
import { whoBenefitsList } from './whobenefitslist';

export const whoBenefits = pgTable('who_benefits', {
	id: uuid('id').primaryKey().defaultRandom(),
	postId: uuid('postId').references(() => posts.id, { onDelete: 'cascade' }),
	tagId: uuid('tagId').references(() => whoBenefitsList.id, { onDelete: 'cascade' })
});

export const whoBenefitsRelation = relations(whoBenefits, ({ one }) => ({
	tag: one(whoBenefitsList, {
		fields: [whoBenefits.tagId],
		references: [whoBenefitsList.id]
	}),
	posts: one(posts, {
		fields: [whoBenefits.postId],
		references: [posts.id]
	})
}));
