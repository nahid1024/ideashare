import { createRefinement } from '$lib/server/helpers/post.js';
import { refinementSchema } from '$lib/validation_schema.js';
import { json } from '@sveltejs/kit';

export async function POST(event) {
	const user = event.locals.user;

	if (!user) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const body = await event.request.json();

	const data = refinementSchema.parse({ ...body });

	const refinement = await createRefinement(data);

	return json(refinement);
}
