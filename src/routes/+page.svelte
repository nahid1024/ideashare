<script>
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<div
	class="layout mx-auto grid max-w-270 grid-cols-1 gap-6 px-3 py-7 max-[600px]:pb-[80px] min-[601px]:grid-cols-[160px_minmax(0,1fr)] min-[601px]:px-6 min-[861px]:grid-cols-[200px_minmax(0,1fr)_220px]"
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
			class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-primary bg-primary px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-inverted no-underline transition-colors duration-100 sm:rounded-md sm:border-none sm:bg-yellow-100 sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:font-medium sm:text-foreground"
			href="#"
		>
			<div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
				<svg
					class="h-3.5 w-3.5"
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
			class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href="#"
		>
			<div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
				<svg
					class="h-3.5 w-3.5"
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
			class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href="#"
		>
			<div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
				<svg
					class="h-3.5 w-3.5"
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
			class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href="#"
		>
			<div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
				<svg
					class="h-3.5 w-3.5"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M8 3h8v2a4 4 0 01-4 4 4 4 0 01-4-4V3z" />
					<path d="M5 7H3a2 2 0 002 2 2 2 0 002-2H7" />
					<path d="M17 7h2a2 2 0 01-2 2 2 2 0 01-2-2" />
					<path d="M8 14h8" />
					<path d="M12 14v7" />
				</svg>
			</div>
			Being built
		</a>
		<a class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
        href="#">
        <div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0" />
          </svg>

        </div>
        Join an Ideathon
      </a>

		<div
			class="mt-4 hidden px-2.5 py-1 text-[11px] font-semibold tracking-wider text-foreground-muted uppercase sm:block"
		>
			Topics
		</div>

		<a
			class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
			href="#"
		>
			<div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
				<svg
					class="h-3.5 w-3.5"
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
		<a class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
        href="#">
        <div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M22 12h-4l-3 9L9 3l-3 9H2" />
          </svg>
        </div>
        Health
      </a>
      <a class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
        href="#">
        <div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <rect x="2" y="3" width="20" height="14" rx="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg></div>
        Technology
      </a>
      <a class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
        href="#">
        <div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
              d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg></div>
        Cities
      </a>
      <a class="flex flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-background px-3.5 py-1.5 text-xs whitespace-nowrap text-foreground-secondary no-underline transition-colors duration-100 hover:text-foreground sm:rounded-md sm:border-none sm:bg-transparent sm:px-2.5 sm:py-2 sm:text-[13.5px] sm:hover:bg-background"
        href="#">
        <div class="hidden h-4.5 w-4.5 flex-shrink-0 items-center justify-center sm:flex">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
            stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 1v22" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
          </svg></div>
        Economy
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

		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
		>
			<a href="./ideashare-detail.html">
				<div class="mb-[10px] flex items-start gap-[14px]">
					<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-foreground">
						A universal exam system independent of any university — certify your skills, study
						anywhere
					</div>
					<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
						<div
							class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-accent bg-accent"
						>
							<svg
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="currentColor"
								class="text-accent-foreground"
							>
								<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
							</svg>
						</div>
						<div class="text-[12px] font-medium text-foreground-secondary">847</div>
					</div>
				</div>
			</a>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-foreground-secondary">
				What if you could study from YouTube, books, or anywhere you want — and just show up to a
				standardised exam to get certified? No enrollment, no fees, no location barrier.
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#education</span
				>
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#credentials</span
				>
				<span
					class="rounded-full border border-[#C7D2FE] bg-[#EEF2FF] px-[10px] py-[3px] text-[12px] font-medium text-[#3730A3]"
					>Being refined</span
				>

				<div class="card-meta ml-auto hidden items-center gap-3 min-[601px]:flex">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-accent text-[9px] font-semibold text-accent-foreground"
						>
							RK
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-semibold text-foreground-inverted"
						>
							SM
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-border-strong text-[9px] font-semibold text-foreground-secondary"
						>
							+4
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-foreground-muted">12 builds</span>
				</div>
			</div>
		</article>

		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
		>
			<div class="mb-[10px] flex items-start gap-[14px]">
				<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-foreground">
					Let patients own their medical records — stored on their phone, shared with any doctor
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
					<div
						class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-border bg-background transition-all hover:border-accent hover:bg-yellow-100"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="text-foreground-muted"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[12px] font-medium text-foreground-secondary">512</div>
				</div>
			</div>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-foreground-secondary">
				Right now hospitals hold your data hostage. What if every person had a personal health file
				they control — share it with any doctor, anywhere in the world, instantly.
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#health</span
				>
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#data</span
				>
				<span
					class="rounded-full border border-success-border bg-success-background px-[10px] py-[3px] text-[12px] font-medium text-success-foreground"
					>Someone's building it</span
				>

				<div class="card-meta ml-auto hidden items-center gap-3 min-[601px]:flex">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-semibold text-foreground-inverted"
						>
							TA
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-accent text-[9px] font-semibold text-accent-foreground"
						>
							NI
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-foreground-muted">5 builds</span>
				</div>
			</div>
		</article>

		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
		>
			<div class="mb-[10px] flex items-start gap-[14px]">
				<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-foreground">
					Build your own university major — pick courses from different institutions to form a
					custom degree
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
					<div
						class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-border bg-background transition-all hover:border-accent hover:bg-yellow-100"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="text-foreground-muted"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[12px] font-medium text-foreground-secondary">389</div>
				</div>
			</div>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-foreground-secondary">
				Why does a major have to be pre-defined? Let students mix AI ethics from MIT, film theory
				from NYU, and economics from LSE into a single recognised credential.
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#education</span
				>
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#future</span
				>
				<span
					class="rounded-full border border-warning-border bg-warning-background px-[10px] py-[3px] text-[12px] font-medium text-warning-foreground"
					>Raw idea</span
				>

				<div class="card-meta ml-auto hidden items-center gap-3 min-[601px]:flex">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-accent text-[9px] font-semibold text-accent-foreground"
						>
							FK
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-foreground-muted">2 builds</span>
				</div>
			</div>
		</article>

		<article
			class="cursor-pointer rounded-lg border border-border bg-background p-[18px_20px] transition-all hover:border-accent hover:[box-shadow:var(--shadow-focus)]"
		>
			<div class="mb-[10px] flex items-start gap-[14px]">
				<div class="flex-1 font-display text-[15px] leading-[1.4] font-semibold text-foreground">
					A neighbourhood app where locals vote on which small businesses get a temporary rent
					subsidy
				</div>
				<div class="flex flex-shrink-0 flex-col items-center gap-[3px]">
					<div
						class="flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-md border-[1.5px] border-border bg-background transition-all hover:border-accent hover:bg-yellow-100"
					>
						<svg
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							class="text-foreground-muted"
						>
							<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
						</svg>
					</div>
					<div class="text-[12px] font-medium text-foreground-secondary">204</div>
				</div>
			</div>
			<p class="mb-[14px] text-[13.5px] leading-[1.65] text-foreground-secondary">
				High rents kill the best local spots. What if the community could pool a small monthly fund
				and vote each quarter on which café, bookshop, or repair shop gets supported?
			</p>
			<div class="card-footer flex flex-wrap items-center gap-[6px]">
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#cities</span
				>
				<span
					class="rounded-full border border-border bg-background-muted px-[10px] py-[3px] text-[12px] text-foreground-secondary"
					>#economy</span
				>
				<span
					class="rounded-full border border-warning-border bg-warning-background px-[10px] py-[3px] text-[12px] font-medium text-warning-foreground"
					>Raw idea</span
				>

				<div class="card-meta ml-auto hidden items-center gap-3 min-[601px]:flex">
					<div class="flex items-center">
						<div
							class="ml-0 flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-primary text-[9px] font-semibold text-foreground-inverted"
						>
							LM
						</div>
						<div
							class="-ml-[6px] flex h-[22px] w-[22px] items-center justify-center rounded-full border-2 border-background bg-border-strong text-[9px] font-semibold text-foreground-secondary"
						>
							+2
						</div>
					</div>
					<span class="text-[12px] whitespace-nowrap text-foreground-muted">3 builds</span>
				</div>
			</div>
		</article>
	</main>

	<aside class="sidebar-right hidden flex-col gap-4 lg:flex">
		<div class="rounded-lg bg-accent p-[18px_16px] text-accent-foreground">
			<div class="mb-3 flex h-9 w-9 items-center justify-center rounded-md bg-primary">
				<svg viewBox="0 0 24 24" fill="none" width="20" height="20">
					<path
						d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7z"
						fill="currentColor"
						class="text-accent"
					/>
					<path
						d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1z"
						fill="currentColor"
						class="text-accent"
					/>
				</svg>
			</div>
			<div class="mb-[6px] font-display text-[15px] leading-[1.35] font-semibold">
				You had a thought today. Don't let it disappear.
			</div>
			<div class="mb-[14px] text-[12px] leading-[1.5] opacity-70">
				Ideas shared here have inspired real projects.
			</div>
			<button
				class="w-full cursor-pointer rounded-md border-none bg-primary py-[9px] font-body text-[13px] font-medium text-foreground-inverted transition-opacity hover:opacity-85"
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
				<span class="cursor-pointer font-medium text-foreground hover:text-accent-hover"
					>#education</span
				>
				<span class="text-[12px] text-foreground-muted">1.2k ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-foreground hover:text-accent-hover"
					>#health</span
				>
				<span class="text-[12px] text-foreground-muted">874 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-foreground hover:text-accent-hover"
					>#cities</span
				>
				<span class="text-[12px] text-foreground-muted">631 ideas</span>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="cursor-pointer font-medium text-foreground hover:text-accent-hover"
					>#technology</span
				>
				<span class="text-[12px] text-foreground-muted">590 ideas</span>
			</div>
			<div class="flex items-center justify-between py-[6px] text-[13px]">
				<span class="cursor-pointer font-medium text-foreground hover:text-accent-hover"
					>#economy</span
				>
				<span class="text-[12px] text-foreground-muted">412 ideas</span>
			</div>
		</div>

		<div class="rounded-lg bg-primary p-4">
			<div class="mb-2 text-[11px] font-semibold tracking-[0.08em] text-accent uppercase">
				This week's top idea
			</div>
			<div
				class="mb-[10px] font-display text-[13px] leading-[1.45] font-medium text-foreground-inverted"
			>
				Universal exam system gains 800+ sparks in 3 days
			</div>
			<div class="text-[12px] text-foreground-muted">
				<span class="font-medium text-accent">12 people</span> want to build it
			</div>
		</div>
	</aside>
</div>

<style>
</style>
