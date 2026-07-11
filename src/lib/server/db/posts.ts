import { boolean, pgTable, text, timestamp, uuid, varchar } from 'drizzle-orm/pg-core';
import { user } from './auth.schema';
import { relations } from 'drizzle-orm';
import { shares } from './share';
import { media } from './media';
import { sparked } from './sparked';
import { postTopics } from './postTopics';
import { refinements } from './refinements';
import { refinementVotes } from './refinementVotes';

export const posts = pgTable('posts', {
	id: uuid('id').primaryKey().defaultRandom(),
	title: varchar('title').notNull(),
	description: text('description'),
	solvedProblems: text('solvedProblems'),
	isAnonymous: boolean('isAnonymous').notNull().default(false),
	isPublished: boolean('isPublished').notNull().default(false),
	authorId: text('authorId').references(() => user.id),
	createdAt: timestamp('createdAt').defaultNow().notNull(),
	updatedAt: timestamp('updatedAt')
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
