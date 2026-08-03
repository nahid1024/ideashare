<script>
	import { resolve } from '$app/paths';
	import AvatarDropdown from './AvatarDropdown.svelte';
	import PlusIcon from 'phosphor-svelte/lib/PlusIcon';
	const { user } = $props();
</script>

<nav
	class="sticky top-0 z-100 flex h-14.5 items-center gap-5 border-b border-border-strong bg-background px-8"
>
	<a class="flex items-center gap-2 no-underline" href={resolve('/')}>
		<img src="/logo.svg" alt="logo" class="h-6 w-6" />
		<span class="font-display text-[17px] font-semibold tracking-[-0.4px] text-foreground"
			>Idea<span class="text-yellow-500">Share</span></span
		>
	</a>

	<!-- Search field -->

	<div class="nav-search ml-2 hidden max-w-[320px] flex-1 md:flex">
		<input
			type="text"
			placeholder="Search ideas..."
			class="h-9 w-full rounded-full border border-input bg-background-muted px-4 text-[13px] text-foreground transition-colors outline-none placeholder:text-foreground-muted focus:border-accent focus:bg-background"
		/>
	</div>

	<div class="ml-auto flex items-center gap-2.5">
		{#if user}
			<AvatarDropdown avatar={user.image} userId={user.username} />
		{:else}
			<a href={resolve('/auth/login')}>
				<button
					class="btn-ghost hidden cursor-pointer rounded-full border border-border bg-transparent px-3.5 py-1.5 text-[13px] font-medium text-foreground-secondary transition-colors hover:border-foreground hover:text-foreground md:block"
					>Sign in</button
				></a
			>
		{/if}
		<a href={resolve('/post/create')}>
			<button
				class="hidden cursor-pointer items-center gap-1.5 rounded-full border-none bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-85 sm:flex"
			>
				<div
					class="flex h-3.75 w-3.75 items-center justify-center rounded-full bg-accent text-[13px] leading-none text-foreground"
				>
					<PlusIcon size=".7em" weight="bold" color="black" />
				</div>
				Post idea
			</button>
		</a>
	</div>
</nav>

<div
	id="bottom-nav"
	class="fixed right-0 bottom-0 left-0 z-200 flex h-15 border-t border-border bg-background sm:hidden"
>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.75 border-none bg-transparent font-body text-[10px] text-foreground"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
		</svg>
		Feed
	</button>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.75 border-none bg-transparent font-body text-[10px] text-foreground-muted"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<circle cx="11" cy="11" r="8" />
			<line x1="21" y1="21" x2="16.65" y2="16.65" />
		</svg>
		Explore
	</button>
	<button class="flex shrink-0 flex-col items-center justify-center self-center">
		<div
			class="-mt-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none bg-primary shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
		>
			<div
				class="flex h-4.5 w-4.5 items-center justify-center rounded-full bg-accent text-sm leading-none text-foreground"
			>
				+
			</div>
		</div>
	</button>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.75 border-none bg-transparent font-body text-[10px] text-foreground-muted"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
			<path d="M13.73 21a2 2 0 01-3.46 0" />
		</svg>
		Alerts
	</button>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-0.75 border-none bg-transparent font-body text-[10px] text-foreground-muted"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
		Profile
	</button>
</div>
