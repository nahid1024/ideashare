<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostList } from '$lib/types';
	import { getPreview } from '$lib/utils';
	let { post }: { post: PostList } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<article
	class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
>
	<a href={resolve(`/post/${post.id}`)} class="cursor-pointer">
		<div class="flex items-start gap-3.5">
			<!-- Post title -->
			<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-foreground">
				{post.title}
			</div>
		</div>
		<!-- Post description -->
		<div
			class="mt-3 line-clamp-6 text-[13.5px] leading-[1.65] wrap-break-word text-foreground-secondary"
		>
			{getPreview(post.description)}
		</div>
	</a>

	<div class="mt-3 flex justify-between">
		<div class="card-footer flex flex-wrap items-center gap-1.5">
			{#each post.postTopics as topic (topic.id)}
				<span
					class="rounded-full border border-border bg-background-muted px-2.5 py-0.75 text-[12px] text-foreground-secondary"
					>#{topic.topic?.name}</span
				>
			{/each}
		</div>
		<div class="flex shrink-0 flex-col items-center gap-0.75">
			<div
				class="flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-accent bg-accent"
			>
				<svg
					width="16"
					height="16"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="text-accent-foreground"
				>
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
				</svg>
			</div>
			<div class="text-[12px] font-medium text-foreground-secondary">847</div>
		</div>
	</div>
</article>
