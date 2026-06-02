<script>
	import { resolve } from '$app/paths';
</script>

<!-- NAVBAR -->
<nav
	class="sticky top-0 z-[100] flex h-[58px] items-center gap-5 border-b border-gray-light bg-white px-8"
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

	<div class="nav-search ml-2 max-w-[320px] flex-1">
		<input
			type="text"
			placeholder="Search ideas..."
			class="h-9 w-full rounded-pill border border-gray-light bg-gray-faint px-4 text-[13px] text-black transition-colors outline-none placeholder:text-gray-mid focus:border-yellow focus:bg-white"
		/>
	</div>

	<div class="ml-auto flex items-center gap-[10px]">
		<a href={resolve('/auth/login')}>
			<button
				class="btn-ghost cursor-pointer rounded-full border border-[#DDD] bg-transparent px-3.5 py-1.5 text-[13px] font-medium text-[#444] transition-colors hover:border-[#111] hover:text-[#111]"
				>Sign in</button
			></a
		>
		<a href="./ideashare-post.html">
			<button
				class="flex cursor-pointer items-center gap-1.5 rounded-full border-none bg-[#111] px-4 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-85"
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

<!-- MAIN LAYOUT -->
<div
	class="layout mx-auto grid max-w-270 gap-6 px-6 py-7"
	style="grid-template-columns: 200px minmax(0,1fr) 220px"
>
	<!-- LEFT SIDEBAR -->
	<aside class="sidebar-left flex flex-col gap-0.5">
		<div
			class="sbl-section mt-4 px-[10px] py-1 text-[11px] font-semibold tracking-[0.08em] text-gray-mid uppercase first:mt-0"
		>
			Discover
		</div>
		<a
			class="sbl-item active flex cursor-pointer items-center gap-[10px] rounded-md bg-yellow-light px-[10px] py-2 text-[13.5px] font-medium text-black text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
				</svg>
			</div>
			All ideas
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
					<polyline points="17 6 23 6 23 12" />
				</svg>
			</div>
			Trending
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="12" cy="12" r="10" />
					<polyline points="12 6 12 12 16 14" />
				</svg>
			</div>
			New today
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
					/>
				</svg>
			</div>
			Being built
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="./tw-challenge-list.html"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
					/>
				</svg>
			</div>
			Join an Ideathon
		</a>
		<div
			class="sbl-section mt-4 px-[10px] py-1 text-[11px] font-semibold tracking-[0.08em] text-gray-mid uppercase"
		>
			Topics
		</div>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
					<path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
				</svg>
			</div>
			Education
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M22 12h-4l-3 9L9 3l-3 9H2" />
				</svg>
			</div>
			Health
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<rect x="2" y="3" width="20" height="14" rx="2" />
					<line x1="8" y1="21" x2="16" y2="21" />
					<line x1="12" y1="17" x2="12" y2="21" />
				</svg>
			</div>
			Technology
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
					<polyline points="9 22 9 12 15 12 15 22" />
				</svg>
			</div>
			Cities
		</a>
		<a
			class="sbl-item flex cursor-pointer items-center gap-[10px] rounded-md px-[10px] py-2 text-[13.5px] text-gray-dark no-underline transition-colors hover:bg-white hover:text-black"
			href="#"
		>
			<div class="sbl-icon flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center">
				<svg
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<line x1="12" y1="1" x2="12" y2="23" />
					<path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
				</svg>
			</div>
			Economy
		</a>
	</aside>

	<!-- FEED -->
	<main class="flex flex-col gap-[14px]">
		<div class="flex items-center justify-between">
			<div class="flex gap-1 rounded-pill border border-gray-light bg-white p-[3px]">
				<button
					class="cursor-pointer rounded-pill border-none bg-black px-[14px] py-[5px] font-body text-[13px] font-medium text-white"
					>For you</button
				>
				<button
					class="cursor-pointer rounded-pill border-none bg-transparent px-[14px] py-[5px] font-body text-[13px] font-medium text-gray-mid hover:text-black"
					>Latest</button
				>
				<button
					class="cursor-pointer rounded-pill border-none bg-transparent px-[14px] py-[5px] font-body text-[13px] font-medium text-gray-mid hover:text-black"
					>Most sparked</button
				>
			</div>
			<button
				class="flex cursor-pointer items-center gap-[6px] rounded-pill border border-gray-light bg-white px-[14px] py-[6px] font-body text-[13px] text-gray-dark"
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

		<!-- Dupe banner -->
		<!-- <div
        class="bg-yellow-light border border-yellow-mid rounded-md p-[10px_14px] flex items-center gap-[10px] text-[13px] text-black">
        <div class="w-[22px] h-[22px] bg-yellow rounded-full flex items-center justify-center flex-shrink-0">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#111">
            <path
              d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z" />
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" />
          </svg>
        </div>
        <span>3 similar ideas already exist — want to refine one instead?</span>
        <span class="ml-auto font-medium text-black cursor-pointer underline whitespace-nowrap">View similar →</span>
      </div> -->

		<!-- Card 1 — sparked -->
		<article
			class="cursor-pointer rounded-lg border border-gray-light bg-white p-[18px_20px] transition-all hover:border-yellow hover:[box-shadow:0_0_0_3px_#FFF8DC]"
		>
			<a href="./ideashare-detail.html">
				<div class="mb-[10px] flex items-start gap-[14px]">
					<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-black">
						A universal exam system independent of any university — certify your skills, study
						anywhere
					</div>
					<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
						<div
							class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-yellow bg-yellow"
						>
							<svg width="16" height="16" viewBox="0 0 24 24" fill="#111">
								<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
							</svg>
						</div>
						<div class="text-[12px] font-medium text-gray-dark">847</div>
					</div>
				</div>
			</a>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-gray-dark">
				What if you could study from YouTube, books, or anywhere you want — and just show up to a
				standardised exam to get certified? No enrollment, no fees, no location barrier.
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#education</span
				>
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#credentials</span
				>
				<span
					class="rounded-pill border border-[#C7D2FE] bg-[#EEF2FF] px-[10px] py-[3px] text-[12px] font-medium text-[#3730A3]"
					>Being refined</span
				>
				<div class="card-meta ml-auto flex items-center gap-3">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-yellow text-[9px] font-semibold text-black"
						>
							RK
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-black text-[9px] font-semibold text-white"
						>
							SM
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-gray-light text-[9px] font-semibold text-gray-dark"
						>
							+4
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-gray-mid">12 builds</span>
				</div>
			</div>
		</article>

		<!-- Card 2 -->
		<article
			class="cursor-pointer rounded-lg border border-gray-light bg-white p-[18px_20px] transition-all hover:border-yellow hover:[box-shadow:0_0_0_3px_#FFF8DC]"
		>
			<div class="mb-[10px] flex items-start gap-[14px]">
				<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-black">
					Let patients own their medical records — stored on their phone, shared with any doctor
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
					<div
						class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-gray-light bg-white transition-all hover:border-yellow hover:bg-yellow-light"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#888"
							stroke-width="2"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[12px] font-medium text-gray-dark">512</div>
				</div>
			</div>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-gray-dark">
				Right now hospitals hold your data hostage. What if every person had a personal health file
				they control — share it with any doctor, anywhere in the world, instantly.
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#health</span
				>
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#data</span
				>
				<span
					class="rounded-pill border border-[#A7F3D0] bg-[#ECFDF5] px-[10px] py-[3px] text-[12px] font-medium text-[#065F46]"
					>Someone's building it</span
				>
				<div class="card-meta ml-auto flex items-center gap-3">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-black text-[9px] font-semibold text-white"
						>
							TA
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-yellow text-[9px] font-semibold text-black"
						>
							NI
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-gray-mid">5 builds</span>
				</div>
			</div>
		</article>

		<!-- Card 3 -->
		<article
			class="cursor-pointer rounded-lg border border-gray-light bg-white p-[18px_20px] transition-all hover:border-yellow hover:[box-shadow:0_0_0_3px_#FFF8DC]"
		>
			<div class="mb-[10px] flex items-start gap-[14px]">
				<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-black">
					Build your own university major — pick courses from different institutions to form a
					custom degree
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
					<div
						class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-gray-light bg-white transition-all hover:border-yellow hover:bg-yellow-light"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#888"
							stroke-width="2"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[12px] font-medium text-gray-dark">389</div>
				</div>
			</div>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-gray-dark">
				Why does a major have to be pre-defined? Let students mix AI ethics from MIT, film theory
				from NYU, and economics from LSE into a single recognised credential.
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#education</span
				>
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#future</span
				>
				<span
					class="rounded-pill border border-[#FFE08A] bg-[#FFF3CD] px-[10px] py-[3px] text-[12px] font-medium text-[#7A5800]"
					>Raw idea</span
				>
				<div class="card-meta ml-auto flex items-center gap-3">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-yellow text-[9px] font-semibold text-black"
						>
							FK
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-gray-mid">2 builds</span>
				</div>
			</div>
		</article>

		<!-- Card 4 -->
		<article
			class="cursor-pointer rounded-lg border border-gray-light bg-white p-[18px_20px] transition-all hover:border-yellow hover:[box-shadow:0_0_0_3px_#FFF8DC]"
		>
			<div class="mb-[10px] flex items-start gap-[14px]">
				<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-black">
					A neighbourhood app where locals vote on which small businesses get a temporary rent
					subsidy
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
					<div
						class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-gray-light bg-white transition-all hover:border-yellow hover:bg-yellow-light"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="#888"
							stroke-width="2"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[12px] font-medium text-gray-dark">204</div>
				</div>
			</div>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-gray-dark">
				High rents kill the best local spots. What if the community could pool a small monthly fund
				and vote each quarter on which café, bookshop, or repair shop gets supported?
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#cities</span
				>
				<span
					class="rounded-pill border border-gray-light bg-gray-faint px-[10px] py-[3px] text-[12px] text-gray-dark"
					>#economy</span
				>
				<span
					class="rounded-pill border border-[#FFE08A] bg-[#FFF3CD] px-[10px] py-[3px] text-[12px] font-medium text-[#7A5800]"
					>Raw idea</span
				>
				<div class="card-meta ml-auto flex items-center gap-3">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-black text-[9px] font-semibold text-white"
						>
							LM
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-white bg-gray-light text-[9px] font-semibold text-gray-dark"
						>
							+2
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-gray-mid">3 builds</span>
				</div>
			</div>
		</article>
	</main>

	<!-- RIGHT SIDEBAR -->
	<aside class="sidebar-right flex flex-col gap-4">
		<div class="rounded-lg bg-yellow p-[18px_16px]">
			<div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-black">
				<svg viewBox="0 0 24 24" fill="none" width="20" height="20">
					<path
						d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
						fill="#F5C518"
					/>
					<path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z" fill="#F5C518" />
				</svg>
			</div>
			<div class="mb-[6px] font-display text-[15px] leading-[1.35] font-semibold text-black">
				You had a thought today. Don't let it disappear.
			</div>
			<div class="text-black-soft mb-[14px] text-[12px] leading-[1.5] opacity-70">
				Ideas shared here have inspired real projects.
			</div>
			<button
				class="w-full cursor-pointer rounded-md border-none bg-black py-[9px] font-body text-[13px] font-medium text-white transition-opacity hover:opacity-85"
				>+ Share your idea</button
			>
		</div>

		<div class="rounded-lg border border-gray-light bg-white p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-gray-mid uppercase">
				Trending topics
			</div>
			<div
				class="flex items-center justify-between border-b border-gray-faint py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-black hover:text-yellow-dark">#education</span
				><span class="text-[12px] text-gray-mid">1.2k ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-gray-faint py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-black hover:text-yellow-dark">#health</span
				><span class="text-[12px] text-gray-mid">874 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-gray-faint py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-black hover:text-yellow-dark">#cities</span
				><span class="text-[12px] text-gray-mid">631 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-gray-faint py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-black hover:text-yellow-dark">#technology</span
				><span class="text-[12px] text-gray-mid">590 ideas</span>
			</div>
			<div class="flex items-center justify-between py-[6px] text-[13px]">
				<span class="cursor-pointer font-medium text-black hover:text-yellow-dark">#economy</span
				><span class="text-[12px] text-gray-mid">412 ideas</span>
			</div>
		</div>

		<div class="rounded-lg bg-black p-4">
			<div class="mb-2 text-[11px] font-semibold tracking-[0.08em] text-yellow uppercase">
				This week's top idea
			</div>
			<div class="mb-[10px] font-display text-[13px] leading-[1.45] font-medium text-white">
				Universal exam system gains 800+ sparks in 3 days
			</div>
			<div class="text-[12px] text-gray-mid">
				<span class="font-medium text-yellow">12 people</span> want to build it
			</div>
		</div>
	</aside>
</div>

<!-- Bottom nav (mobile only) -->
<div
	id="bottom-nav"
	style="display:none;"
	class="fixed right-0 bottom-0 left-0 z-[200] flex h-[60px] border-t border-gray-light bg-white"
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
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px] text-gray-mid"
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
				class="flex h-[18px] w-[18px] items-center justify-center rounded-full bg-yellow text-sm leading-none text-black"
			>
				+
			</div>
		</div>
	</button>
	<button
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px] text-gray-mid"
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
		class="flex flex-1 cursor-pointer flex-col items-center justify-center gap-[3px] border-none bg-transparent font-body text-[10px] text-gray-mid"
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

<style>
	body {
		font-family: 'DM Sans', sans-serif;
	}

	.font-display {
		font-family: 'Bricolage Grotesque', sans-serif;
	}

	@media (max-width: 860px) {
		.sidebar-right {
			display: none;
		}

		.layout {
			grid-template-columns: 160px minmax(0, 1fr) !important;
		}
	}

	@media (max-width: 600px) {
		.nav-search,
		.btn-ghost {
			display: none;
		}

		.sidebar-left {
			flex-direction: row;
			overflow-x: auto;
			scrollbar-width: none;
		}

		.sidebar-left::-webkit-scrollbar {
			display: none;
		}

		.sbl-section,
		.sbl-icon {
			display: none;
		}

		.sbl-item-mobile {
			white-space: nowrap;
			padding: 6px 14px;
			border-radius: 999px;
			border: 1px solid #dddddd;
			background: #fff;
			font-size: 12px;
			flex-shrink: 0;
		}

		.sbl-item-mobile.active {
			background: #111;
			color: #fff;
			border-color: #111;
		}

		.layout {
			grid-template-columns: 1fr !important;
			padding: 12px 12px 80px !important;
		}

		.card-meta {
			display: none;
		}

		.tokens-section {
			display: none;
		}
	}
</style>
