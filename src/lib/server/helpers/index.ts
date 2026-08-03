//Generate Usename
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { user } from '../db/auth.schema';
import { error } from '@sveltejs/kit';
import { toast } from 'svelte-sonner';
import type { Profile } from '$lib/types';

export async function dupUsernameCheck(username: string) {
	return await db.query.user.findFirst({
		where: eq(user.username, username)
	});
}

export async function createUniqueUsername(email: string) {
	const base = email
		.split('@')[0]
		.replace(/\+.*/, '')
		.toLowerCase()
		.replace(/[^a-z0-9._]/g, '');
	let username = base;
	let i = 1;

	while (true) {
		const exists = await dupUsernameCheck(username);

		if (!exists) return username;

		username = `${base}${i}`;
		i++;
	}
}

export async function getUserInfo(username: string) {
	const userInfo = await db.query.user.findFirst({
		where: eq(user.username, username)
	});

	if (!userInfo) {
		throw error(404, 'Profile not found');
	}
	return userInfo;
}

export async function updateProfileInfo({
	id,
	name,
	location,
	bio,
	username,
	website,
	field
}: Profile) {
	const update = db
		.update(user)
		.set({ name, location, bio, website, field, username })
		.where(eq(user.id, id))
		.returning({ username: user.username });

	if (!update) {
		toast.error("Couldn't update the profile. Please try again later");
	}
	return update;
}
