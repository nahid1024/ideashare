<script>
	import { resolve } from '$app/paths';
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

<svelte:head>
	<title>Trending - Ideashare</title>
</svelte:head>

<Navbar user={await data.user} />

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
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href={resolve('/')}
		>
			<div class="hidden h-4.5 w-4.5 shrink-0 items-center justify-center sm:flex">
				<HouseSimple size={120} />
			</div>
			All ideas
		</a>

		<a
			class="flex shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-primary bg-primary px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-inverted no-underline transition-colors duration-100 sm:rounded-md sm:border-none sm:bg-accent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:font-medium sm:text-black"
			href={resolve('/trending')}
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

	<main class="flex flex-col gap-3.5">
		<div class="flex flex-wrap items-center justify-between gap-2 sm:flex-nowrap sm:gap-0">
			<div
				class="flex flex-wrap items-center justify-between gap-2 font-display text-xl font-bold sm:flex-nowrap sm:gap-0"
			>
				Trending ideas right now
			</div>
		</div>
		<!-- Post list -->
		<IdeaCard posts={data.posts} />
	</main>

	<aside class="sidebar-right hidden flex-col gap-4 lg:flex">
		<div class="rounded-lg bg-accent p-[18px_16px] text-accent-foreground">
			<div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-dark">
				<LightBulb color="#f5c518" weight="fill" />
			</div>
			<div class="mb-1.5 font-display text-[15px] leading-[1.35] font-semibold">
				You had a thought today. Don't let it disappear.
			</div>
			<div class="mb-3.5 text-[12px] leading-normal opacity-70">
				Ideas shared here have inspired real projects.
			</div>
			<button
				class="w-full cursor-pointer rounded-md border-none bg-dark py-2.25 font-body text-[13px] font-medium text-light transition-opacity hover:opacity-85"
			>
				+ Share your idea
			</button>
		</div>

		<div class="rounded-lg border border-border bg-background p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
				Trending topics
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#education</span
				>
				<span class="text-[12px] text-foreground-muted">1.2k ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#health</span
				>
				<span class="text-[12px] text-foreground-muted">874 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#cities</span
				>
				<span class="text-[12px] text-foreground-muted">631 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="hover:text-accent-hover cursor-pointer font-medium text-foreground"
					>#technology</span
				>
				<span class="text-[12px] text-foreground-muted">590 ideas</span>
			</div>
			<div class="flex items-center justify-between py-1.5 text-[13px]">
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
			<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-medium text-light">
				Universal exam system gains 800+ sparks in 3 days
			</div>
			<div class="text-[12px] text-foreground-muted">
				<span class="font-medium text-accent">12 people</span> want to build it
			</div>
		</div>
	</aside>
</div>
