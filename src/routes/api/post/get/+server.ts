import { getPostById } from '$lib/server/helpers/post';
import { json } from '@sveltejs/kit';

export async function POST(event) {
	const body = await event.request.json();

	const post = await getPostById(body.postId);

	return json(post);
}
