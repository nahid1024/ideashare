<script lang="ts">
	import { beforeNavigate, afterNavigate } from '$app/navigation';

	let progress = $state(0);
	let loading = $state(false);

	let interval: ReturnType<typeof setInterval> | undefined;

	beforeNavigate(() => {
		loading = true;
		progress = 10;

		interval = setInterval(() => {
			if (progress < 90) {
				progress += 5;
			}
		}, 200);
	});

	afterNavigate(() => {
		if (interval) {
			clearInterval(interval);
		}

		progress = 100;

		setTimeout(() => {
			loading = false;
			progress = 0;
		}, 200);
	});
</script>

{#if loading}
	<div class="progress" style={`width:${progress}%`}></div>
{/if}

<style>
	.progress {
		position: fixed;
		top: 0;
		left: 0;

		height: 3px;
		background: #f5c518;
		box-shadow:
			0 0 10px #f5c518,
			0 0 5px #f5c518;

		z-index: 99999;

		transition: width 0.2s ease;
	}
</style>
