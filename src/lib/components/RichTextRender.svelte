<script lang="ts">
	import { onMount } from 'svelte';
	import type { JSONContent } from '@tiptap/core';
	import DOMPurify from 'isomorphic-dompurify';

	interface Props {
		content: JSONContent;
	}

	let { content }: Props = $props();

	let html = $state('');

	onMount(async () => {
		const { renderTiptapJSON } = await import('$lib/utils');

		html = DOMPurify.sanitize(renderTiptapJSON(content));
	});
</script>

<article class="editor-content">
	{@html html}
</article>
