<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { type RefinementWithRelations } from '$lib/types/index';
	import { sleep } from '$lib/utils';
	import CircleNotch from 'phosphor-svelte/lib/CircleNotchIcon';

	const refinementTypes = [
		{ id: 'build', text: '✦ Builds on idea' },
		{ id: 'obstacle', text: '⚠ Potential obstacle' },
		{ id: 'fork', text: '↗ Fork idea' },
		{ id: 'question', text: '? Question' }
	];

	let {
		isReply,
		onCreated,
		postId,
		userId,
		authorName = '',
		parentId = null
	}: {
		isReply: boolean;
		onCreated: (refinement: RefinementWithRelations) => void;
		postId: string;
		userId: string;
		authorName: string | null;
		parentId: string | null;
	} = $props();
	let selectedRefinementType = $state('build');
	let body = $state('');
	let isHidden = $state(false);
	let isEdited = $state(false);
	let refinementType = $state('build');
	let isLoading = $state({ isReply: false, state: false });

	const submit = async () => {
		try {
			const res = await fetch('/api/refinement/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					postId: postId,
					userId: userId,
					parentRefinementId: parentId,
					body: body,
					isHidden: isHidden,
					isEdited: isEdited,
					refinementType: refinementType
				})
			});
			if (!res.ok) {
				toast.error('Something went wrong');
			}
			const resData: RefinementWithRelations = await res.json();
			await sleep(1000);
			isLoading.state = false;
			isLoading.isReply = false;
			toast.success('Refinement posted');
			await sleep(500);
			body = '';
			onCreated(resData);
		} catch (error) {
			console.log(error);
		}
	};
</script>

{#if isReply}
	<!-- Reply section -->
	<div class="rounded-2xl border border-border bg-background p-[16px_18px]">
		<div class="mb-3 font-display text-base font-semibold text-foreground">
			Reply to {authorName}
		</div>
		<textarea
			bind:value={body}
			class="mb-[10px] min-h-[80px] w-full resize-y rounded-md border border-border bg-background-muted p-[12px_14px] font-[inherit] text-[13.5px] text-foreground transition-colors outline-none placeholder:text-foreground-muted focus:border-accent focus:bg-background"
			placeholder="Write your reply..."
		></textarea>
		<button
			onclick={() => {
				submit();
				isLoading.isReply = true;
				isLoading.state = true;
			}}
			disabled={isLoading.isReply && isLoading.state}
			class="cursor-pointer rounded-full border-none bg-primary px-5 py-2 font-[inherit] text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-85"
		>
			{#if !isLoading.state && !isLoading.isReply}
				Post reply
			{:else}
				<CircleNotch class="animate-spin" />
			{/if}
		</button>
	</div>
{:else}
	<!-- The main refinement section -->
	<div class="rounded-2xl border border-border bg-background p-[16px_18px]">
		<div class="mb-3 font-display text-base font-semibold text-foreground">Add your refinement</div>
		<div class="mb-3 flex flex-wrap gap-[6px]">
			{#each refinementTypes as t (t.id)}
				<button
					onclick={() => (selectedRefinementType = t.id)}
					class="cursor-pointer rounded-full border px-3 py-[5px] text-[12px] font-medium transition-all {selectedRefinementType ===
					t.id
						? 'border-yellow-500 bg-accent text-black'
						: 'border-border bg-transparent text-foreground-secondary hover:border-foreground'}"
				>
					{t.text}
				</button>
			{/each}
		</div>
		<textarea
			bind:value={body}
			class="mb-[10px] min-h-[80px] w-full resize-y rounded-md border border-border bg-background-muted p-[12px_14px] font-[inherit] text-[13.5px] text-foreground transition-colors outline-none placeholder:text-foreground-muted focus:border-accent focus:bg-background"
			placeholder="Share how this idea could be improved, a challenge you see, or a real-world example..."
		></textarea>
		<button
			onclick={() => {
				submit();
				isLoading.state = true;
				isLoading.isReply = false;
			}}
			class="cursor-pointer rounded-full border-none bg-primary px-5 py-2 font-[inherit] text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-85"
		>
			{#if !isLoading.state && !isLoading.isReply}
				Post refinement
			{:else}
				<CircleNotch class="animate-spin" />
			{/if}
		</button>
	</div>
{/if}
