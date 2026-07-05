<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';

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

	// Refinements list
	let refinements = $state([
		{
			id: 1,
			author: {
				name: 'Sara Müller',
				initials: 'SM',
				role: 'Works in education'
			},
			type: 'obstacle',
			typeText: '⚠ Potential obstacle',
			content:
				"The biggest challenge is exam integrity — how do you prevent cheating when anyone can take it anywhere? The existing standardised tests like IELTS solve this with proctored centres. You'd need a global network of trusted testing locations, which is expensive to build.",
			helpfulCount: 38,
			helpfulClicked: false,
			timeAgo: '2 days ago'
		},
		{
			id: 2,
			author: {
				name: 'Tolu Adeyemi',
				initials: 'TA',
				role: 'Software developer'
			},
			type: 'build',
			typeText: '✦ Builds on idea',
			content:
				'This already partially exists — CompTIA, AWS certifications, and CFA all work this way. The gap is that they\'re industry-specific and not unified. What if there was a single credentialing body that issued a "passport" combining multiple such certifications into one verified profile?',
			helpfulCount: 61,
			helpfulClicked: false,
			timeAgo: '2 days ago'
		},
		{
			id: 3,
			author: {
				name: 'Nadia Islam',
				initials: 'NI',
				role: 'Student'
			},
			type: 'build',
			typeText: '✦ Builds on idea',
			content:
				'In Bangladesh this would be transformational. Internet access is widespread but quality universities are only in Dhaka. If a student in Sylhet could study online and sit an exam locally to get a credential recognised by employers, it would change everything for rural students.',
			helpfulCount: 44,
			helpfulClicked: false,
			timeAgo: '1 day ago'
		}
	]);

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

	// Refinement types config
	const refinementTypes = [
		{ id: 'build', text: '✦ Builds on idea' },
		{ id: 'obstacle', text: '⚠ Potential obstacle' },
		{ id: 'fork', text: '↗ Fork idea' },
		{ id: 'question', text: '? Question' }
	];

	// Interactive Form State
	let selectedRefinementType = $state('build');
	let newRefinementText = $state('');

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

	// Refinement upvote handler
	function handleHelpful(refinementId: number) {
		const r = refinements.find((x) => x.id === refinementId);
		if (r) {
			if (r.helpfulClicked) {
				r.helpfulCount--;
				r.helpfulClicked = false;
			} else {
				r.helpfulCount++;
				r.helpfulClicked = true;
			}
		}
	}

	// Refinement post handler
	function postRefinement() {
		if (!newRefinementText.trim()) return;

		const typeObj = refinementTypes.find((t) => t.id === selectedRefinementType);
		const typeText = typeObj ? typeObj.text : '✦ Builds on idea';

		refinements.push({
			id: Date.now(),
			author: {
				name: 'Nahid Khan',
				initials: 'NK',
				role: 'Creator'
			},
			type: selectedRefinementType,
			typeText,
			content: newRefinementText,
			helpfulCount: 0,
			helpfulClicked: false,
			timeAgo: 'Just now'
		});

		idea.refinementsCount++;
		newRefinementText = '';
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

<svelte:head>
	<title>IdeaShare — {idea.title}</title>
</svelte:head>

<!-- NAVBAR -->
<Navbar hasBackButton={false} />

<!-- LAYOUT -->
<div
	class="detail-layout mx-auto grid max-w-[1000px] grid-cols-1 items-start gap-6 px-3 pt-[14px] pb-[80px] min-[761px]:grid-cols-[minmax(0,1fr)_240px] min-[761px]:px-6 min-[761px]:pt-7 min-[761px]:pb-7"
>
	<!-- MAIN -->
	<div class="flex flex-col gap-4">
		<!-- Back link -->
		<a
			href={resolve('/')}
			class="mb-1 flex w-fit items-center gap-[6px] text-[13px] text-foreground-muted no-underline transition-colors hover:text-foreground"
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
		<div class="overflow-hidden rounded-2xl border border-border bg-background">
			<div class="relative bg-accent p-[28px_28px_24px]">
				<div class="mb-[14px] flex items-center gap-2">
					<span
						class="rounded-full bg-primary px-[10px] py-[3px] text-[11px] font-semibold tracking-[0.03em] text-accent"
						>⚡
						{idea.status}</span
					>
					{#each idea.tags as tag (tag)}
						<span
							class="rounded-full bg-foreground/10 px-[10px] py-[3px] text-[11px] font-medium text-foreground"
							>#{tag}</span
						>
					{/each}
				</div>
				<h1
					class="max-w-[560px] font-display text-[24px] leading-[1.3] font-bold tracking-[-0.4px] text-foreground"
				>
					{idea.title}
				</h1>
			</div>
			<div class="p-[20px_28px]">
				<p class="mb-5 text-[14.5px] leading-[1.75] text-foreground-secondary">
					{idea.description}
				</p>

				<div class="mb-5 flex flex-col gap-3">
					<div class="rounded-md bg-background-muted p-[12px_16px]">
						<div
							class="mb-[5px] text-[11px] font-semibold tracking-[0.07em] text-foreground-muted uppercase"
						>
							Problem it solves
						</div>
						<div class="text-[13.5px] leading-[1.6] text-foreground">{idea.problem}</div>
					</div>
					<div class="rounded-md bg-background-muted p-[12px_16px]">
						<div
							class="mb-[5px] text-[11px] font-semibold tracking-[0.07em] text-foreground-muted uppercase"
						>
							Who would benefit
						</div>
						<div class="text-[13.5px] leading-[1.6] text-foreground">{idea.whoBenefits}</div>
					</div>
				</div>

				<div class="flex items-center gap-3 border-t border-border pt-4">
					<div class="flex items-center gap-2">
						<div
							class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-[12px] font-semibold text-accent"
						>
							{idea.author.initials}
						</div>
						<div>
							<div class="text-[13px] font-medium text-foreground">{idea.author.name}</div>
							<div class="text-[12px] text-foreground-muted">{idea.author.location}</div>
						</div>
					</div>
					<div class="ml-auto text-[12px] text-foreground-muted">{idea.createdAtText}</div>
				</div>
			</div>
		</div>

		<!-- Action bar -->
		<div
			class="flex flex-wrap items-center gap-[10px] rounded-2xl border border-border bg-background p-[14px_20px]"
		>
			<button
				onclick={toggleSpark}
				class="flex cursor-pointer items-center gap-2 rounded-full border-[1.5px] px-[18px] py-2 font-[inherit] text-sm font-semibold transition-colors {idea.sparked
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

			<button
				class="flex cursor-pointer items-center gap-[7px] rounded-full border border-border bg-transparent px-4 py-2 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
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
				{idea.refinementsCount} refinements
			</button>
			<button
				class="flex cursor-pointer items-center gap-[7px] rounded-full border border-border bg-transparent px-4 py-2 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
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
				class="flex cursor-pointer items-center gap-[7px] rounded-full border border-border bg-transparent px-4 py-2 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
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
			<button
				onclick={toggleJoinBuilder}
				class="ml-auto flex cursor-pointer items-center gap-[7px] rounded-full border-none px-5 py-2 font-[inherit] text-[13px] font-semibold transition-all hover:opacity-85 {joinedAsBuilder
					? 'bg-success text-white'
					: 'bg-primary text-primary-foreground'}"
			>
				<svg
					width="14"
					height="14"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"
					/>
				</svg>
				{joinedAsBuilder ? 'Joined as builder' : 'I want to build this'}
			</button>
		</div>

		<!-- Refinements heading -->
		<div>
			<div class="font-display text-base font-semibold text-foreground">Refinements</div>
			<div class="mb-[14px] text-[12px] text-foreground-muted">
				{idea.refinementsCount} people have added their thoughts — sorted by most helpful
			</div>
		</div>

		<!-- Fork card -->
		<div class="rounded-2xl border border-info-border bg-info-background p-[16px_18px]">
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
		</div>

		<!-- Refinement list loop -->
		{#each refinements as r (r.id)}
			<div
				class="rounded-2xl border border-border bg-background p-[16px_18px] transition-colors hover:border-accent"
			>
				<div class="mb-[10px] flex items-center gap-[10px]">
					<div
						class="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full text-[11px] font-semibold
						{r.author.initials === 'SM'
							? 'bg-info-background text-info-foreground'
							: r.author.initials === 'TA'
								? 'bg-success-background text-success-foreground'
								: r.author.initials === 'NI'
									? 'bg-yellow-100 text-yellow-500'
									: 'bg-accent text-accent-foreground'}"
					>
						{r.author.initials}
					</div>
					<div>
						<div class="text-[13px] font-medium text-foreground">{r.author.name}</div>
					</div>
					<span
						class="rounded-full border border-border bg-background-muted px-[7px] py-[2px] text-[11px] text-foreground-muted"
						>{r.author.role}</span
					>
					<span class="ml-auto text-[12px] text-foreground-muted">{r.timeAgo}</span>
				</div>
				<div
					class="mb-[7px] inline-flex items-center gap-[5px] rounded-full border px-2 py-[2px] text-[11px] font-semibold
					{r.type === 'obstacle'
						? 'border-warning-border bg-warning-background text-warning-foreground'
						: r.type === 'build'
							? 'border-success-border bg-success-background text-success-foreground'
							: 'border-info-border bg-info-background text-info-foreground'}"
				>
					{r.typeText}
				</div>
				<p
					class="mb-[10px] text-[13.5px] leading-[1.65] whitespace-pre-line text-foreground-secondary"
				>
					{r.content}
				</p>
				<div class="flex items-center gap-[10px]">
					<button
						onclick={() => handleHelpful(r.id)}
						class="flex cursor-pointer items-center gap-[5px] rounded-sm border-none bg-transparent px-2 py-1 font-[inherit] text-[12px] transition-all {r.helpfulClicked
							? 'bg-yellow-100 font-medium text-yellow-600'
							: 'text-foreground-muted hover:bg-yellow-100 hover:text-foreground'}"
					>
						<svg
							width="12"
							height="12"
							viewBox="0 0 24 24"
							fill={r.helpfulClicked ? 'currentColor' : 'none'}
							stroke="currentColor"
							stroke-width="2"
						>
							<path
								d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z"
							/>
						</svg>
						{r.helpfulCount} helpful
					</button>
					<button
						class="cursor-pointer rounded-sm border-none bg-transparent px-2 py-1 font-[inherit] text-[12px] text-foreground-muted transition-colors hover:text-foreground"
						>Reply</button
					>
				</div>
			</div>
		{/each}

		<!-- Add refinement -->
		<div class="rounded-2xl border border-border bg-background p-[16px_18px]">
			<div class="mb-3 font-display text-base font-semibold text-foreground">
				Add your refinement
			</div>
			<div class="mb-3 flex flex-wrap gap-[6px]">
				{#each refinementTypes as t (t.id)}
					<button
						onclick={() => (selectedRefinementType = t.id)}
						class="cursor-pointer rounded-full border px-3 py-[5px] text-[12px] font-medium transition-all {selectedRefinementType ===
						t.id
							? 'border-yellow-500 bg-accent text-foreground'
							: 'border-border bg-transparent text-foreground-secondary hover:border-foreground'}"
					>
						{t.text}
					</button>
				{/each}
			</div>
			<textarea
				bind:value={newRefinementText}
				class="mb-[10px] min-h-[80px] w-full resize-y rounded-md border border-border bg-background-muted p-[12px_14px] font-[inherit] text-[13.5px] text-foreground transition-colors outline-none placeholder:text-foreground-muted focus:border-accent focus:bg-background"
				placeholder="Share how this idea could be improved, a challenge you see, or a real-world example..."
			></textarea>
			<button
				onclick={postRefinement}
				class="cursor-pointer rounded-full border-none bg-primary px-5 py-2 font-[inherit] text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-85"
				>Post refinement</button
			>
		</div>
	</div>

	<!-- SIDEBAR -->
	<aside class="detail-sidebar hidden flex-col gap-4 min-[761px]:flex">
		<div class="rounded-2xl border border-border bg-background p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
				Idea stats
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="text-foreground-muted">Sparks</span><span class="font-semibold text-yellow-500"
					>{idea.sparks} ⚡</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="text-foreground-muted">Refinements</span><span
					class="font-semibold text-foreground">{idea.refinementsCount}</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="text-foreground-muted">Forks</span><span class="font-semibold text-foreground"
					>{idea.forksCount}</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="text-foreground-muted">Builders</span><span
					class="font-semibold text-foreground">{idea.buildersCount}</span
				>
			</div>
			<div
				class="flex items-center justify-between border-b border-border-muted py-[6px] text-[13px]"
			>
				<span class="text-foreground-muted">Views</span><span class="font-semibold text-foreground"
					>{idea.viewsCount}</span
				>
			</div>
			<div class="flex items-center justify-between py-[6px] text-[13px]">
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
				<div
					class="flex items-center gap-[10px] border-b border-border-muted py-[7px] last:border-b-0"
				>
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
							class="rounded-full border border-yellow-200 bg-yellow-100 px-[9px] py-[2px] text-[11px] font-medium whitespace-nowrap text-yellow-500"
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

		<div class="rounded-2xl bg-primary p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.07em] text-accent uppercase">
				Similar ideas
			</div>
			{#each similarIdeas as sim (sim.title)}
				<div class="group cursor-pointer border-b border-white/8 py-2 last:border-b-0">
					<div
						class="mb-1 text-[12.5px] leading-[1.4] font-medium text-primary-foreground transition-colors group-hover:text-accent"
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
