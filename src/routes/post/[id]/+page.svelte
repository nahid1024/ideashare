<script lang="ts">
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import RefinementSection from '$lib/components/RefinementSection.svelte';
	import { renderTiptapJSON, timeAgo } from '$lib/utils.js';
	import { Avatar } from 'bits-ui';
	import DOMPurify from 'isomorphic-dompurify';

	const { data } = $props();

	const post = $derived(data.post);
	// Reactive state for the idea details
	let idea = $state({
		title:
			'A universal exam system independent of any university — certify your skills, study anywhere',
		description:
			'What if you could study from YouTube, books, MOOCs, or anywhere you want — and just show up to a standardised exam to get certified? No enrollment, no tuition fees, no geographic restriction. Your knowledge is what gets tested, not where you sat in a classroom.',
		problem:
			'University degrees are expensive and location-dependent, but skills are what actually matter to employers. Millions of people in developing countries have the ability but not the access.',
		whoBenefits:
			'Students in developing countries, working adults who want to upskill, people who learn better independently, and employers who want to hire based on demonstrated ability.',
		status: 'Being refined',
		tags: ['education', 'credentials'],
		author: {
			name: 'Nahid Khan',
			location: 'Dhaka, Bangladesh',
			initials: 'NK'
		},
		createdAtText: 'Posted 3 days ago',
		sparks: 847,
		sparked: false,
		refinementsCount: 24,
		forksCount: 6,
		buildersCount: 12,
		viewsCount: '4.2k'
	});

	// Builders list
	let builders = $state([
		{
			name: 'Tariq Khan',
			role: 'Full-stack dev',
			initials: 'TK',
			lead: true,
			bgClass: 'bg-success-background text-success-foreground'
		},
		{
			name: 'Lena Moser',
			role: 'EdTech designer',
			initials: 'LM',
			lead: false,
			bgClass: 'bg-info-background text-info-foreground'
		},
		{
			name: 'Paulo Oliveira',
			role: 'Policy researcher',
			initials: 'PO',
			lead: false,
			bgClass: 'bg-warning-background text-warning-foreground'
		},
		{
			name: 'Aisha Jallow',
			role: 'Backend dev',
			initials: 'AJ',
			lead: false,
			bgClass: 'bg-destructive-background text-destructive-foreground'
		}
	]);

	// Similar ideas list
	const similarIdeas = [
		{
			title: 'Build your own university major from courses at different institutions',
			sparks: 389,
			builds: 2
		},
		{
			title: 'A global skills passport replacing traditional CVs',
			sparks: 271,
			builds: 4
		},
		{
			title: 'Employer-run certification replacing university degrees',
			sparks: 198,
			builds: 1
		}
	];

	// Spark toggle handler
	function toggleSpark() {
		if (idea.sparked) {
			idea.sparks--;
			idea.sparked = false;
		} else {
			idea.sparks++;
			idea.sparked = true;
		}
	}

	// Join builder state and handler
	let joinedAsBuilder = $state(false);

	function toggleJoinBuilder() {
		if (joinedAsBuilder) {
			// Remove the user from builders
			builders = builders.filter((b) => b.name !== 'Nahid Khan' || b.role !== 'You');
			idea.buildersCount--;
			joinedAsBuilder = false;
		} else {
			// Add the user to builders
			builders.push({
				name: 'Nahid Khan',
				role: 'You',
				initials: 'NK',
				lead: false,
				bgClass: 'bg-accent text-accent-foreground'
			});
			idea.buildersCount++;
			joinedAsBuilder = true;
		}
	}
</script>

<!-- eslint-disable svelte/no-at-html-tags -->
<svelte:head>
	<title>{post.title} - Ideashare</title>
</svelte:head>

<!-- NAVBAR -->
<Navbar user={data.user} />

<!-- LAYOUT -->
<div
	class="detail-layout mx-auto grid max-w-250 grid-cols-1 items-start gap-6 pt-3.5 pb-20 min-[761px]:grid-cols-[minmax(0,1fr)_240px] min-[761px]:px-6 min-[761px]:pt-7 min-[761px]:pb-7 sm:px-3"
>
	<!-- MAIN -->
	<div class="flex flex-col gap-4">
		<!-- Back link -->
		<a
			href={resolve('/')}
			class="mb-1 flex w-fit items-center gap-1.5 text-[13px] text-foreground-muted no-underline transition-colors hover:text-foreground"
		>
			<svg
				width="14"
				height="14"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
			>
				<polyline points="15 18 9 12 15 6" />
			</svg>
			Back to feed
		</a>

		<!-- Idea header -->
		<div class="overflow-hidden rounded-t-2xl border border-border bg-background sm:rounded-2xl">
			<div class="relative bg-accent px-6 py-7 sm:p-[28px_28px_24px]">
				<div class="mb-3.5 flex items-center gap-2">
					{#each post.postTopics as tag (tag)}
						<span class="rounded-full bg-black/10 px-2.5 py-0.75 text-[11px] font-medium text-black"
							>#{tag.topic?.name}</span
						>
					{/each}
				</div>
				<h1
					class="max-w-140 font-display text-[24px] leading-[1.3] font-bold tracking-[-0.4px] wrap-break-word text-black"
				>
					{post.title}
				</h1>
			</div>
			<!-- Idea details -->
			<div class="px-1 py-7 sm:p-[20px_28px]">
				<p
					class="editor-content mb-5 text-[14.5px] leading-[1.75] wrap-break-word text-foreground-secondary"
				>
					{@html DOMPurify.sanitize(renderTiptapJSON(post.description))}
				</p>

				<div class="mb-5 flex flex-col gap-3">
					{#if post.solvedProblems}
						<div class="rounded-md bg-background-muted p-[12px_16px]">
							<div
								class="mb-1.25 text-[11px] font-semibold tracking-[0.07em] text-foreground-muted uppercase"
							>
								Problem it solves
							</div>
							<div class="text-[13.5px] leading-[1.6] wrap-break-word text-foreground">
								{post.solvedProblems}
							</div>
						</div>
					{/if}
					{#if post.whoBenefits}
						<div class="rounded-md bg-background-muted p-[12px_16px]">
							<div
								class="mb-1.25 text-[11px] font-semibold tracking-[0.07em] text-foreground-muted uppercase"
							>
								Who would benefit
							</div>
							<div class="text-[13.5px] leading-[1.6] wrap-break-word text-foreground">
								{post.whoBenefits}
							</div>
						</div>
					{/if}
				</div>

				<div class="flex items-center gap-3 border-t border-border pt-4">
					<div class="flex items-center gap-2">
						<Avatar.Root
							class="flex h-10 w-10 items-center justify-center rounded-full bg-black text-[12px] font-semibold text-accent"
						>
							<Avatar.Image class="rounded-full" src={post.author.image} />
							<Avatar.Fallback class="rounded-full">NK</Avatar.Fallback>
						</Avatar.Root>
						{#if post.isAnonymous}
							<div class="text-[13px] font-medium text-foreground">Anonymous</div>
						{:else}
							<div>
								<div class="text-[13px] font-medium text-foreground">{post.author.name}</div>
								<!-- <div class="text-[12px] text-foreground-muted">{idea.author.location}</div> -->
							</div>
						{/if}
					</div>
					<div class="ml-auto text-[12px] text-foreground-muted">
						Posted {timeAgo(post.createdAt)}
					</div>
				</div>
			</div>
		</div>

		<!-- Action bar -->
		<div
			class="flex flex-wrap items-center gap-2.5 border border-border bg-background p-[14px_20px] sm:rounded-2xl"
		>
			<button
				onclick={toggleSpark}
				class="flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-4.5 py-2 font-[inherit] text-sm font-semibold transition-colors {idea.sparked
					? 'border-accent bg-accent text-foreground'
					: 'border-border bg-transparent text-foreground-secondary hover:border-foreground hover:text-foreground'}"
			>
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
				</svg>
				Sparked
			</button>
			<div class="px-1 text-[15px] font-bold text-foreground">{idea.sparks}</div>

			<div class="mx-1 h-7 w-px bg-border"></div>

			<a
				class="flex cursor-pointer items-center gap-1.75 rounded-full border border-border bg-transparent px-4 py-2 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
				href="#refinement-section"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
				</svg>
				{data.refinements.length} refinements
			</a>
			<button
				class="flex cursor-pointer items-center gap-1.75 rounded-full border border-border bg-transparent px-4 py-2 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
					<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
				</svg>
				Share
			</button>
			<button
				class="flex cursor-pointer items-center gap-1.75 rounded-full border border-border bg-transparent px-4 py-2 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
				Fork idea
			</button>
		</div>

		<!-- Refinements heading -->
		<div id="refinement-section" class="ml-2">
			<div class="font-display text-base font-semibold text-foreground">Refinements</div>
			<div class="mb-3.5 text-[12px] text-foreground-muted">
				{data.refinements.length} people have added their thoughts — sorted by most helpful
			</div>
		</div>

		<!-- Fork card -->
		<!-- <div class="rounded-2xl border border-info-border bg-info-background p-[16px_18px]">
			<div
				class="mb-2 flex items-center gap-[6px] text-[11px] font-semibold tracking-wider text-info-foreground uppercase"
			>
				<svg
					width="12"
					height="12"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.5"
				>
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
				Forked idea
			</div>
			<div class="mb-[6px] font-display text-sm leading-[1.4] font-semibold text-foreground">
				What if it was employer-run instead of government-run? Companies set the exam standards for
				their own industries.
			</div>
			<div class="text-[13px] leading-[1.6] text-foreground-secondary">
				Removes the political barrier of getting governments to agree. Companies like Google or
				Siemens could certify skills directly — more trusted by hiring managers anyway.
			</div>
		</div> -->

		<!-- Refinement list loop -->
		<div class="flex flex-col gap-2">
			<RefinementSection refinements={data.refinements} postId={post.id} userId={data.userId} />
		</div>
	</div>

	<!-- SIDEBAR -->
	<aside class="detail-sidebar hidden flex-col gap-4 min-[761px]:flex">
		<div class="rounded-2xl border border-border bg-background p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
				Idea stats
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="text-foreground-muted">Sparks</span><span class="font-semibold text-yellow-500"
					>{idea.sparks} ⚡</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="text-foreground-muted">Refinements</span><span
					class="font-semibold text-foreground">{idea.refinementsCount}</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="text-foreground-muted">Forks</span><span class="font-semibold text-foreground"
					>{idea.forksCount}</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="text-foreground-muted">Builders</span><span
					class="font-semibold text-foreground">{idea.buildersCount}</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-1.5 text-[13px]"
			>
				<span class="text-foreground-muted">Views</span><span class="font-semibold text-foreground"
					>{idea.viewsCount}</span
				>
			</div>
			<div class="flex items-center justify-between py-1.5 text-[13px]">
				<span class="text-foreground-muted">Status</span><span class="font-semibold text-foreground"
					>{idea.status}</span
				>
			</div>
		</div>

		<div class="rounded-2xl border border-border bg-background p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
				Want to build this
			</div>
			{#each builders as b (b.name)}
				<div class="flex items-center gap-2.5 border-b border-border-muted py-1.75 last:border-b-0">
					<div
						class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold {b.bgClass}"
					>
						{b.initials}
					</div>
					<div class="min-w-0 flex-1">
						<div class="text-[13px] font-medium text-foreground">{b.name}</div>
						<div class="text-[11px] text-foreground-muted">{b.role}</div>
					</div>
					{#if b.lead}
						<span
							class="rounded-full border border-yellow-200 bg-yellow-100 px-2.25 py-0.5 text-[11px] font-medium whitespace-nowrap text-yellow-500"
						>
							Lead
						</span>
					{/if}
				</div>
			{/each}
			<div class="mt-3">
				<button
					onclick={toggleJoinBuilder}
					class="w-full cursor-pointer rounded-md border-[1.5px] border-dashed border-border bg-transparent py-2 font-[inherit] text-[13px] text-foreground-muted transition-colors hover:border-foreground-muted hover:text-foreground"
				>
					{joinedAsBuilder ? '✓ Joined as builder' : '+ Join as builder'}
				</button>
			</div>
		</div>

		<div class="rounded-2xl bg-dark p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.07em] text-accent uppercase">
				Similar ideas
			</div>
			{#each similarIdeas as sim (sim.title)}
				<div class="group cursor-pointer border-b border-white/8 py-2 last:border-b-0">
					<div
						class="mb-1 text-[12.5px] leading-[1.4] font-medium text-light transition-colors group-hover:text-accent"
					>
						{sim.title}
					</div>
					<div class="text-[11px] text-foreground-muted">
						<span class="font-medium text-accent">{sim.sparks} ⚡</span> · {sim.builds}
						{sim.builds === 1 ? 'build' : 'builds'}
					</div>
				</div>
			{/each}
		</div>
	</aside>
</div>

<Footer />
