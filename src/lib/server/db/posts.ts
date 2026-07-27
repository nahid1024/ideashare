import { boolean, jsonb, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';
import { shares } from './share';
import { media } from './media';
import { sparked } from './sparked';
import { postTopics } from './postTopics';
import { refinements } from './refinements';
import { refinementVotes } from './refinementVotes';
import type { JSONContent } from '@tiptap/core';

export const posts = pgTable('posts', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title').notNull(),
	description: jsonb().$type<JSONContent>().notNull(),
	solvedProblems: text('solvedProblems'),
	whoBenefits: text('whoBenefits'),
	isAnonymous: boolean('isAnonymous').notNull().default(false),
	isPublished: boolean('isPublished').notNull().default(false),
	authorId: text('authorId')
		.notNull()
		.references(() => user.id),
	createdAt: timestamp('createdAt', {
		withTimezone: true,
		mode: 'date'
	})
		.defaultNow()
		.notNull(),
	updatedAt: timestamp('updatedAt', {
		withTimezone: true,
		mode: 'date'
	})
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull()
});

export const postRelations = relations(posts, (rel) => ({
	author: rel.one(user, {
		fields: [posts.authorId],
		references: [user.id]
	}),
	share: rel.many(shares),
	media: rel.many(media),
	sparked: rel.many(sparked),
	postTopics: rel.many(postTopics),
	refinements: rel.many(refinements),
	votes: rel.many(refinementVotes)
}));
