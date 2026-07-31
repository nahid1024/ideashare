<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostList } from '$lib/types';
	import { getPreview, timeAgo } from '$lib/utils';
	import { Avatar } from 'bits-ui';
	import { Skeleton } from './ui/skeleton';
	import Dot from 'phosphor-svelte/lib/DotIcon';

	let { posts }: { posts: Promise<PostList[]> } = $props();
</script>

<!-- eslint-disable svelte/no-at-html-tags -->

{#await posts}
	<!-- Show skeleton before loading -->

	{#each { length: 4 }}
		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
		>
			<div class="flex flex-col gap-3">
				<!-- Post title -->
				<Skeleton class="h-3 grow " />
				<Skeleton class="h-3 w-1/2 " />
			</div>
			<!-- Post description -->
			<div class="mt-3 flex flex-col gap-3.5">
				<Skeleton class="h-3 grow " />
				<Skeleton class="h-3 grow " />
				<Skeleton class="h-3 grow " />
				<Skeleton class="h-3 grow " />
			</div>

			<div class="mt-6 flex items-center justify-between">
				<div class="flex gap-1.5">
					<Skeleton class="h-5 w-16" />
					<Skeleton class="h-5 w-16" />
					<Skeleton class="h-5 w-16" />
					<Skeleton class="h-5 w-16" />
				</div>
				<div class="flex shrink-0 flex-col items-center gap-0.75">
					<Skeleton class="h-8.5 w-8.5 rounded-md" />
				</div>
			</div>
		</article>
	{/each}
{:then posts}
	{#each posts as post (post.id)}
		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
		>
			<!-- Author info -->

			<div class="mb-3 flex items-center">
				<Avatar.Root class="h-7 w-7">
					<div
						class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
					>
						<Avatar.Image src={post.author.image} alt="@huntabyte" />
						<Avatar.Fallback class="border border-border-muted bg-muted p-1 text-xs"
							>HB</Avatar.Fallback
						>
					</div>
				</Avatar.Root>
				<span class="ml-2 text-xs text-foreground-secondary">{post.author.name}</span>
				<div class="flex">
					<Dot />
					<span class="text-xs text-foreground-muted">{timeAgo(post.createdAt)}</span>
				</div>
			</div>

			<!-- Post title -->
			<a href={resolve(`/post/${post.id}`)} class="cursor-pointer" data-sveltekit-preload-data="on">
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
	{/each}
{/await}
