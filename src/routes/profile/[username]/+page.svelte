<script>
	import Navbar from '$lib/components/Navbar.svelte';
	import Share from 'phosphor-svelte/lib/ShareNetworkIcon';

	let { data } = $props();

	// Svelte 5 Runes for state management
	let isFollowing = $state(false);
	let activeTab = $state('Ideas');

	const tabs = [
		{ id: 'Ideas', count: 14 },
		{ id: 'Sparked', count: 47 },
		{ id: 'Refinements', count: 89 },
		{ id: 'Building', count: 3 }
	];
</script>

<svelte:head>
	<title>Profile - Ideashare</title>
</svelte:head>

<!-- NAVBAR -->
<Navbar user={data.user} />

<!-- COVER -->
<div class="cover relative h-[130px] overflow-hidden bg-[#111] sm:h-[180px]">
	<button
		class="absolute top-3.5 right-4 z-[2] flex cursor-pointer items-center gap-[5px] rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[12px] text-white/70 backdrop-blur-sm"
	>
		<svg
			width="12"
			height="12"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
		>
			<path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
			<path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
		</svg>
		Edit cover
	</button>
</div>

<!-- PROFILE HEADER -->
<div class="profile-header border-b border-border-strong bg-background px-[14px] sm:px-8">
	<div class="avatar-row relative -mt-[36px] flex items-end gap-4 pb-4 sm:-mt-11">
		<div
			class="avatar relative z-[2] flex h-[72px] w-[72px] flex-shrink-0 items-center justify-center rounded-full border-[3px] border-white bg-[#111] font-display text-[24px] font-extrabold text-[#F5C518] shadow-[0_4px_16px_rgba(0,0,0,0.15)] sm:h-[88px] sm:w-[88px] sm:border-4 sm:text-[30px]"
		>
			RK
			<div
				class="avatar-badge absolute right-0.5 bottom-0.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border-[3px] border-white bg-[#F5C518] text-[9px] sm:h-[22px] sm:w-[22px] sm:text-[10px]"
			>
				💡
			</div>
		</div>

		<div class="ml-auto flex items-center gap-1.5 pb-4 sm:gap-2">
			<button
				onclick={() => (isFollowing = !isFollowing)}
				class="cursor-pointer rounded-full border-[1.5px] px-4 py-1.5 text-[12px] font-semibold transition-all hover:border-[#888] sm:px-5 sm:py-2 sm:text-[13px] {isFollowing
					? 'border-transparent bg-[#111] text-white'
					: 'border-[#DDD] bg-white text-[#111]'}"
			>
				{isFollowing ? 'Following' : 'Follow'}
			</button>
			<button
				class="flex cursor-pointer items-center gap-1.5 rounded-full border border-border-strong bg-background px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors sm:px-4 sm:py-2 sm:text-[13px]"
			>
				<svg
					class="h-3.5 w-3.5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
				</svg>
				<span class="btn-msg-label hidden sm:inline">Message</span>
			</button>
			<button
				class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#DDD] bg-background transition-colors hover:border-[#111] sm:h-9 sm:w-9"
			>
				<Share />
			</button>
		</div>
	</div>

	<div class="pt-1 pb-[18px]">
		<div
			class="profile-name mb-1 flex items-center gap-2 font-display text-[18px] font-extrabold tracking-tight text-foreground sm:text-[22px]"
		>
			Rafiq Karim
			<div
				class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-[#F5C518] text-[9px] sm:h-5 sm:w-5 sm:text-[10px]"
			>
				✓
			</div>
		</div>
		<div class="mb-2 text-[12px] text-foreground-muted sm:text-[13px]">
			@rafiqkarim · Joined April 2024
		</div>
		<div
			class="profile-name mb-3 max-w-[520px] text-[13px] leading-relaxed text-foreground sm:text-[13.5px]"
		>
			Thinking about the future of education and skills. Believe that where you learn shouldn't
			limit what you can become. Sharing ideas so they don't disappear.
		</div>
		<div class="flex flex-wrap items-center gap-3 sm:gap-4">
			<div class="flex items-center gap-[5px] text-[12px] text-[#888] sm:text-[12.5px]">
				<svg
					class="h-[13px] w-[13px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
					<circle cx="12" cy="10" r="3" />
				</svg>
				Dhaka, Bangladesh
			</div>
			<div class="flex items-center gap-[5px] text-[12px] text-[#888] sm:text-[12.5px]">
				<svg
					class="h-[13px] w-[13px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
					<path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
				</svg>
				<a href="#" class="font-medium text-[#C49A00] no-underline">ideashare.io/rafiq</a>
			</div>
			<div class="flex items-center gap-[5px] text-[12px] text-[#888] sm:text-[12.5px]">
				<svg
					class="h-[13px] w-[13px]"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect x="2" y="3" width="20" height="14" rx="2" />
					<line x1="8" y1="21" x2="16" y2="21" />
					<line x1="12" y1="17" x2="12" y2="21" />
				</svg>
				Works in Education
			</div>
		</div>
	</div>

	<!-- STATS (Turned into a 3x2 grid on mobile so they don't squish) -->
	<div class="grid grid-cols-3 border-t border-border-muted md:flex md:flex-row">
		<div
			class="flex-1 cursor-pointer border-r border-b border-border-muted px-2 py-3 text-center transition-colors hover:bg-[#F5F5F2] sm:px-4 md:border-b-0"
		>
			<div class="font-display text-[15px] font-bold text-[#C49A00] sm:text-[18px]">1,204</div>
			<div class="mt-0.5 text-[10px] text-[#888] sm:text-[11px]">Total sparks</div>
		</div>
		<div
			class="flex-1 cursor-pointer border-r border-b border-border-muted px-2 py-3 text-center transition-colors hover:bg-[#F5F5F2] sm:px-4 md:border-b-0"
		>
			<div class="font-display text-[15px] font-bold text-foreground sm:text-[18px]">14</div>
			<div class="mt-0.5 text-[10px] text-foreground sm:text-[11px]">Ideas posted</div>
		</div>
		<div
			class="flex-1 cursor-pointer border-b border-border-muted px-2 py-3 text-center transition-colors hover:bg-[#F5F5F2] sm:px-4 md:border-r md:border-b-0"
		>
			<div class="font-display text-[15px] font-bold text-foreground sm:text-[18px]">3</div>
			<div class="mt-0.5 text-[10px] text-[#888] sm:text-[11px]">Being built</div>
		</div>
		<div
			class="flex-1 cursor-pointer border-r border-border-muted px-2 py-3 text-center transition-colors hover:bg-[#F5F5F2] sm:px-4"
		>
			<div class="font-display text-[15px] font-bold text-foreground sm:text-[18px]">89</div>
			<div class="mt-0.5 text-[10px] text-[#888] sm:text-[11px]">Refinements</div>
		</div>
		<div
			class="flex-1 cursor-pointer border-r border-border-muted px-2 py-3 text-center transition-colors hover:bg-[#F5F5F2] sm:px-4"
		>
			<div class="font-display text-[15px] font-bold text-foreground sm:text-[18px]">312</div>
			<div class="mt-0.5 text-[10px] text-[#888] sm:text-[11px]">Followers</div>
		</div>
		<div
			class="flex-1 cursor-pointer px-2 py-3 text-center transition-colors hover:bg-[#F5F5F2] sm:px-4"
		>
			<div class="font-display text-[15px] font-bold text-foreground sm:text-[18px]">148</div>
			<div class="mt-0.5 text-[10px] text-[#888] sm:text-[11px]">Following</div>
		</div>
	</div>
</div>

<!-- TABS -->
<div
	class="profile-tabs tabs-scroll sticky top-[50px] z-[90] flex overflow-x-auto border-b border-border-strong bg-background px-[14px] sm:top-[54px] sm:px-8"
>
	{#each tabs as tab (tab)}
		<button
			class="-mb-px flex cursor-pointer items-center gap-1.5 border-b-[2.5px] px-[16px] py-3.5 text-[13px] whitespace-nowrap transition-colors sm:px-[18px] sm:text-[13.5px] {activeTab ===
			tab.id
				? 'border-[#111111] font-semibold text-[#111]'
				: 'border-transparent font-medium text-[#888] hover:text-[#111]'}"
			onclick={() => (activeTab = tab.id)}
		>
			{tab.id}
			<span
				class="rounded-full px-1.5 py-px text-[10px] font-medium sm:text-[11px] {activeTab ===
				tab.id
					? 'bg-[#fff8dc] text-[#c49a00]'
					: 'bg-[#F5F5F2] text-[#888]'}"
			>
				{tab.count}
			</span>
		</button>
	{/each}
</div>

<!-- MAIN CONTENT (Removed broken inline style, applied responsive grid classes) -->
<div
	class="layout mx-auto grid max-w-[960px] grid-cols-1 items-start gap-3 px-3 py-6 pb-20 sm:gap-[22px] sm:px-6 sm:pb-[60px] md:grid-cols-[minmax(0,1fr)_240px]"
>
	<!-- IDEAS COLUMN -->
	<div class="flex flex-col gap-3">
		<!-- Pinned label -->
		<div
			class="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.06em] text-[#888] uppercase"
		>
			<svg
				width="12"
				height="12"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.5"
			>
				<line x1="12" y1="17" x2="12" y2="22" />
				<path
					d="M5 17h14v-1.76a2 2 0 00-1.11-1.79l-1.78-.9A2 2 0 0115 10.76V6h1a2 2 0 000-4H8a2 2 0 000 4h1v4.76a2 2 0 01-1.11 1.79l-1.78.9A2 2 0 005 15.24V17z"
				/>
			</svg>
			Pinned idea
		</div>

		<!-- Pinned card -->
		<div
			class="cursor-pointer rounded-2xl border-[1.5px] border-[#F5C518] bg-white px-4 py-4 shadow-[0_0_0_3px_#FFF8DC] transition-all hover:shadow-[0_0_0_4px_#FFE066] sm:px-[18px]"
		>
			<div class="mb-2 flex items-start gap-3">
				<div class="flex-1 font-display text-[14.5px] leading-snug font-semibold text-[#111]">
					A universal exam system independent of any university — certify your skills, study
					anywhere
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-0.5">
					<div
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#F5C518] bg-[#F5C518] text-sm"
					>
						⚡
					</div>
					<div class="text-[11px] font-medium text-[#444]">847</div>
				</div>
			</div>
			<p class="mb-3 text-[13px] leading-[1.65] text-[#444]">
				What if you could study from YouTube, books, or anywhere you want — and just show up to a
				standardised exam to get certified? No enrollment, no fees, no location barrier.
			</p>
			<div class="flex flex-wrap items-center gap-1.5">
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#education</span
				>
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#credentials</span
				>
				<span
					class="rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-[9px] py-0.5 text-[11px] font-medium text-[#3730A3]"
					>Being refined</span
				>
				<span class="ml-auto text-[11px] whitespace-nowrap text-[#DDD]">3 days ago</span>
			</div>
		</div>

		<div class="my-1 h-px bg-[#DDD]"></div>

		<!-- Card 2 -->
		<div
			class="cursor-pointer rounded-2xl border border-[#DDD] bg-white px-4 py-4 transition-all hover:border-[#F5C518] hover:shadow-[0_0_0_3px_#FFF8DC] sm:px-[18px]"
		>
			<div class="mb-2 flex items-start gap-3">
				<div class="flex-1 font-display text-[14.5px] leading-snug font-semibold text-[#111]">
					Build your own university major — pick courses from different institutions to form a
					custom degree
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-0.5">
					<div
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#DDD] text-sm transition-all hover:border-[#F5C518] hover:bg-[#FFF8DC]"
					>
						⚡
					</div>
					<div class="text-[11px] font-medium text-[#444]">389</div>
				</div>
			</div>
			<p class="mb-3 text-[13px] leading-[1.65] text-[#444]">
				Why does a major have to be pre-defined? Let students mix AI ethics from MIT, film theory
				from NYU, and economics from LSE into a single recognised credential.
			</p>
			<div class="flex flex-wrap items-center gap-1.5">
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#education</span
				>
				<span
					class="rounded-full border border-[#FFE08A] bg-[#FFF3CD] px-[9px] py-0.5 text-[11px] font-medium text-[#7A5800]"
					>Raw idea</span
				>
				<span class="ml-auto text-[11px] whitespace-nowrap text-[#DDD]">1 week ago</span>
			</div>
		</div>

		<!-- Card 3 -->
		<div
			class="cursor-pointer rounded-2xl border border-[#DDD] bg-white px-4 py-4 transition-all hover:border-[#F5C518] hover:shadow-[0_0_0_3px_#FFF8DC] sm:px-[18px]"
		>
			<div class="mb-2 flex items-start gap-3">
				<div class="flex-1 font-display text-[14.5px] leading-snug font-semibold text-[#111]">
					Open public libraries 24/7 with self-service access — like ATMs but for books and quiet
					space
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-0.5">
					<div
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#DDD] text-sm transition-all hover:border-[#F5C518] hover:bg-[#FFF8DC]"
					>
						⚡
					</div>
					<div class="text-[11px] font-medium text-[#444]">214</div>
				</div>
			</div>
			<p class="mb-3 text-[13px] leading-[1.65] text-[#444]">
				Libraries close at 6pm, but people need quiet study space at 10pm. A card-access system and
				basic automation could keep them open without staff overhead.
			</p>
			<div class="flex flex-wrap items-center gap-1.5">
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#cities</span
				>
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#education</span
				>
				<span
					class="rounded-full border border-[#FFE08A] bg-[#FFF3CD] px-[9px] py-0.5 text-[11px] font-medium text-[#7A5800]"
					>Raw idea</span
				>
				<span class="ml-auto text-[11px] whitespace-nowrap text-[#DDD]">2 weeks ago</span>
			</div>
		</div>

		<!-- Built / credit card -->
		<div
			class="cursor-pointer rounded-2xl bg-[#111] px-4 py-4 transition-opacity hover:opacity-[0.88] sm:px-[18px]"
		>
			<div class="mb-2 text-[10px] font-bold tracking-[0.07em] text-[#F5C518] uppercase">
				⚡ Originally proposed by Rafiq — now being built
			</div>
			<div class="mb-2 font-display text-[14px] leading-snug font-semibold text-white">
				A skills passport that combines all your certifications into one verified profile
			</div>
			<div class="text-[12px] text-white/40">
				<span class="font-medium text-[#F5C518]">4 builders</span> working on this · Forked from Rafiq's
				universal exam idea
			</div>
		</div>

		<!-- Card 5 -->
		<div
			class="cursor-pointer rounded-2xl border border-[#DDD] bg-white px-4 py-4 transition-all hover:border-[#F5C518] hover:shadow-[0_0_0_3px_#FFF8DC] sm:px-[18px]"
		>
			<div class="mb-2 flex items-start gap-3">
				<div class="flex-1 font-display text-[14.5px] leading-snug font-semibold text-[#111]">
					Peer-to-peer tutoring marketplace where students teach what they know to earn
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-0.5">
					<div
						class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[10px] border-[1.5px] border-[#DDD] text-sm transition-all hover:border-[#F5C518] hover:bg-[#FFF8DC]"
					>
						⚡
					</div>
					<div class="text-[11px] font-medium text-[#444]">176</div>
				</div>
			</div>
			<p class="mb-3 text-[13px] leading-[1.65] text-[#444]">
				The best person to explain a concept you just learned is someone who learned it recently. A
				platform where students teach each other — both parties benefit.
			</p>
			<div class="flex flex-wrap items-center gap-1.5">
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#education</span
				>
				<span
					class="rounded-full border border-[#DDD] bg-[#F5F5F2] px-[9px] py-0.5 text-[11px] text-[#444]"
					>#economy</span
				>
				<span
					class="rounded-full border border-[#A7F3D0] bg-[#ECFDF5] px-[9px] py-0.5 text-[11px] font-medium text-[#065F46]"
					>Someone's building it</span
				>
				<span class="ml-auto text-[11px] whitespace-nowrap text-[#DDD]">3 weeks ago</span>
			</div>
		</div>
	</div>

	<!-- RIGHT SIDEBAR -->
	<aside class="sidebar hidden flex-col gap-3.5 md:flex">
		<!-- Role -->
		<div class="rounded-2xl border border-[#DDD] bg-white p-4">
			<div class="mb-3.5 text-[11px] font-semibold tracking-widest text-[#888] uppercase">Role</div>
			<div
				class="mb-3 flex items-center gap-2.5 rounded-[10px] border border-[#FFE066] bg-[#FFF8DC] px-3.5 py-3"
			>
				<div class="text-[22px]">💡</div>
				<div>
					<div class="text-[13.5px] font-semibold text-[#111]">Idea Sharer</div>
					<div class="mt-px text-[11.5px] text-[#888]">Posts bold, original ideas</div>
				</div>
			</div>
			<div class="text-[12px] leading-relaxed text-[#888]">
				Rafiq's ideas have been sparked over
				<strong class="text-[#111]">1,200 times</strong> and inspired
				<strong class="text-[#111]">3 active builds</strong>.
			</div>
		</div>

		<!-- Topics -->
		<div class="rounded-2xl border border-[#DDD] bg-white p-4">
			<div class="mb-3.5 text-[11px] font-semibold tracking-widest text-[#888] uppercase">
				Interested in
			</div>
			<div class="flex flex-wrap gap-1.5">
				<span
					class="cursor-pointer rounded-full border border-[#DDD] bg-[#F5F5F2] px-2.5 py-1 text-[12px] font-medium text-[#111] transition-colors hover:border-[#C49A00]"
					>#education</span
				>
				<span
					class="cursor-pointer rounded-full border border-[#DDD] bg-[#F5F5F2] px-2.5 py-1 text-[12px] font-medium text-[#111] transition-colors hover:border-[#C49A00]"
					>#credentials</span
				>
				<span
					class="cursor-pointer rounded-full border border-[#DDD] bg-[#F5F5F2] px-2.5 py-1 text-[12px] font-medium text-[#111] transition-colors hover:border-[#C49A00]"
					>#cities</span
				>
				<span
					class="cursor-pointer rounded-full border border-[#DDD] bg-[#F5F5F2] px-2.5 py-1 text-[12px] font-medium text-[#111] transition-colors hover:border-[#C49A00]"
					>#economy</span
				>
				<span
					class="cursor-pointer rounded-full border border-[#DDD] bg-[#F5F5F2] px-2.5 py-1 text-[12px] font-medium text-[#111] transition-colors hover:border-[#C49A00]"
					>#health</span
				>
			</div>
		</div>

		<!-- Achievements -->
		<div class="rounded-2xl border border-[#DDD] bg-white p-4">
			<div class="mb-3.5 text-[11px] font-semibold tracking-widest text-[#888] uppercase">
				Achievements
			</div>
			<div class="flex flex-col gap-2">
				<div class="flex items-center gap-2.5 rounded-[10px] bg-[#F5F5F2] px-2.5 py-2">
					<div
						class="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg bg-[#F5C518] text-[14px]"
					>
						🔥
					</div>
					<div>
						<div class="text-[12.5px] font-medium text-[#111]">Spark starter</div>
						<div class="mt-px text-[11px] text-[#888]">First idea crossed 100 sparks</div>
					</div>
				</div>
				<div class="flex items-center gap-2.5 rounded-[10px] bg-[#F5F5F2] px-2.5 py-2">
					<div
						class="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg bg-[#F5C518] text-[14px]"
					>
						🏗️
					</div>
					<div>
						<div class="text-[12.5px] font-medium text-[#111]">Blueprint</div>
						<div class="mt-px text-[11px] text-[#888]">An idea you posted is being built</div>
					</div>
				</div>
				<div class="flex items-center gap-2.5 rounded-[10px] bg-[#F5F5F2] px-2.5 py-2">
					<div
						class="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg bg-[#F5C518] text-[14px]"
					>
						🌍
					</div>
					<div>
						<div class="text-[12.5px] font-medium text-[#111]">Global reach</div>
						<div class="mt-px text-[11px] text-[#888]">Sparked by people in 20+ countries</div>
					</div>
				</div>
				<div class="flex items-center gap-2.5 rounded-[10px] bg-[#F5F5F2] px-2.5 py-2 opacity-40">
					<div
						class="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-lg bg-[#DDD] text-[14px]"
					>
						🚀
					</div>
					<div>
						<div class="text-[12.5px] font-medium text-[#111]">Launched</div>
						<div class="mt-px text-[11px] text-[#888]">An idea you posted goes live</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Notable followers -->
		<div class="rounded-2xl border border-[#DDD] bg-white p-4">
			<div class="mb-3.5 text-[11px] font-semibold tracking-widest text-[#888] uppercase">
				Notable followers
			</div>
			<div class="flex flex-col gap-0">
				<div class="flex items-center gap-2 border-b border-border-muted py-1.5">
					<div
						class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#FFF8DC] text-[10px] font-bold text-[#C49A00]"
					>
						TK
					</div>
					<div>
						<div class="text-[12.5px] font-medium text-[#111]">Tariq Khan</div>
						<div class="text-[11px] text-[#888]">Builder · Pakistan</div>
					</div>
					<button
						class="ml-auto cursor-pointer rounded-full border border-[#DDD] bg-transparent px-2.5 py-[3px] text-[11px] font-medium text-[#444] transition-all hover:border-[#111] hover:text-[#111]"
						>Follow</button
					>
				</div>
				<!-- More follower blocks... -->
			</div>
		</div>
	</aside>
</div>

<!-- BOTTOM NAV (mobile only) -->
<div
	class="bottom-nav fixed right-0 bottom-0 left-0 z-[200] flex h-[58px] flex-row border-t border-[#DDD] bg-white sm:hidden"
>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent text-[10px] text-[#888]"
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
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent text-[10px] text-[#888]"
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
	<div class="flex flex-shrink-0 items-center justify-center self-center">
		<button
			class="-mt-3.5 flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-none bg-[#111] shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
		>
			<div
				class="flex h-[17px] w-[17px] items-center justify-center rounded-full bg-[#F5C518] text-sm leading-none text-[#111]"
			>
				+
			</div>
		</button>
	</div>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent text-[10px] text-[#888]"
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
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent text-[10px] font-semibold text-[#111]"
	>
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
		>
			<path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
		Profile
	</button>
</div>

<style>
	/* Standardize fonts to match your setup */
	:global(body) {
		font-family: var(--font-body, 'DM Sans', sans-serif);
	}

	.font-display {
		font-family: var(--font-display, 'Bricolage Grotesque', sans-serif);
	}

	/* Cover dot grid + glow — pseudo-elements stay in standard CSS */
	.cover::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(245, 197, 24, 0.15) 1px, transparent 1px);
		background-size: 24px 24px;
		pointer-events: none;
	}

	.cover::after {
		content: '';
		position: absolute;
		width: 400px;
		height: 400px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(245, 197, 24, 0.25) 0%, transparent 70%);
		top: -160px;
		left: -80px;
		pointer-events: none;
	}

	/* Scrollbar hide for mobile tabs */
	.tabs-scroll::-webkit-scrollbar {
		display: none;
	}

	.tabs-scroll {
		-ms-overflow-style: none;
		scrollbar-width: none;
	}
</style>
