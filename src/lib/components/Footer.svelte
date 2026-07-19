<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
	import { resolve } from '$app/paths';

	const year = new Date().getFullYear();

	const links = {
		platform: [
			{ label: 'Home feed', href: '/' },
			{ label: 'Explore ideas', href: '/explore' },
			{ label: 'Challenges', href: '/challenges' },
			{ label: 'Post an idea', href: '/post' },
			{ label: 'Trending topics', href: '/topics' }
		],
		company: [
			{ label: 'About', href: '/about' },
			{ label: 'Blog', href: '/blog' },
			{ label: 'Run a challenge', href: '/sponsor' },
			{ label: 'Press kit', href: '/press' },
			{ label: 'Contact', href: '/contact' }
		],
		legal: [
			{ label: 'Privacy policy', href: '/privacy' },
			{ label: 'Terms of service', href: '/terms' },
			{ label: 'Cookie settings', href: '/cookies' },
			{ label: 'Attribution guide', href: '/attribution' }
		]
	};
</script>

<footer class="mt-20 bg-[#111] px-10 pt-12 pb-7 font-body sm:px-5 sm:pt-8">
	<!-- Top grid -->
	<div class="mb-10 grid gap-10" style="grid-template-columns: 1.8fr 1fr 1fr 1fr;">
		<!-- Brand column -->
		<div>
			<!-- Open beta badge -->
			<div
				class="mb-4 inline-flex items-center gap-1.5 rounded-full
                  border border-[rgba(245,197,24,0.2)] bg-[rgba(245,197,24,0.1)]
                  px-2.5 py-1 text-[11px] font-semibold text-[#F5C518]"
			>
				⚡ Open beta
			</div>

			<!-- Logo -->
			<a href={resolve('/')} class="mb-3.5 flex items-center gap-2 no-underline">
				<img src="/logo.svg" alt="logo" class="h-6 w-6" />
				<span class="font-display text-[17px] font-bold tracking-tight text-white">
					Idea<span class="text-[#F5C518]">Share</span>
				</span>
			</a>

			<p class="mb-5 max-w-[220px] text-[13px] leading-[1.7] text-white/40">
				Where good ideas find their people. Share it, refine it, build it — together.
			</p>

			<!-- Social links -->
			<div class="flex gap-2.5">
				{#each [{ href: 'https://x.com', label: 'X / Twitter', icon: '𝕏' }, { href: 'https://github.com', label: 'GitHub', icon: '⌥' }, { href: 'https://linkedin.com', label: 'LinkedIn', icon: 'in' }] as s (s.label)}
					<a
						href={s.href}
						aria-label={s.label}
						target="_blank"
						rel="noopener noreferrer"
						class="flex h-8 w-8 items-center justify-center rounded-[8px] border
                    border-white/10 text-[13px] text-white/45 no-underline
                    transition-all hover:border-white/30 hover:text-white"
					>
						{s.icon}
					</a>
				{/each}
			</div>
		</div>

		<!-- Link columns -->
		{#each Object.entries(links) as [title, items] (title)}
			<div>
				<div
					class="mb-3.5 text-[11px] font-semibold tracking-widest
                    text-white/30 uppercase"
				>
					{title}
				</div>
				<ul class="flex list-none flex-col gap-2.5">
					{#each items as { label, href } (label)}
						<li>
							<a
								{href}
								class="text-[13px] text-white/50 no-underline
                               transition-colors hover:text-[#F5C518]"
							>
								{label}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</div>

	<!-- Divider -->
	<div class="mb-5 h-px bg-white/7"></div>

	<!-- Bottom bar -->
	<div class="flex flex-wrap items-center justify-between gap-3">
		<div class="text-[12px] text-white/25">
			© {year} <span class="text-[#F5C518]">IdeaShare</span>. Ideas belong to their people.
		</div>
		<div class="flex gap-5">
			{#each [['Privacy', '/privacy'], ['Terms', '/terms'], ['Cookies', '/cookies']] as [label, href] (label)}
				<a
					{href}
					class="text-[12px] text-white/30 no-underline
                         transition-colors hover:text-white/60"
				>
					{label}
				</a>
			{/each}
		</div>
	</div>
</footer>
