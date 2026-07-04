<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
	import { createPost } from './page.remote';
	let title = $state('');
	let description = $state('');
	let solvedProblem = $state('');
	let selectedChips = $state(['Students', 'Working adults', 'Developing countries']);
	let selectedTopics = $state(['#education', '#credentials']);
	let focusedBlock = $state('title');
	let showDupeWarning = $state(true);

	//const session = await sessionData();

	//console.log(session.userId);

	const whoChips = [
		{ name: 'Students', emoji: '🎓' },
		{ name: 'Working adults', emoji: '💼' },
		{ name: 'Employers', emoji: '🏢' },
		{ name: 'Developing countries', emoji: '🌍' },
		{ name: 'Governments', emoji: '🏛️' },
		{ name: 'Researchers', emoji: '🔬' },
		{ name: 'Developers', emoji: '👩‍💻' },
		{ name: 'Everyone', emoji: '🌱' }
	];

	const topicsList = [
		'#education',
		'#credentials',
		'#health',
		'#technology',
		'#cities',
		'#economy',
		'#environment',
		'#governance'
	];

	function toggleChip(chipName: string) {
		if (selectedChips.includes(chipName)) {
			selectedChips = selectedChips.filter((c) => c !== chipName);
		} else {
			selectedChips = [...selectedChips, chipName];
		}
	}

	function toggleTopic(topicName: string) {
		if (selectedTopics.includes(topicName)) {
			selectedTopics = selectedTopics.filter((t) => t !== topicName);
		} else if (selectedTopics.length < 2) {
			selectedTopics = [...selectedTopics, topicName];
		}
	}

	// async function createPost() {
	// 	const post = await db.insert(posts).values([
	// 		{
	// 			title: title,
	// 			description: description,
	// 			solvedProblems: solvedProblem,
	// 			isAnonymous: isAnonymous,
	// 			authorId: session.userId
	// 		}
	// 	]);
	// }
</script>

<svelte:head>
	<title>IdeaShare — Post an Idea</title>
</svelte:head>

<!-- NAVBAR -->
<Navbar hasBackButton={true} />

<!-- PAGE -->
<div
	class="post-layout mx-auto grid max-w-215 grid-cols-1 items-start gap-7 px-3 pt-3.5 pb-20 min-[601px]:px-4 min-[601px]:pt-5 min-[761px]:grid-cols-[minmax(0,1fr)_240px] min-[761px]:px-6 min-[761px]:pt-9 min-[761px]:pb-15"
>
	<!-- FORM -->
	<form {...createPost} class="flex flex-col gap-0">
		<div class="mb-7">
			<h1
				class="mb-1.5 font-display text-[26px] leading-tight font-bold tracking-[-0.4px] text-foreground"
			>
				What's the idea?
			</h1>
			<p class="text-[13.5px] leading-[1.6] text-foreground-muted">
				Write it like you'd explain it to a friend. No need to be formal — just be clear.
			</p>
		</div>

		<div class="overflow-hidden rounded-2xl border border-border bg-background">
			<!-- Title field -->
			<div
				id="block-title"
				class="field-block relative border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'title'
					? 'bg-yellow-50'
					: ''}"
			>
				<div
					class="field-accent absolute top-0 bottom-0 left-0 w-0.75 rounded-none transition-colors {focusedBlock ===
					'title'
						? 'bg-accent'
						: 'bg-transparent'}"
				></div>
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					<div class="inline-block h-1.25 w-1.25 rounded-full bg-yellow-500"></div>
					Idea title
				</div>
				<textarea
					id="title-input"
					rows="2"
					bind:value={title}
					onfocus={() => (focusedBlock = 'title')}
					{...createPost.fields.title.as('text')}
					class="w-full resize-none border-none bg-transparent font-display text-[18px] leading-[1.4] font-semibold text-foreground outline-none placeholder:font-medium placeholder:text-foreground-disabled"
					placeholder="e.g. A universal exam system where you study anywhere and just show up to get certified"
				></textarea>
				<div
					id="title-count"
					class="mt-1.25 flex justify-end text-[11px] {title.length > 100
						? 'text-yellow-500'
						: 'text-foreground-disabled'}"
				>
					{title.length} / 120
				</div>
			</div>

			<!-- Describe field -->
			<div
				id="block-desc"
				class="field-block relative border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'desc'
					? 'bg-yellow-50'
					: ''}"
			>
				<div
					class="field-accent absolute top-0 bottom-0 left-0 w-0.75 transition-colors {focusedBlock ===
					'desc'
						? 'bg-accent'
						: 'bg-transparent'}"
				></div>
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					<div class="inline-block h-1.25 w-1.25 rounded-full bg-yellow-500"></div>
					Describe the idea
				</div>
				<textarea
					id="desc-input"
					rows="4"
					bind:value={description}
					{...createPost.fields.description.as('text')}
					onfocus={() => (focusedBlock = 'desc')}
					class="w-full resize-none border-none bg-transparent font-[inherit] text-sm leading-[1.7] text-foreground outline-none placeholder:text-foreground-disabled"
					placeholder="What exactly would this look like? How would it work? Even a rough picture is great."
				></textarea>
			</div>

			<!-- Problem field -->
			<div
				id="block-problem"
				class="field-block relative border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'problem'
					? 'bg-yellow-50'
					: ''}"
			>
				<div
					class="field-accent absolute top-0 bottom-0 left-0 w-0.75 transition-colors {focusedBlock ===
					'problem'
						? 'bg-accent'
						: 'bg-transparent'}"
				></div>
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					<div class="inline-block h-1.25 w-1.25 rounded-full bg-yellow-500"></div>
					What problem does this solve?
				</div>
				<textarea
					id="problem-input"
					rows="2"
					bind:value={solvedProblem}
					{...createPost.fields.solvedProblems.as('text')}
					onfocus={() => (focusedBlock = 'problem')}
					class="w-full resize-none border-none bg-transparent font-[inherit] text-sm leading-[1.7] text-foreground outline-none placeholder:text-foreground-disabled"
					placeholder="e.g. University is too expensive and location-dependent for most people in the world."
				></textarea>
			</div>

			<!-- Who benefits -->
			<div
				id="block-who"
				role="presentation"
				onclick={() => (focusedBlock = 'who')}
				class="field-block relative border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'who'
					? 'bg-yellow-50'
					: ''}"
			>
				<div
					class="field-accent absolute top-0 bottom-0 left-0 w-0.75 transition-colors {focusedBlock ===
					'who'
						? 'bg-accent'
						: 'bg-transparent'}"
				></div>
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					<div class="inline-block h-1.25 w-1.25 rounded-full bg-yellow-500"></div>
					Who would benefit?
					<span
						class="rounded-full bg-background-muted px-1.5 py-px text-[10px] font-medium tracking-normal text-foreground-disabled normal-case"
						>Pick all that apply</span
					>
				</div>
				<div class="mb-2.5 flex flex-wrap gap-1.75">
					{#each whoChips as chip (chip)}
						{@const isSelected = selectedChips.includes(chip.name)}
						<button
							type="button"
							class="chip flex cursor-pointer items-center gap-1 rounded-full border px-2.5 py-1.5 font-[inherit] text-[12.5px] transition-colors {isSelected
								? 'border-accent bg-yellow-100 font-semibold text-foreground'
								: 'border-border bg-transparent font-medium text-foreground-secondary hover:border-yellow-500 hover:text-foreground'}"
							onclick={() => toggleChip(chip.name)}
						>
							<span>{chip.emoji}</span>
							{chip.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Topic tags -->
			<div
				id="block-topic"
				role="presentation"
				onclick={() => (focusedBlock = 'topic')}
				class="field-block relative border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'topic'
					? 'bg-yellow-50'
					: ''}"
			>
				<div
					class="field-accent absolute top-0 bottom-0 left-0 w-0.75 transition-colors {focusedBlock ===
					'topic'
						? 'bg-accent'
						: 'bg-transparent'}"
				></div>
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					Topic
					<span
						class="rounded-full bg-background-muted px-1.5 py-px text-[10px] font-medium tracking-normal text-foreground-disabled normal-case"
						>Pick up to 2</span
					>
				</div>
				<div class="flex flex-wrap gap-1.75">
					{#each topicsList as topic (topic)}
						{@const isSelected = selectedTopics.includes(topic)}
						<button
							type="button"
							class="chip cursor-pointer rounded-full border px-2.5 py-1.5 font-[inherit] text-[12.5px] font-medium transition-colors {isSelected
								? 'border-foreground bg-foreground text-foreground-inverted'
								: 'border-border bg-transparent text-foreground-secondary hover:border-foreground hover:text-foreground'}"
							onclick={() => toggleTopic(topic)}
						>
							{topic}
						</button>
					{/each}
				</div>
			</div>

			<!-- Anonymous toggle -->
			<div class="relative p-[20px_24px]">
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					Post anonymously
					<span
						class="px-[ 6px] rounded-full bg-background-muted py-px text-[10px] font-medium tracking-normal text-foreground-disabled normal-case"
						>optional</span
					>
				</div>
				<div class="flex items-center gap-3">
					<label class="relative h-5.5 w-10 shrink-0 cursor-pointer">
						<input
							id="anon-toggle"
							class="peer absolute h-0 w-0 opacity-0"
							{...createPost.fields.isAnonymous.as('checkbox')}
						/>
						<div
							class="absolute inset-0 rounded-full bg-border-strong transition-colors peer-checked:bg-accent"
						></div>
						<div
							class="absolute top-0.75 left-0.75 h-4 w-4 rounded-full bg-white shadow-sm transition-all peer-checked:left-5.25"
						></div>
					</label>
					<div>
						<div class="text-[13.5px] font-medium text-foreground">Hide my name on this idea</div>
						<div class="mt-0.5 text-[12px] text-foreground-muted">
							Your contribution is still recorded — you'll get credit if it gets built.
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Dupe warning -->
		{#if showDupeWarning}
			<div
				id="dupe-warning"
				class="mt-3.5 flex items-start gap-3 rounded-md border border-yellow-200 bg-yellow-100 p-[12px_16px]"
			>
				<div
					class="mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[12px]"
				>
					💡
				</div>
				<div class="text-[13px] leading-[1.55] text-foreground">
					<strong>3 similar ideas already exist.</strong> Want to refine one instead of posting a
					new one?
					<br /><span class="cursor-pointer font-semibold underline">View similar ideas →</span>
				</div>
				<button
					onclick={() => (showDupeWarning = false)}
					class="ml-auto shrink-0 cursor-pointer border-none bg-transparent px-1 py-0.5 font-[inherit] text-[12px] text-foreground-muted"
					>✕</button
				>
			</div>
		{/if}

		<!-- Submit bar -->
		<div class="mt-5 flex flex-wrap items-center gap-2.5">
			<button
				class="flex cursor-pointer items-center gap-2 rounded-full border-none bg-primary px-7 py-2.75 font-[inherit] text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85"
				type="submit"
				name="intent"
				value="publish"
			>
				Publish idea
			</button>
			<button
				class="cursor-pointer rounded-full border border-border bg-transparent px-5 py-2.75 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground"
				type="submit"
				name="intent"
				value="draft">Save as draft</button
			>
			<span class="text-[12px] text-foreground-muted">Your idea will be visible to everyone</span>
		</div>
	</form>

	<!-- RIGHT COLUMN -->
	<div class="preview-col hidden flex-col gap-3.5 min-[761px]:flex">
		<div class="text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase">
			Live preview
		</div>

		<div
			class="overflow-hidden rounded-2xl border border-border bg-background-card shadow-[0_4px_20px_rgba(0,0,0,0.06)]"
		>
			<div class="bg-accent p-4">
				<div
					id="preview-title"
					class="font-display text-[13.5px] leading-[1.4] font-bold text-foreground"
				>
					{title || 'Your idea title will appear here...'}
				</div>
			</div>
			<div class="p-3 px-4">
				<div
					id="preview-desc"
					class="mb-[10px] text-[12px] leading-[1.6] text-foreground-secondary"
				>
					{description
						? description.substring(0, 120) + (description.length > 120 ? '...' : '')
						: 'Your description will appear here...'}
				</div>
				<div class="flex flex-wrap items-center gap-1.5">
					{#each selectedTopics as topic (topic)}
						<span
							class="rounded-full border border-border bg-background-muted px-2 py-[2px] text-[11px] text-foreground-secondary"
							>{topic}</span
						>
					{/each}
					<span
						class="rounded-full border border-warning-border bg-warning-background px-2 py-[2px] text-[11px] font-semibold text-warning-foreground"
						>Raw idea</span
					>
					<span class="ml-auto text-[12px] font-semibold text-foreground-muted">⚡ 0</span>
				</div>
			</div>
		</div>

		<div class="rounded-2xl bg-primary p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-accent uppercase">
				Tips for a great idea
			</div>
			<div class="mb-[10px] flex items-start gap-[10px]">
				<div
					class="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-foreground"
				>
					1
				</div>
				<div class="text-[12px] leading-[1.55] text-foreground-disabled">
					<strong class="text-white">Lead with the problem,</strong> not the solution. "Millions can't
					afford university" is more compelling than "free exams".
				</div>
			</div>
			<div class="mb-[10px] flex items-start gap-[10px]">
				<div
					class="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-foreground"
				>
					2
				</div>
				<div class="text-[12px] leading-[1.55] text-foreground-disabled">
					<strong class="text-white">Be specific</strong> about who benefits. "Students in rural areas"
					gets more traction than "everyone".
				</div>
			</div>
			<div class="flex items-start gap-[10px]">
				<div
					class="mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-foreground"
				>
					3
				</div>
				<div class="text-[12px] leading-[1.55] text-foreground-disabled">
					<strong class="text-white">Raw ideas are welcome.</strong> You don't need to have it all figured
					out — the community will help refine it.
				</div>
			</div>
		</div>

		<div class="rounded-2xl border border-border bg-background p-[14px]">
			<div
				class="mb-[10px] text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
			>
				Similar ideas already posted
			</div>
			<div class="cursor-pointer border-b border-border-muted py-[7px]">
				<div
					class="mb-[3px] text-[12.5px] leading-[1.4] font-medium text-foreground hover:text-yellow-500"
				>
					Build your own university major from multiple institutions
				</div>
				<div class="text-[11px] text-foreground-muted">
					<span class="font-medium text-yellow-500">389 ⚡</span> · 2 builds
				</div>
			</div>
			<div class="cursor-pointer border-b border-border-muted py-[7px]">
				<div
					class="mb-[3px] text-[12.5px] leading-[1.4] font-medium text-foreground hover:text-yellow-500"
				>
					Employer-run certification to replace degrees
				</div>
				<div class="text-[11px] text-foreground-muted">
					<span class="font-medium text-yellow-500">198 ⚡</span> · 1 build
				</div>
			</div>
			<div class="mt-[10px] text-center text-[12px] text-foreground-muted">
				Want to <a href={resolve('/')} class="cursor-pointer font-medium text-foreground"
					>build on one of these</a
				> instead?
			</div>
		</div>
	</div>
</div>
