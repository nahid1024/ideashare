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
			class="cursor-pointer rounded-lg border border-border bg-background p-4 transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)] sm:p-[18px_20px]"
		>
			<div class="flex flex-col gap-2 sm:gap-3">
				<!-- Post title -->
				<Skeleton class="h-3 grow" />
				<Skeleton class="h-3 w-1/2" />
			</div>
			<!-- Post description -->
			<div class="mt-3 flex flex-col gap-2 sm:gap-3.5">
				<Skeleton class="h-3 grow" />
				<Skeleton class="h-3 grow" />
				<Skeleton class="hidden h-3 grow sm:block" />
				<Skeleton class="hidden h-3 grow sm:block" />
			</div>

			<div class="mt-4 flex items-end justify-between gap-4 sm:mt-6 sm:items-center">
				<div class="flex flex-wrap gap-1.5">
					<Skeleton class="h-5 w-14 sm:w-16" />
					<Skeleton class="h-5 w-14 sm:w-16" />
					<Skeleton class="hidden h-5 w-16 sm:block" />
				</div>
				<div class="flex shrink-0 flex-col items-center gap-0.75">
					<Skeleton class="h-7 w-7 rounded-md sm:h-8.5 sm:w-8.5" />
				</div>
			</div>
		</article>
	{/each}
{:then posts}
	{#each posts as post (post.id)}
		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-4 transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)] sm:p-[18px_20px]"
		>
			<!-- Author info -->
			<div class="mb-2 flex items-center sm:mb-3">
				<Avatar.Root class="h-6 w-6 sm:h-7 sm:w-7">
					<div
						class="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-transparent"
					>
						<Avatar.Image src={post.author.image} alt="@huntabyte" />
						<Avatar.Fallback class="border border-border-muted bg-muted p-1 text-[10px] sm:text-xs"
							>HB</Avatar.Fallback
						>
					</div>
				</Avatar.Root>
				<span class="ml-2 text-[11px] text-foreground-secondary sm:text-xs">{post.author.name}</span
				>
				<div class="flex items-center">
					<Dot class="h-4 w-4 sm:h-auto sm:w-auto" />
					<span class="text-[11px] text-foreground-muted sm:text-xs">{timeAgo(post.createdAt)}</span
					>
				</div>
			</div>

			<!-- Post Content -->
			<a
				href={resolve(`/post/${post.id}`)}
				class="block cursor-pointer"
				data-sveltekit-preload-data="off"
			>
				<div class="flex min-w-0 items-start gap-2 sm:gap-3.5">
					<div
						class="max-w-full flex-1 font-display text-sm leading-[1.4] font-semibold wrap-break-word text-foreground sm:text-[15px]"
					>
						{post.title}
					</div>
				</div>
				<!-- Post description -->
				<div
					class="mt-2 line-clamp-4 text-xs leading-[1.65] wrap-break-word text-foreground-secondary sm:mt-3 sm:line-clamp-6 sm:text-[13.5px]"
				>
					{getPreview(post.description)}
				</div>
			</a>

			<!-- Footer -->
			<div class="mt-4 flex items-end justify-between gap-4 sm:mt-3 sm:items-center">
				<div class="card-footer flex flex-wrap items-center gap-1.5">
					{#each post.postTopics as topic (topic.id)}
						<span
							class="rounded-full border border-border bg-background-muted px-2 py-0.5 text-[11px] text-foreground-secondary sm:px-2.5 sm:py-0.75 sm:text-[12px]"
						>
							#{topic.topic?.name}
						</span>
					{/each}
				</div>
				<div class="flex shrink-0 flex-col items-center gap-0.75">
					<div
						class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-[1.5px] border-accent bg-accent transition-opacity hover:opacity-80 sm:h-8.5 sm:w-8.5"
					>
						<svg
							width="14"
							height="14"
							viewBox="0 0 24 24"
							fill="currentColor"
							class="text-accent-foreground sm:h-4 sm:w-4"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[10px] font-medium text-foreground-secondary sm:text-[12px]">847</div>
				</div>
			</div>
		</article>
	{/each}
{/await}
