<script lang="ts">
	import { resolve } from '$app/paths';
	import type { PostList } from '$lib/types';

	let { post }: { post: PostList } = $props();
	let expanded = $state(false);
</script>

<article
	class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
>
	<a href={resolve(`/post/${post.id}`)}>
		<div class="flex items-start gap-[14px]">
			<!-- Post title -->
			<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-foreground">
				{post.title}
			</div>
			<div class="flex shrink-0 flex-col items-center gap-[3px]">
				<div
					class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-accent bg-accent"
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
	</a>
	<!-- Post description -->
	<p
		class="text-[13.5px] leading-[1.65] wrap-break-word text-foreground-secondary"
		class:line-clamp-4={!expanded}
	>
		{post.description}
	</p>

	<button
		class="mb-3 text-sm font-medium text-primary hover:underline"
		onclick={() => (expanded = !expanded)}
	>
		{expanded ? 'See less' : 'See more'}
	</button>
	<div class="card-footer flex flex-wrap items-center gap-1.5">
		{#each post.postTopics as topic (topic.id)}
			<span
				class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
				>#{topic.topic?.name}</span
			>
		{/each}

		<div class="card-meta ml-auto hidden items-center gap-3 min-[601px]:flex">
			<div class="flex items-center">
				<div
					class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-accent text-[9px] font-semibold text-accent-foreground"
				>
					RK
				</div>
				<div
					class="ml-[-6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-semibold text-foreground-inverted"
				>
					SM
				</div>
				<div
					class="ml-[-6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-border-strong text-[9px] font-semibold text-foreground-secondary"
				>
					+4
				</div>
			</div>
			<span class="text-[12px] whitespace-nowrap text-foreground-muted">12 builds</span>
		</div>
	</div>
</article>
