<script lang="ts">
    import {resolve} from '$app/paths'
	import Navbar from '$lib/components/Navbar.svelte';

	let title = $state('A universal exam system independent of any university — certify your skills, study anywhere');
	let desc = $state('What if you could study from YouTube, books, or anywhere you want — and just show up to a standardised exam to get certified? No enrollment, no tuition fees, no geographic restriction. Your knowledge is what gets tested, not where you sat.');
	let problem = $state('University degrees are expensive and location-dependent, but skills are what actually matter. Millions of people have the ability but not the access.');
	let selectedChips = $state(['Students', 'Working adults', 'Developing countries']);
	let selectedTopics = $state(['#education', '#credentials']);
	let anonymous = $state(false);

	let focusedBlock = $state('title');
	let showDupeWarning = $state(true);

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
</script>

<svelte:head>
	<title>IdeaShare — Post an Idea</title>
</svelte:head>

<!-- NAVBAR -->
<Navbar hasBackButton={true} />

<!-- PAGE -->
<div class="post-layout max-w-[860px] mx-auto grid gap-7 items-start grid-cols-1 min-[761px]:grid-cols-[minmax(0,1fr)_240px] pt-[14px] px-3 pb-[80px] min-[601px]:pt-[20px] min-[601px]:px-4 min-[761px]:pt-9 min-[761px]:px-6 min-[761px]:pb-[60px]">

	<!-- FORM -->
	<div class="flex flex-col gap-0">

		<div class="mb-7">
			<div
				class="inline-flex items-center gap-[6px] text-[11px] font-semibold uppercase tracking-[0.08em] text-yellow-500 bg-yellow-100 border border-yellow-200 py-[3px] px-[10px] rounded-full mb-[10px]">
				💡 Step 2 of 3 — The idea</div>
			<h1 class="font-display text-[26px] font-bold text-foreground tracking-[-0.4px] leading-tight mb-[6px]">What's the idea?</h1>
			<p class="text-[13.5px] text-foreground-muted leading-[1.6]">Write it like you'd explain it to a friend. No need to be
				formal — just be clear.</p>
		</div>

		<div class="bg-background border border-border rounded-2xl overflow-hidden">

			<!-- Title field -->
			<div id="block-title"
				class="field-block p-[20px_24px] border-b border-border-muted relative transition-colors {focusedBlock === 'title' ? 'bg-yellow-50' : ''}">
				<div class="field-accent absolute left-0 top-0 bottom-0 w-[3px] rounded-none transition-colors {focusedBlock === 'title' ? 'bg-accent' : 'bg-transparent'}">
				</div>
				<div
					class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-2 flex items-center gap-[6px]">
					<div class="w-[5px] h-[5px] rounded-full bg-yellow-500 inline-block"></div>
					Idea title
				</div>
				<textarea id="title-input" rows="2" bind:value={title} onfocus={() => focusedBlock = 'title'}
					class="font-display w-full border-none outline-none bg-transparent resize-none leading-[1.4] placeholder:text-foreground-disabled placeholder:font-medium text-foreground text-[18px] font-semibold"
					placeholder="e.g. A universal exam system where you study anywhere and just show up to get certified"></textarea>
				<div id="title-count" class="flex justify-end text-[11px] mt-[6px] {title.length > 100 ? 'text-yellow-500' : 'text-foreground-disabled'}">{title.length} / 120</div>
			</div>

			<!-- Describe field -->
			<div id="block-desc" class="field-block p-[20px_24px] border-b border-border-muted relative transition-colors {focusedBlock === 'desc' ? 'bg-yellow-50' : ''}">
				<div class="field-accent absolute left-0 top-0 bottom-0 w-[3px] transition-colors {focusedBlock === 'desc' ? 'bg-accent' : 'bg-transparent'}"></div>
				<div
					class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-2 flex items-center gap-[6px]">
					<div class="w-[5px] h-[5px] rounded-full bg-yellow-500 inline-block"></div>
					Describe the idea
				</div>
				<textarea id="desc-input" rows="4" bind:value={desc} onfocus={() => focusedBlock = 'desc'}
					class="w-full border-none outline-none bg-transparent resize-none text-sm leading-[1.7] text-foreground placeholder:text-foreground-disabled font-[inherit]"
					placeholder="What exactly would this look like? How would it work? Even a rough picture is great."></textarea>
			</div>

			<!-- Problem field -->
			<div id="block-problem" class="field-block p-[20px_24px] border-b border-border-muted relative transition-colors {focusedBlock === 'problem' ? 'bg-yellow-50' : ''}">
				<div class="field-accent absolute left-0 top-0 bottom-0 w-[3px] transition-colors {focusedBlock === 'problem' ? 'bg-accent' : 'bg-transparent'}"></div>
				<div
					class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-2 flex items-center gap-[6px]">
					<div class="w-[5px] h-[5px] rounded-full bg-yellow-500 inline-block"></div>
					What problem does this solve?
				</div>
				<textarea id="problem-input" rows="2" bind:value={problem} onfocus={() => focusedBlock = 'problem'}
					class="w-full border-none outline-none bg-transparent resize-none text-sm leading-[1.7] text-foreground placeholder:text-foreground-disabled font-[inherit]"
					placeholder="e.g. University is too expensive and location-dependent for most people in the world."></textarea>
			</div>

			<!-- Who benefits -->
			<div id="block-who" role="presentation" onclick={() => focusedBlock = 'who'} class="field-block p-[20px_24px] border-b border-border-muted relative transition-colors {focusedBlock === 'who' ? 'bg-yellow-50' : ''}">
				<div class="field-accent absolute left-0 top-0 bottom-0 w-[3px] transition-colors {focusedBlock === 'who' ? 'bg-accent' : 'bg-transparent'}"></div>
				<div
					class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-2 flex items-center gap-[6px]">
					<div class="w-[5px] h-[5px] rounded-full bg-yellow-500 inline-block"></div>
					Who would benefit?
					<span
						class="text-[10px] font-medium text-foreground-disabled normal-case tracking-normal bg-background-muted py-px px-[6px] rounded-full">Pick
						all that apply</span>
				</div>
				<div class="flex flex-wrap gap-[7px] mb-[10px]">
					{#each whoChips as chip (chip)}
						{@const isSelected = selectedChips.includes(chip.name)}
						<button
							type="button"
							class="bchip flex items-center gap-[5px] py-[6px] px-3 rounded-full border font-[inherit] text-[12.5px] cursor-pointer transition-colors {isSelected ? 'border-accent bg-yellow-100 font-semibold text-foreground' : 'border-border bg-transparent font-medium text-foreground-secondary hover:border-yellow-500 hover:text-foreground'}"
							onclick={() => toggleChip(chip.name)}
						>
							<span>{chip.emoji}</span> {chip.name}
						</button>
					{/each}
				</div>
			</div>

			<!-- Topic tags -->
			<div id="block-topic" role="presentation" onclick={() => focusedBlock = 'topic'} class="field-block p-[20px_24px] border-b border-border-muted relative transition-colors {focusedBlock === 'topic' ? 'bg-yellow-50' : ''}">
				<div class="field-accent absolute left-0 top-0 bottom-0 w-[3px] transition-colors {focusedBlock === 'topic' ? 'bg-accent' : 'bg-transparent'}"></div>
				<div
					class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-2 flex items-center gap-[6px]">
					Topic
					<span
						class="text-[10px] font-medium text-foreground-disabled normal-case tracking-normal bg-background-muted py-px px-[6px] rounded-full">Pick
						up to 2</span>
				</div>
				<div class="flex flex-wrap gap-[7px]">
					{#each topicsList as topic (topic)}
						{@const isSelected = selectedTopics.includes(topic)}
						<button
							type="button"
							class="tchip py-[5px] px-3 rounded-full border font-[inherit] text-[12.5px] font-medium cursor-pointer transition-colors {isSelected ? 'bg-foreground border-foreground text-foreground-inverted' : 'bg-transparent border-border text-foreground-secondary hover:border-foreground hover:text-foreground'}"
							onclick={() => toggleTopic(topic)}
						>
							{topic}
						</button>
					{/each}
				</div>
			</div>

			<!-- Anonymous toggle -->
			<div class="p-[20px_24px] relative">
				<div
					class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-2 flex items-center gap-[6px]">
					Post anonymously
					<span
						class="text-[10px] font-medium text-foreground-disabled normal-case tracking-normal bg-background-muted py-px px-[6px] rounded-full">optional</span>
				</div>
				<div class="flex items-center gap-3">
					<label class="relative w-10 h-[22px] cursor-pointer shrink-0">
						<input type="checkbox" id="anon-toggle" class="peer opacity-0 absolute w-0 h-0" bind:checked={anonymous}>
						<div class="absolute inset-0 bg-border-strong rounded-full transition-colors peer-checked:bg-accent"></div>
						<div
							class="absolute top-[3px] left-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-all peer-checked:left-[21px]">
						</div>
					</label>
					<div>
						<div class="text-[13.5px] text-foreground font-medium">Hide my name on this idea</div>
						<div class="text-[12px] text-foreground-muted mt-[2px]">Your contribution is still recorded — you'll get credit if
							it gets built.</div>
					</div>
				</div>
			</div>

		</div>

		<!-- Dupe warning -->
		{#if showDupeWarning}
		<div id="dupe-warning"
			class="bg-yellow-100 border border-yellow-200 rounded-md p-[12px_16px] flex gap-3 items-start mt-[14px]">
			<div
				class="w-6 h-6 rounded-full bg-accent flex items-center justify-center shrink-0 mt-px text-[12px]">
				💡</div>
			<div class="text-[13px] text-foreground leading-[1.55]">
				<strong>3 similar ideas already exist.</strong> Want to refine one instead of posting a new one?
				<br><span class="font-semibold cursor-pointer underline">View similar ideas →</span>
			</div>
			<button onclick={() => showDupeWarning = false}
				class="ml-auto text-[12px] text-foreground-muted cursor-pointer border-none bg-transparent font-[inherit] shrink-0 py-[2px] px-1">✕</button>
		</div>
		{/if}

		<!-- Submit bar -->
		<div class="flex items-center gap-[10px] mt-5 flex-wrap">
			<button
				class="flex items-center gap-2 py-[11px] px-7 border-none rounded-full bg-primary font-[inherit] text-sm font-semibold text-primary-foreground cursor-pointer transition-opacity hover:opacity-85">
				<div class="w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[12px] text-foreground">⚡</div>
				Publish idea
			</button>
			<button
				class="py-[11px] px-5 border border-border rounded-full bg-transparent font-[inherit] text-[13px] font-medium text-foreground-secondary cursor-pointer transition-all hover:border-foreground hover:text-foreground">Save
				as draft</button>
			<span class="text-[12px] text-foreground-muted">Your idea will be visible to everyone</span>
		</div>

	</div>

	<!-- RIGHT COLUMN -->
	<div class="preview-col flex-col gap-[14px] hidden min-[761px]:flex">

		<div class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted">Live preview</div>

		<div class="bg-background-card border border-border rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
			<div class="bg-accent p-4">
				<div id="preview-title"
					class="font-display text-[13.5px] font-bold text-foreground leading-[1.4]">
					{title || 'Your idea title will appear here...'}
				</div>
			</div>
			<div class="p-3 px-4">
				<div id="preview-desc" class="text-[12px] text-foreground-secondary leading-[1.6] mb-[10px]">
					{desc ? (desc.substring(0, 120) + (desc.length > 120 ? '...' : '')) : 'Your description will appear here...'}
				</div>
				<div class="flex items-center gap-[6px] flex-wrap">
					{#each selectedTopics as topic (topic)}
						<span
							class="py-[2px] px-2 rounded-full bg-background-muted border border-border text-[11px] text-foreground-secondary">{topic}</span>
					{/each}
					<span
						class="py-[2px] px-2 rounded-full text-[11px] font-semibold bg-warning-background text-warning-foreground border border-warning-border">Raw
						idea</span>
					<span class="ml-auto text-[12px] font-semibold text-foreground-muted">⚡ 0</span>
				</div>
			</div>
		</div>

		<div class="bg-primary rounded-2xl p-4">
			<div class="text-[11px] font-semibold uppercase tracking-[0.08em] text-accent mb-3">Tips for a great idea
			</div>
			<div class="flex gap-[10px] mb-[10px] items-start">
				<div
					class="w-[18px] h-[18px] rounded-full bg-accent text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-px">
					1</div>
				<div class="text-[12px] text-foreground-disabled leading-[1.55]"><strong class="text-white">Lead with the
						problem,</strong> not the solution. "Millions can't afford university" is more compelling than "free
					exams".</div>
			</div>
			<div class="flex gap-[10px] mb-[10px] items-start">
				<div
					class="w-[18px] h-[18px] rounded-full bg-accent text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-px">
					2</div>
				<div class="text-[12px] text-foreground-disabled leading-[1.55]"><strong class="text-white">Be specific</strong> about
					who benefits. "Students in rural areas" gets more traction than "everyone".</div>
			</div>
			<div class="flex gap-[10px] items-start">
				<div
					class="w-[18px] h-[18px] rounded-full bg-accent text-foreground text-[10px] font-bold flex items-center justify-center shrink-0 mt-px">
					3</div>
				<div class="text-[12px] text-foreground-disabled leading-[1.55]"><strong class="text-white">Raw ideas are
						welcome.</strong> You don't need to have it all figured out — the community will help refine it.</div>
			</div>
		</div>

		<div class="bg-background border border-border rounded-2xl p-[14px]">
			<div class="text-[11px] font-semibold uppercase tracking-[0.08em] text-foreground-muted mb-[10px]">Similar ideas already
				posted</div>
			<div class="py-[7px] border-b border-border-muted cursor-pointer">
				<div class="text-[12.5px] text-foreground leading-[1.4] font-medium mb-[3px] hover:text-yellow-500">Build your own
					university major from multiple institutions</div>
				<div class="text-[11px] text-foreground-muted"><span class="text-yellow-500 font-medium">389 ⚡</span> · 2 builds</div>
			</div>
			<div class="py-[7px] border-b border-border-muted cursor-pointer">
				<div class="text-[12.5px] text-foreground leading-[1.4] font-medium mb-[3px] hover:text-yellow-500">Employer-run
					certification to replace degrees</div>
				<div class="text-[11px] text-foreground-muted"><span class="text-yellow-500 font-medium">198 ⚡</span> · 1 build</div>
			</div>
			<div class="mt-[10px] text-[12px] text-foreground-muted text-center">Want to <a href={resolve('/')}
					class="text-foreground font-medium cursor-pointer">build on one of these</a> instead?</div>
		</div>

	</div>
</div>