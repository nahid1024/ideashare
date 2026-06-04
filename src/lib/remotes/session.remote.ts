import { query, getRequestEvent } from '$app/server';

export const userData = query(async () => {
	const event = getRequestEvent();

	const { locals } = event;

	return locals.user;
});

export const sessionData = query(async () => {
	const event = getRequestEvent();

	const { locals } = event;

	return locals.session;
});
