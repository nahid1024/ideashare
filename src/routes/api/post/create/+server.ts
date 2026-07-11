import { CreatePost } from '$lib/server/helpers/post';
import { postSchema } from '$lib/validation_schema.js';
import { json } from '@sveltejs/kit';

export async function POST(event) {
	const user = event.locals.user;
	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}
	const body = await event.request.json();

	const data = postSchema.parse({ ...body });
	await CreatePost({...data}, user.id);

	return json({ success: true });
}
