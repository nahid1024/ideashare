<script>
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Bookmark from 'phosphor-svelte/lib/BookmarkIcon';
	import Trophy from 'phosphor-svelte/lib/TrophyIcon';
	import UserCheck from 'phosphor-svelte/lib/UserCheckIcon';
	import Clock from 'phosphor-svelte/lib/ClockIcon';
	import TrendUp from 'phosphor-svelte/lib/TrendUpIcon';
	import HouseSimple from 'phosphor-svelte/lib/HouseSimpleIcon';
	import IdeaCard from '$lib/components/IdeaCard.svelte';
	import LightBulb from 'phosphor-svelte/lib/LightbulbIcon';

	const { data } = $props();
</script>

<Navbar />

<div
	class="layout mx-auto grid max-w-270 grid-cols-1 gap-6 px-3 py-7 max-[600px]:pb-20 min-[601px]:grid-cols-[160px_minmax(0,1fr)] min-[601px]:px-6 min-[861px]:grid-cols-[200px_minmax(0,1fr)_220px]"
>
	<aside
		class="flex scrollbar-none flex-row items-center gap-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] sm:flex-col sm:items-stretch sm:gap-0.5 sm:overflow-x-visible sm:pb-0 [&::-webkit-scrollbar]:hidden"
	>
		<div
			class="mt-4 hidden px-2.5 py-1 text-[11px] font-semibold tracking-wider text-foreground-muted uppercase first:mt-0 sm:block"
		>
			Discover
		</div>

		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-primary bg-primary px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-inverted no-underline transition-colors duration-100 sm:rounded-md sm:border-none sm:bg-accent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:font-medium sm:text-black"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<HouseSimple size={120} />
			</div>
			All ideas
		</a>

		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<TrendUp size={120} />
			</div>
			Trending
		</a>

		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<Clock size={120} />
			</div>
			New today
		</a>

		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<UserCheck size={120} />
			</div>
			Following
		</a>
		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<Bookmark size={120} />
			</div>
			Bookmarks
		</a>

		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<Trophy size={120} />
			</div>
			Join an Ideathon
		</a>
	</aside>

	<main class="flex flex-col gap-[14px]">
		<div class="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-0">
			<div class="flex w-100 gap-1 rounded-full border border-border bg-background p-0.5 sm:w-auto">
				<button
					class="flex-1 cursor-pointer rounded-full border-none bg-primary px-2 py-1.25 text-center font-body text-xs font-medium text-foreground-inverted transition-colors duration-150 sm:flex-initial sm:px-3.5 sm:py-1.5 sm:text-[13px]"
					>For you</button
				>
				<button
					class="flex-1 cursor-pointer rounded-full border-none bg-transparent px-2 py-1.25 text-center font-body text-xs font-medium text-foreground-muted transition-colors duration-150 hover:text-foreground sm:flex-initial sm:px-3.5 sm:py-1.5 sm:text-[13px]"
					>Latest</button
				>
				<button
					class="flex-1 cursor-pointer rounded-full border-none bg-transparent px-2 py-1.25 text-center font-body text-xs font-medium text-foreground-muted transition-colors duration-150 hover:text-foreground sm:flex-initial sm:px-3.5 sm:py-1.5 sm:text-[13px]"
					>Most sparked</button
				>
			</div>

			<button
				class="flex cursor-pointer items-center gap-1.5 rounded-full border border-border bg-background px-3.5 py-1.5 font-body text-[13px] text-foreground-secondary"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="4" y1="6" x2="20" y2="6" />
					<line x1="8" y1="12" x2="16" y2="12" />
					<line x1="11" y1="18" x2="13" y2="18" />
				</svg>
				Filter
			</button>
		</div>
		<!-- Post list -->

		{#each data.posts as post (post.id)}
			<IdeaCard {post} />
		{/each}
	</main>

	<aside class="sidebar-right hidden flex-col gap-4 lg:flex">
		<div class="rounded-lg bg-accent p-[18px_16px] text-accent-foreground">
			<div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-dark">
				<LightBulb color="#f5c518" weight="fill" />
			</div>
			<div class="mb-[6px] font-display text-[15px] leading-[1.35] font-semibold">
				You had a thought today. Don't let it disappear.
			</div>
			<div class="mb-[14px] text-[12px] leading-normal opacity-70">
				Ideas shared here have inspired real projects.
			</div>
			<button
				class="w-full cursor-pointer rounded-md border-none bg-dark py-[9px] font-body text-[13px] font-medium text-light transition-opacity hover:opacity-85"
			>
				+ Share your idea
			</button>
		</div>

		<div class="rounded-lg border border-border bg-background p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
				Trending topics
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#education</span
				>
				<span class="text-[12px] text-foreground-muted">1.2k ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#health</span
				>
				<span class="text-[12px] text-foreground-muted">874 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#cities</span
				>
				<span class="text-[12px] text-foreground-muted">631 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#technology</span
				>
				<span class="text-[12px] text-foreground-muted">590 ideas</span>
			</div>
			<div class="flex items-center justify-between py-[6px] text-[13px]">
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#economy</span
				>
				<span class="text-[12px] text-foreground-muted">412 ideas</span>
			</div>
		</div>

		<div class="rounded-lg bg-dark p-4">
			<div class="mb-2 text-[11px] font-semibold tracking-[0.08em] text-accent uppercase">
				This week's top idea
			</div>
			<div class="mb-[10px] font-display text-[13px] leading-[1.45] font-medium text-light">
				Universal exam system gains 800+ sparks in 3 days
			</div>
			<div class="text-[12px] text-foreground-muted">
				<span class="font-medium text-accent">12 people</span> want to build it
			</div>
		</div>
	</aside>
</div>
<Footer />
