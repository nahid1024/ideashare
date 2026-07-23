<script lang="ts">
	import { buildRefinementTree } from '$lib/utils';
	import Refinement from './Refinement.svelte';
	import RefinementForm from './RefinementForm.svelte';
	import { type RefinementTreeType } from '$lib/utils';
	import { type RefinementWithRelations } from '$lib/types/index';

	let { refinements, postId, userId } = $props();
	let RefinementTree = $state<RefinementTreeType[]>(buildRefinementTree(refinements));

	function insertRefinement(
		nodes: RefinementTreeType[],
		refinement: RefinementWithRelations
	): boolean {
		for (const node of nodes) {
			if (node.id === refinement.parentRefinementId) {
				node.children.unshift({
					...refinement,
					children: []
				});
				return true;
			}

			if (insertRefinement(node.children, refinement)) {
				return true;
			}
		}

		return false;
	}

	const onCreated = (refinement: RefinementWithRelations) => {
		if (refinement.parentRefinementId === null) {
			RefinementTree.unshift({
				...refinement,
				children: []
			});
		} else {
			insertRefinement(RefinementTree, refinement);
		}
	};
</script>

<RefinementForm isReply={false} {postId} {userId} {onCreated} authorName="" parentId={null} />
{#each RefinementTree as refinement (refinement.id)}
	<Refinement {refinement} {userId} {onCreated} />
{/each}
