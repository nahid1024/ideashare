<script lang="ts">
	import './layout.css';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ProgressBar />

{@render children()}
