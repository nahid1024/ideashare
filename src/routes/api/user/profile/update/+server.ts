import { dupUsernameCheck, updateProfileInfo } from '$lib/server/helpers/index.js';
import { profileSchema } from '$lib/validation_schema.js';
import { error, json } from '@sveltejs/kit';

export async function POST(event) {
	const user = event.locals.user;

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await event.request.json();

	const parse = profileSchema.parse({ ...body });
	if ((await dupUsernameCheck(parse.username)) && parse.username !== event.locals.user.username) {
		error(400, { message: 'username' });
	}

	const profile = await updateProfileInfo({ ...parse });

	return json(profile);
}
