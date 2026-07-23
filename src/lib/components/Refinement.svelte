<script lang="ts">
	import Refinement from './Refinement.svelte';
	import { type RefinementWithRelations } from '$lib/types/index';
	import { timeAgo, type RefinementTreeType } from '$lib/utils';
	import RefinementForm from './RefinementForm.svelte';
	import { fly } from 'svelte/transition';

	let helpfulClicked = $state(false);
	let type = $state('Question');
	let showReply = $state(false);

	let {
		refinement,
		userId,
		onCreated
	}: {
		refinement: RefinementTreeType;
		userId: string;
		onCreated: (refinement: RefinementWithRelations) => void;
	} = $props();

	const handleCreated = async (refinement: RefinementWithRelations) => {
		showReply = false;
		onCreated(refinement);
	};
</script>

<div
	in:fly={{ y: 12, duration: 200 }}
	class="rounded-2xl border border-border bg-background p-[16px_18px] transition-colors hover:border-accent"
>
	<div class="flex items-center gap-2.5">
		<div
			class="flex h-7.5 w-7.5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
		>
			NK
		</div>
		<div>
			<div class="text-[13px] font-medium text-foreground">{refinement.user.name}</div>
		</div>
		<span
			class="rounded-full border border-border bg-background-muted px-1.75 py-0.5 text-[11px] text-foreground-muted"
			>Student</span
		>
		<div
			class="mb-1.75 inline-flex items-center gap-1.25 rounded-full border px-2 py-0.5 text-[11px] font-semibold {type ===
			'obstacle'
				? 'border-warning-border bg-warning-background text-warning-foreground'
				: type === 'Question'
					? 'border-success-border bg-success-background text-success-foreground'
					: 'border-info-border bg-info-background text-info-foreground'}"
		>
			{refinement.refinementType}
		</div>
		<span class="ml-auto text-[12px] text-foreground-muted">{timeAgo(refinement.createdAt)}</span>
	</div>

	<p class="mb-2.5 text-[13.5px] leading-[1.65] whitespace-pre-line text-foreground-secondary">
		{refinement.body}
	</p>
	<div class="flex items-center gap-2.5">
		<button
			class="flex cursor-pointer items-center gap-1.25 rounded-sm border-none bg-transparent px-2 py-1 font-[inherit] text-[12px] transition-all {helpfulClicked
				? 'bg-yellow-100 font-medium text-yellow-600'
				: 'text-foreground-muted hover:bg-yellow-100 hover:text-foreground'}"
		>
			<svg width="12" height="12" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
			</svg>
			12 helpful
		</button>
		<button
			onclick={() => (showReply = !showReply)}
			class="cursor-pointer rounded-sm border-none bg-transparent px-2 py-1 font-[inherit] text-[12px] text-foreground-muted transition-colors hover:text-foreground"
			>Reply</button
		>
	</div>
</div>

{#if showReply}
	<div class="ml-7">
		<RefinementForm
			isReply={true}
			postId={refinement.postId}
			{userId}
			authorName={refinement.user.name}
			parentId={refinement.id}
			onCreated={handleCreated}
		/>
	</div>
{/if}

{#if refinement.children.length > 0}
	<div class="ml-7 flex flex-col gap-2 border-l border-border-strong pl-4">
		{#each refinement.children as child (child.id)}
			<Refinement {userId} refinement={child} {onCreated} />
		{/each}
	</div>
{/if}
