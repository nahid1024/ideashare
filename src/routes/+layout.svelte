<script lang="ts">
	import './layout.css';
	import ProgressBar from '$lib/components/ProgressBar.svelte';
	import favicon from '$lib/assets/favicon.svg';
	import { Toaster } from '$lib/components/ui/sonner';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<ProgressBar />

<Toaster position="top-center" richColors />
<ModeWatcher defaultMode="light" />

{@render children()}
