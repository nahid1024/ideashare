<script>
	import { userData } from '$lib/remotes/session.remote';
	import { resolve } from '$app/paths';
	import AvatarDropdown from './AvatarDropdown.svelte';
	const data = await userData();
</script>

<nav
	class="sticky top-0 z-100 flex h-14.5 items-center gap-5 border-b border-border-strong bg-white px-8"
>
	<a class="flex items-center gap-2 no-underline" href="#">
		<!-- <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" fill="#111"/>
        <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" fill="#111"/>
      </svg> -->
		<img src="/logo.svg" alt="logo" class="h-6 w-6" />
		<span class="font-display text-[17px] font-semibold tracking-[-0.4px] text-black"
			>Idea<span class="text-yellow-dark">Share</span></span
		>
	</a>

	<div class="nav-search ml-2 hidden max-w-[320px] flex-1 md:flex">
		<input
			type="text"
			placeholder="Search ideas..."
			class="placeholder:text-gray-mid h-9 w-full rounded-full border border-border-input bg-background-muted px-4 text-[13px] text-black transition-colors outline-none focus:border-accent focus:bg-white"
		/>
	</div>

	<div class="ml-auto flex items-center gap-[10px]">
		{#if data}
			<AvatarDropdown name={data.name} email={data.email} avatar={data.image} />
		{:else}
			<a href={resolve('/auth/login')}>
				<button
					class="btn-ghost hidden cursor-pointer rounded-full border border-[#DDD] bg-transparent px-3.5 py-1.5 text-[13px] font-medium text-[#444] transition-colors hover:border-[#111] hover:text-[#111] md:block"
					>Sign in</button
				></a
			>
		{/if}

		<a href="./ideashare-post.html">
			<button
				class="flex cursor-pointer items-center gap-1.5 rounded-full border-none bg-black px-4 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-85"
			>
				<div
					class="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#F5C518] text-[13px] leading-none text-[#111]"
				>
					+
				</div>
				Post idea
			</button>
		</a>
	</div>
</nav>

<div
	id="bottom-nav"
	class="border-gray-light fixed right-0 bottom-0 left-0 z-[200] flex h-[60px] border-t bg-white sm:hidden"
>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px] text-black"
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
		class="text-gray-mid flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px]"
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
	<button class="flex flex-shrink-0 flex-col items-center justify-center self-center">
		<div
			class="-mt-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-none bg-black shadow-[0_4px_16px_rgba(0,0,0,0.2)]"
		>
			<div
				class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-accent text-sm leading-none text-black"
			>
				+
			</div>
		</div>
	</button>
	<button
		class="text-gray-mid flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px]"
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
		class="text-gray-mid flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px]"
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
