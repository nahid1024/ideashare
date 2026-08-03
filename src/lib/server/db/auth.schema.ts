import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp, boolean, index } from 'drizzle-orm/pg-core';
import { posts } from './posts';
import { refinements } from './refinements';
import { shares } from './share';
import { followers } from './followers';
import { sparked } from './sparked';

export const user = pgTable(
	'user',
	{
		id: text('id').primaryKey(),
		username: text('username').unique().notNull(),
		name: text('name').notNull(),
		email: text('email').notNull().unique(),
		emailVerified: boolean('email_verified').default(false).notNull(),
		image: text('image'),
		location: text('location'),
		website: text('website'),
		field: text('field'),
		bio: text('bio'),
		createdAt: timestamp('created_at', {
			withTimezone: true,
			mode: 'date'
		})
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', {
			withTimezone: true,
			mode: 'date'
		})
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		role: text('role'),
		banned: boolean('banned').default(false),
		banReason: text('ban_reason'),
		banExpires: timestamp('ban_expires')
	},
	(table) => [index().on(table.email)]
);

export const session = pgTable(
	'session',
	{
		id: text('id').primaryKey(),
		expiresAt: timestamp('expires_at').notNull(),
		token: text('token').notNull().unique(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text('ip_address'),
		userAgent: text('user_agent'),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		impersonatedBy: text('impersonated_by')
	},
	(table) => [index('session_userId_idx').on(table.userId)]
);

export const account = pgTable(
	'account',
	{
		id: text('id').primaryKey(),
		accountId: text('account_id').notNull(),
		providerId: text('provider_id').notNull(),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		accessToken: text('access_token'),
		refreshToken: text('refresh_token'),
		idToken: text('id_token'),
		accessTokenExpiresAt: timestamp('access_token_expires_at'),
		refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
		scope: text('scope'),
		password: text('password'),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('account_userId_idx').on(table.userId)]
);

export const verification = pgTable(
	'verification',
	{
		id: text('id').primaryKey(),
		identifier: text('identifier').notNull(),
		value: text('value').notNull(),
		expiresAt: timestamp('expires_at').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(table) => [index('verification_identifier_idx').on(table.identifier)]
);

export const userRelations = relations(user, ({ many }) => ({
	sessions: many(session),
	accounts: many(account),
	posts: many(posts),
	refinements: many(refinements),
	shares: many(shares),
	followers: many(followers, {
		relationName: 'followers'
	}),
	following: many(followers, {
		relationName: 'following'
	}),
	sparked: many(sparked)
}));

export const sessionRelations = relations(session, ({ one }) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	})
}));

export const accountRelations = relations(account, ({ one }) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	})
}));
