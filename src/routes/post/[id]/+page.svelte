<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';

	// Reactive state for the idea details
	let idea = $state({
		title: "A universal exam system independent of any university — certify your skills, study anywhere",
		description: "What if you could study from YouTube, books, MOOCs, or anywhere you want — and just show up to a standardised exam to get certified? No enrollment, no tuition fees, no geographic restriction. Your knowledge is what gets tested, not where you sat in a classroom.",
		problem: "University degrees are expensive and location-dependent, but skills are what actually matter to employers. Millions of people in developing countries have the ability but not the access.",
		whoBenefits: "Students in developing countries, working adults who want to upskill, people who learn better independently, and employers who want to hire based on demonstrated ability.",
		status: "Being refined",
		tags: ["education", "credentials"],
		author: {
			name: "Nahid Khan",
			location: "Dhaka, Bangladesh",
			initials: "NK"
		},
		createdAtText: "Posted 3 days ago",
		sparks: 847,
		sparked: false,
		refinementsCount: 24,
		forksCount: 6,
		buildersCount: 12,
		viewsCount: "4.2k"
	});

	// Refinements list
	let refinements = $state([
		{
			id: 1,
			author: {
				name: "Sara Müller",
				initials: "SM",
				role: "Works in education"
			},
			type: "obstacle",
			typeText: "⚠ Potential obstacle",
			content: "The biggest challenge is exam integrity — how do you prevent cheating when anyone can take it anywhere? The existing standardised tests like IELTS solve this with proctored centres. You'd need a global network of trusted testing locations, which is expensive to build.",
			helpfulCount: 38,
			helpfulClicked: false,
			timeAgo: "2 days ago"
		},
		{
			id: 2,
			author: {
				name: "Tolu Adeyemi",
				initials: "TA",
				role: "Software developer"
			},
			type: "build",
			typeText: "✦ Builds on idea",
			content: "This already partially exists — CompTIA, AWS certifications, and CFA all work this way. The gap is that they're industry-specific and not unified. What if there was a single credentialing body that issued a \"passport\" combining multiple such certifications into one verified profile?",
			helpfulCount: 61,
			helpfulClicked: false,
			timeAgo: "2 days ago"
		},
		{
			id: 3,
			author: {
				name: "Nadia Islam",
				initials: "NI",
				role: "Student"
			},
			type: "build",
			typeText: "✦ Builds on idea",
			content: "In Bangladesh this would be transformational. Internet access is widespread but quality universities are only in Dhaka. If a student in Sylhet could study online and sit an exam locally to get a credential recognised by employers, it would change everything for rural students.",
			helpfulCount: 44,
			helpfulClicked: false,
			timeAgo: "1 day ago"
		}
	]);

	// Builders list
	let builders = $state([
		{ name: "Tariq Khan", role: "Full-stack dev", initials: "TK", lead: true, bgClass: "bg-success-background text-success-foreground" },
		{ name: "Lena Moser", role: "EdTech designer", initials: "LM", lead: false, bgClass: "bg-info-background text-info-foreground" },
		{ name: "Paulo Oliveira", role: "Policy researcher", initials: "PO", lead: false, bgClass: "bg-warning-background text-warning-foreground" },
		{ name: "Aisha Jallow", role: "Backend dev", initials: "AJ", lead: false, bgClass: "bg-destructive-background text-destructive-foreground" }
	]);

	// Similar ideas list
	const similarIdeas = [
		{
			title: "Build your own university major from courses at different institutions",
			sparks: 389,
			builds: 2
		},
		{
			title: "A global skills passport replacing traditional CVs",
			sparks: 271,
			builds: 4
		},
		{
			title: "Employer-run certification replacing university degrees",
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
		const r = refinements.find(x => x.id === refinementId);
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

		const typeObj = refinementTypes.find(t => t.id === selectedRefinementType);
		const typeText = typeObj ? typeObj.text : '✦ Builds on idea';

		refinements.push({
			id: Date.now(),
			author: {
				name: "Nahid Khan",
				initials: "NK",
				role: "Creator"
			},
			type: selectedRefinementType,
			typeText,
			content: newRefinementText,
			helpfulCount: 0,
			helpfulClicked: false,
			timeAgo: "Just now"
		});

		idea.refinementsCount++;
		newRefinementText = '';
	}

	// Join builder state and handler
	let joinedAsBuilder = $state(false);

	function toggleJoinBuilder() {
		if (joinedAsBuilder) {
			// Remove the user from builders
			builders = builders.filter(b => b.name !== "Nahid Khan" || b.role !== "You");
			idea.buildersCount--;
			joinedAsBuilder = false;
		} else {
			// Add the user to builders
			builders.push({
				name: "Nahid Khan",
				role: "You",
				initials: "NK",
				lead: false,
				bgClass: "bg-accent text-accent-foreground"
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
<div class="detail-layout max-w-[1000px] mx-auto grid gap-6 items-start grid-cols-1 min-[761px]:grid-cols-[minmax(0,1fr)_240px] pt-[14px] px-3 pb-[80px] min-[761px]:pt-7 min-[761px]:px-6 min-[761px]:pb-7">

	<!-- MAIN -->
	<div class="flex flex-col gap-4">

		<!-- Back link -->
		<a
			href={resolve('/')}
			class="flex items-center gap-[6px] text-[13px] text-foreground-muted hover:text-foreground no-underline transition-colors w-fit mb-1"
		>
			<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
				<polyline points="15 18 9 12 15 6" />
			</svg>
			Back to feed
		</a>

		<!-- Idea header -->
		<div class="bg-background border border-border rounded-2xl overflow-hidden">
			<div class="bg-accent p-[28px_28px_24px] relative">
				<div class="flex items-center gap-2 mb-[14px]">
					<span
						class="py-[3px] px-[10px] rounded-full text-[11px] font-semibold bg-primary text-accent tracking-[0.03em]">⚡
						{idea.status}</span>
					{#each idea.tags as tag (tag)}
						<span
							class="py-[3px] px-[10px] rounded-full text-[11px] font-medium bg-foreground/10 text-foreground">#{tag}</span>
					{/each}
				</div>
				<h1 class="font-display text-[24px] font-bold text-foreground leading-[1.3] tracking-[-0.4px] max-w-[560px]">{idea.title}</h1>
			</div>
			<div class="p-[20px_28px]">
				<p class="text-[14.5px] text-foreground-secondary leading-[1.75] mb-5">{idea.description}</p>

				<div class="flex flex-col gap-3 mb-5">
					<div class="bg-background-muted rounded-md p-[12px_16px]">
						<div class="text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground-muted mb-[5px]">Problem it solves
						</div>
						<div class="text-[13.5px] text-foreground leading-[1.6]">{idea.problem}</div>
					</div>
					<div class="bg-background-muted rounded-md p-[12px_16px]">
						<div class="text-[11px] font-semibold uppercase tracking-[0.07em] text-foreground-muted mb-[5px]">Who would benefit
						</div>
						<div class="text-[13.5px] text-foreground leading-[1.6]">{idea.whoBenefits}</div>
					</div>
				</div>

				<div class="flex items-center gap-3 pt-4 border-t border-border">
					<div class="flex items-center gap-2">
						<div
							class="w-8 h-8 rounded-full bg-primary text-accent flex items-center justify-center text-[12px] font-semibold">
							{idea.author.initials}</div>
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
		<div class="bg-background border border-border rounded-2xl p-[14px_20px] flex items-center gap-[10px] flex-wrap">
			<button
				onclick={toggleSpark}
				class="flex items-center gap-2 py-2 px-[18px] border-[1.5px] rounded-full cursor-pointer font-[inherit] font-semibold text-sm transition-colors {idea.sparked ? 'border-accent bg-accent text-foreground' : 'border-border bg-transparent text-foreground-secondary hover:border-foreground hover:text-foreground'}">
				<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
					<path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
				</svg>
				Sparked
			</button>
			<div class="text-[15px] font-bold text-foreground px-1">{idea.sparks}</div>

			<div class="w-px h-7 bg-border mx-1"></div>

			<button
				class="flex items-center gap-[7px] py-2 px-4 border border-border rounded-full bg-transparent cursor-pointer font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
				</svg>
				{idea.refinementsCount} refinements
			</button>
			<button
				class="flex items-center gap-[7px] py-2 px-4 border border-border rounded-full bg-transparent cursor-pointer font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<circle cx="18" cy="5" r="3" />
					<circle cx="6" cy="12" r="3" />
					<circle cx="18" cy="19" r="3" />
					<line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
					<line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
				</svg>
				Share
			</button>
			<button
				class="flex items-center gap-[7px] py-2 px-4 border border-border rounded-full bg-transparent cursor-pointer font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
				Fork idea
			</button>
			<button
				onclick={toggleJoinBuilder}
				class="ml-auto flex items-center gap-[7px] py-2 px-5 border-none rounded-full cursor-pointer font-[inherit] text-[13px] font-semibold transition-all hover:opacity-85 {joinedAsBuilder ? 'bg-success text-white' : 'bg-primary text-primary-foreground'}">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
					<path
						d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
				</svg>
				{joinedAsBuilder ? 'Joined as builder' : 'I want to build this'}
			</button>
		</div>

		<!-- Refinements heading -->
		<div>
			<div class="font-display text-base font-semibold text-foreground">
				Refinements</div>
			<div class="text-[12px] text-foreground-muted mb-[14px]">{idea.refinementsCount} people have added their thoughts — sorted by most helpful
			</div>
		</div>

		<!-- Fork card -->
		<div class="bg-info-background border border-info-border rounded-2xl p-[16px_18px]">
			<div
				class="text-[11px] font-semibold text-info-foreground tracking-wider uppercase mb-2 flex items-center gap-[6px]">
				<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
					<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
					<polyline points="15 3 21 3 21 9" />
					<line x1="10" y1="14" x2="21" y2="3" />
				</svg>
				Forked idea
			</div>
			<div class="font-display text-sm font-semibold text-foreground leading-[1.4] mb-[6px]">What if it was employer-run instead of
				government-run? Companies set the exam standards for their own industries.</div>
			<div class="text-[13px] text-foreground-secondary leading-[1.6]">Removes the political barrier of getting governments to
				agree. Companies like Google or Siemens could certify skills directly — more trusted by hiring managers
				anyway.</div>
		</div>

		<!-- Refinement list loop -->
		{#each refinements as r (r.id)}
			<div class="bg-background border border-border rounded-2xl p-[16px_18px] transition-colors hover:border-accent">
				<div class="flex items-center gap-[10px] mb-[10px]">
					<div
						class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0
						{r.author.initials === 'SM' ? 'bg-info-background text-info-foreground' : 
						r.author.initials === 'TA' ? 'bg-success-background text-success-foreground' : 
						r.author.initials === 'NI' ? 'bg-yellow-100 text-yellow-500' : 
						'bg-accent text-accent-foreground'}">
						{r.author.initials}</div>
					<div>
						<div class="text-[13px] font-medium text-foreground">{r.author.name}</div>
					</div>
					<span class="text-[11px] text-foreground-muted bg-background-muted border border-border py-[2px] px-[7px] rounded-full">{r.author.role}</span>
					<span class="ml-auto text-[12px] text-foreground-muted">{r.timeAgo}</span>
				</div>
				<div
					class="inline-flex items-center gap-[5px] text-[11px] font-semibold py-[2px] px-2 rounded-full mb-[7px] border
					{r.type === 'obstacle' ? 'bg-warning-background text-warning-foreground border-warning-border' : 
					r.type === 'build' ? 'bg-success-background text-success-foreground border-success-border' : 
					'bg-info-background text-info-foreground border-info-border'}">
					{r.typeText}</div>
				<p class="text-[13.5px] text-foreground-secondary leading-[1.65] mb-[10px] whitespace-pre-line">{r.content}</p>
				<div class="flex items-center gap-[10px]">
					<button
						onclick={() => handleHelpful(r.id)}
						class="flex items-center gap-[5px] text-[12px] cursor-pointer border-none bg-transparent font-[inherit] py-1 px-2 rounded-sm transition-all {r.helpfulClicked ? 'bg-yellow-100 text-yellow-600 font-medium' : 'text-foreground-muted hover:bg-yellow-100 hover:text-foreground'}">
						<svg width="12" height="12" viewBox="0 0 24 24" fill={r.helpfulClicked ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2">
							<path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
						</svg>
						{r.helpfulCount} helpful
					</button>
					<button
						class="text-[12px] text-foreground-muted cursor-pointer border-none bg-transparent font-[inherit] py-1 px-2 rounded-sm transition-colors hover:text-foreground">Reply</button>
				</div>
			</div>
		{/each}

		<!-- Add refinement -->
		<div class="bg-background border border-border rounded-2xl p-[16px_18px]">
			<div class="font-display text-base font-semibold text-foreground mb-3">Add
				your refinement</div>
			<div class="flex gap-[6px] mb-3 flex-wrap">
				{#each refinementTypes as t (t.id)}
					<button
						onclick={() => selectedRefinementType = t.id}
						class="py-[5px] px-3 rounded-full border text-[12px] font-medium cursor-pointer transition-all {selectedRefinementType === t.id ? 'border-yellow-500 bg-accent text-foreground' : 'border-border bg-transparent text-foreground-secondary hover:border-foreground'}">
						{t.text}
					</button>
				{/each}
			</div>
			<textarea
				bind:value={newRefinementText}
				class="w-full min-h-[80px] border border-border rounded-md p-[12px_14px] font-[inherit] text-[13.5px] text-foreground bg-background-muted resize-y outline-none transition-colors focus:border-accent focus:bg-background placeholder:text-foreground-muted mb-[10px]"
				placeholder="Share how this idea could be improved, a challenge you see, or a real-world example..."></textarea>
			<button
				onclick={postRefinement}
				class="py-2 px-5 border-none rounded-full bg-primary font-[inherit] text-[13px] font-medium text-primary-foreground cursor-pointer transition-opacity hover:opacity-85">Post
				refinement</button>
		</div>

	</div>

	<!-- SIDEBAR -->
	<aside class="detail-sidebar flex-col gap-4 hidden min-[761px]:flex">

		<div class="bg-background border border-border rounded-2xl p-4">
			<div class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-3">Idea stats</div>
			<div class="flex items-center justify-between py-[6px] border-b border-border-muted text-[13px]"><span
					class="text-foreground-muted">Sparks</span><span class="font-semibold text-yellow-500">{idea.sparks} ⚡</span></div>
			<div class="flex items-center justify-between py-[6px] border-b border-border-muted text-[13px]"><span
					class="text-foreground-muted">Refinements</span><span class="font-semibold text-foreground">{idea.refinementsCount}</span></div>
			<div class="flex items-center justify-between py-[6px] border-b border-border-muted text-[13px]"><span
					class="text-foreground-muted">Forks</span><span class="font-semibold text-foreground">{idea.forksCount}</span></div>
			<div class="flex items-center justify-between py-[6px] border-b border-border-muted text-[13px]"><span
					class="text-foreground-muted">Builders</span><span class="font-semibold text-foreground">{idea.buildersCount}</span></div>
			<div class="flex items-center justify-between py-[6px] border-b border-border-muted text-[13px]"><span
					class="text-foreground-muted">Views</span><span class="font-semibold text-foreground">{idea.viewsCount}</span></div>
			<div class="flex items-center justify-between py-[6px] text-[13px]"><span class="text-foreground-muted">Status</span><span
					class="font-semibold text-foreground">{idea.status}</span></div>
		</div>

		<div class="bg-background border border-border rounded-2xl p-4">
			<div class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-3">Want to build this</div>
			{#each builders as b (b.name)}
				<div class="flex items-center gap-[10px] py-[7px] border-b border-border-muted last:border-b-0">
					<div
						class="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold shrink-0 {b.bgClass}">
						{b.initials}
					</div>
					<div class="flex-1 min-w-0">
						<div class="text-[13px] font-medium text-foreground">{b.name}</div>
						<div class="text-[11px] text-foreground-muted">{b.role}</div>
					</div>
					{#if b.lead}
						<span
							class="text-[11px] py-[2px] px-[9px] rounded-full bg-yellow-100 text-yellow-500 border border-yellow-200 font-medium whitespace-nowrap"
						>
							Lead
						</span>
					{/if}
				</div>
			{/each}
			<div class="mt-3">
				<button
					onclick={toggleJoinBuilder}
					class="w-full py-2 border-[1.5px] border-dashed border-border rounded-md bg-transparent font-[inherit] text-[13px] text-foreground-muted hover:text-foreground hover:border-foreground-muted transition-colors cursor-pointer"
				>
					{joinedAsBuilder ? '✓ Joined as builder' : '+ Join as builder'}
				</button>
			</div>
		</div>

		<div class="bg-primary rounded-2xl p-4">
			<div class="text-[11px] font-semibold uppercase tracking-[0.07em] text-accent mb-3">Similar ideas</div>
			{#each similarIdeas as sim (sim.title)}
				<div class="py-2 border-b border-white/8 last:border-b-0 cursor-pointer group">
					<div class="text-[12.5px] text-primary-foreground leading-[1.4] mb-1 font-medium group-hover:text-accent transition-colors">
						{sim.title}
					</div>
					<div class="text-[11px] text-foreground-muted">
						<span class="text-accent font-medium">{sim.sparks} ⚡</span> · {sim.builds} {sim.builds === 1 ? 'build' : 'builds'}
					</div>
				</div>
			{/each}
		</div>

	</aside>
</div>