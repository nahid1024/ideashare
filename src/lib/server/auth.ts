import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { env } from '$env/dynamic/private';
import { getRequestEvent } from '$app/server';
import { db } from '$lib/server/db';
import { admin } from 'better-auth/plugins';
import { createUniqueUsername } from './helpers';

export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: 'pg' }),
	databaseHooks: {
		user: {
			create: {
				before: async (user) => {
					// For social sign-ups, the custom 'username' field will be empty/undefined.
					// We check if it's missing, and if so, generate one.
					if (!user.username) {
						user.username = await createUniqueUsername(user.email);
					}

					// Return the modified user object so betterAuth saves it to the DB
					return { data: user };
				}
			}
		}
	},
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: env.GITHUB_CLIENT_ID,
			clientSecret: env.GITHUB_CLIENT_SECRET
		}
	},
	user: {
		additionalFields: {
			username: {
				type: 'string',

				required: true
			}
		}
	},
	plugins: [
		admin(),
		sveltekitCookies(getRequestEvent) // make sure this is the last plugin in the array
	]
});
