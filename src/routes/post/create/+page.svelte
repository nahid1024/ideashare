<script lang="ts">
	import { resolve } from '$app/paths';
	import Navbar from '$lib/components/Navbar.svelte';
	import { postSchema, topicSchema } from '$lib/validation_schema';
	import { Combobox } from 'bits-ui';
	import CircleNotchIcon from 'phosphor-svelte/lib/CircleNotchIcon';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';
	import { sleep } from '$lib/utils.js';
	import z from 'zod';
	import { Accordion } from 'bits-ui';
	import CaretDown from 'phosphor-svelte/lib/CaretDownIcon';
	import TipTap from '$lib/components/TipTap.svelte';
	import type { JSONContent } from '@tiptap/core';

	const MAXTOPICS = 5;
	type Topics = z.infer<typeof topicSchema>;

	let title = $state('');
	let description = $state<JSONContent>({
		type: 'doc',
		content: []
	});
	let solvedProblem = $state<string>();
	let isAnonymous = $state(false);
	let whoBenefits = $state<string>();
	let isLoading = $state({ intent: '', state: false });
	let postId = $state('');
	let selectedTopics = $state<Topics[]>([]);
	let focusedBlock = $state('title');
	let showDupeWarning = $state(false);
	let tagOpen = $state(false);
	let tagInput = $state('');
	let tagInputRef = $state<HTMLInputElement | null>(null);

	const { data } = $props();

	const topicsList = $derived(data.topics);

	const isValid = $derived(
		postSchema.pick({ title: true, description: true }).safeParse({ title, description }).success
	);

	let errors = $state({
		title: '',
		description: ''
	});

	function validate(field: string) {
		if (field === 'title') {
			const titleResult = postSchema.shape.title.safeParse(title);
			errors.title = titleResult.success ? '' : titleResult.error.issues[0].message;
		}
		if (field === 'desc') {
			const descResult = postSchema.shape.description.safeParse(description);
			errors.description = descResult.success ? '' : descResult.error.issues[0].message;
		}
	}

	const filteredTopics = $derived(
		topicsList.filter(
			(topic) =>
				topic.name.toLowerCase().includes(tagInput.toLowerCase()) &&
				!selectedTopics.some((t) => t.name === topic.name)
		)
	);

	function addTopic(id: string) {
		const topic = topicsList.find((t) => t.id === id);
		if (!topic) return;

		if (!selectedTopics.some((t) => t.id === topic.id)) {
			selectedTopics = [...selectedTopics, topic];
		}
		tagInput = '';
	}

	function removeTopic(topicId: string) {
		selectedTopics = selectedTopics.filter((t) => t.id !== topicId);
	}

	async function submit(intent: string) {
		isLoading.state = true;
		isLoading.intent = intent;
		try {
			const res = await fetch('/api/post/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: title,
					description: description,
					solvedProblem: solvedProblem ?? null,
					whoBenefits: whoBenefits ?? null,
					isAnonymous: isAnonymous,
					intent: intent,
					topics: selectedTopics
				})
			});
			if (!res.ok) {
				toast.error('Something went wrong');
			}
			const data = await res.json();
			postId = data.postId;
		} catch (error) {
			console.log(error);
		} finally {
			await sleep(1000);
			isLoading.state = false;
			toast.success('Idea Posted!');
			await sleep(1000);
			goto(resolve(`/post/${postId}`));
		}
	}
</script>

<svelte:head>
	<title>IdeaShare — Post an Idea</title>
</svelte:head>

<!-- NAVBAR -->
<Navbar user={data.user} />
<!-- PAGE -->

<div
	class="post-layout mx-auto grid max-w-215 grid-cols-1 items-start gap-7 px-3 pt-3.5 pb-20 min-[601px]:px-4 min-[601px]:pt-5 min-[761px]:grid-cols-[minmax(0,1fr)_240px] min-[761px]:px-6 min-[761px]:pt-9 min-[761px]:pb-15"
>
	<!-- FORM -->
	<form class="flex flex-col gap-0" method="POST">
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

		<div class="rounded-2xl border border-border bg-background">
			<!-- Title field -->
			<div
				id="block-title"
				class="field-block relative overflow-hidden rounded-t-2xl border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'title'
					? 'bg-accent/5'
					: ''}"
			>
				<div
					class="field-accent absolute top-0 bottom-0 left-0 w-0.75 transition-colors {focusedBlock ===
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
					name="title"
					bind:value={title}
					onblur={() => validate('title')}
					onfocus={() => (focusedBlock = 'title')}
					class="w-full resize-none border-none font-display text-[18px] leading-[1.4] font-semibold text-foreground outline-none placeholder:font-medium placeholder:text-foreground-disabled"
					placeholder="e.g. A universal exam system where you study anywhere and just show up to get certified"
				></textarea>

				<div class="flex">
					{#if errors.title}
						<div class="mt-1.25 mr-auto flex text-[11px]">
							<p class="text-[11px] text-red-400">{errors.title}</p>
						</div>
					{/if}
					<div
						id="title-count"
						class="mt-1.25 ml-auto text-[11px] {title.length > 100
							? 'text-yellow-500'
							: 'text-foreground-disabled'}"
					>
						{title.length} / 120
					</div>
				</div>
			</div>

			<!-- Description Field - Prose Editor -->
			<div class="border-l-3 border-l-transparent focus-within:border-l-accent">
				<div
					class="mb-2 flex items-center gap-1.5 px-6 pt-5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					<div class="inline-block h-1.25 w-1.25 rounded-full bg-yellow-500"></div>
					Describe the idea
				</div>

				<TipTap
					bind:value={description}
					minHeight="300px"
					onblur={() => validate('desc')}
					onfocus={() => (focusedBlock = 'desc')}
					errorMessage={errors.description}
					placeholder="Describe your idea in detail"
				/>
			</div>
			<Accordion.Root type="multiple">
				<!-- Problem field -->

				<div
					class="border-l-3 {focusedBlock === 'problem'
						? 'border-l-accent'
						: 'border-l-transparent'}"
				>
					<Accordion.Item
						value="problem-item"
						class="border-b border-border-muted {focusedBlock === 'problem' ? 'bg-accent/5' : ''}"
					>
						<Accordion.Header>
							<Accordion.Trigger
								class="w-full cursor-pointer text-left transition-all [&[data-state=open]>div>div>svg]:rotate-180"
								onclick={() => (focusedBlock = 'problem')}
							>
								<!-- Accordion Header Content -->
								<div
									id="block-problem"
									class="field-block relative p-[20px_24px] transition-colors"
								>
									<div
										class="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
									>
										<CaretDown class="transition-transform duration-200" size="18px" />
										What problem does this solve?
										<span
											class="rounded-full bg-background-muted px-1.5 py-px text-[10px] font-medium tracking-normal text-foreground-disabled normal-case"
											>optional</span
										>
									</div>
								</div>
							</Accordion.Trigger>
						</Accordion.Header>

						<Accordion.Content class="px-6 pb-5">
							<!-- Accordion Collapsible Body -->
							<textarea
								id="problem-input"
								rows="2"
								name="solvedProblem"
								bind:value={solvedProblem}
								class="w-full resize-none border-none bg-transparent font-[inherit] text-sm leading-[1.7] text-foreground outline-none placeholder:text-foreground-disabled"
								placeholder="e.g. University is too expensive and location-dependent for most people in the world."
							></textarea>
						</Accordion.Content>
					</Accordion.Item>
				</div>
				<!-- Who benefits -->

				<div
					class="border-l-3 {focusedBlock === 'whobenefit'
						? 'border-l-accent'
						: 'border-l-transparent'}"
				>
					<Accordion.Item
						value="who-benefit"
						class="border-b border-border-muted [&[data-state=open]>svg]:rotate-180 {focusedBlock ===
						'whobenefit'
							? 'bg-accent/5'
							: ''}"
					>
						<Accordion.Header>
							<Accordion.Trigger
								class="w-full cursor-pointer text-left transition-all [&[data-state=open]>div>div>svg]:rotate-180"
								onclick={() => (focusedBlock = 'whobenefit')}
							>
								<!-- Accordion Header Content -->

								<div id="who-benefit" class="field-block relative p-[20px_24px] transition-colors">
									<div
										class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
									>
										<CaretDown class="transition-transform duration-200" size="18px" />
										Who would benefit?
										<span
											class="rounded-full bg-background-muted px-1.5 py-px text-[10px] font-medium tracking-normal text-foreground-disabled normal-case"
											>optional</span
										>
									</div>
								</div>
							</Accordion.Trigger>
						</Accordion.Header>

						<Accordion.Content class="px-6 pb-5 ">
							<!-- Accordion Collapsible Body -->
							<textarea
								id="benefit-input"
								rows="2"
								name="whobenefit"
								bind:value={whoBenefits}
								class="w-full resize-none border-none bg-transparent font-[inherit] text-sm leading-[1.7] text-foreground outline-none placeholder:text-foreground-disabled"
								placeholder="e.g. Students in developing countries, working adults..."
							></textarea>
						</Accordion.Content>
					</Accordion.Item>
				</div>
			</Accordion.Root>

			<!-- Topic tags -->
			<div
				id="block-topic"
				role="presentation"
				onclick={() => {
					focusedBlock = 'topic';
					tagInputRef?.focus();
				}}
				class="field-block relative border-b border-border-muted p-[20px_24px] transition-colors {focusedBlock ===
				'topic'
					? 'bg-accent/5'
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
						>Pick up to {MAXTOPICS}</span
					>
				</div>
				<div
					class="min-h-11.5-full relative flex flex-wrap items-center gap-1.75 rounded-lg p-2.5 transition-colors focus-within:border-foreground-muted"
				>
					{#each selectedTopics as topic (topic)}
						{#if topic.name}
							<span
								class="inline-flex items-center gap-1 rounded-full border border-foreground bg-foreground px-2.5 py-1 text-[12.5px] font-semibold text-foreground-inverted transition-colors"
							>
								#{topic.name}
								<button
									type="button"
									class="ml-1 inline-flex h-3.5 w-3.5 cursor-pointer items-center justify-center rounded-full text-foreground-inverted/70 hover:bg-white/20 hover:text-white"
									onclick={(e) => {
										e.stopPropagation();
										removeTopic(topic.id);
									}}
								>
									✕
								</button>
							</span>
						{/if}
					{/each}

					<Combobox.Root
						type="single"
						value={tagInput}
						bind:open={tagOpen}
						onValueChange={(v) => {
							if (v) {
								addTopic(v);
								if (tagInputRef) tagInputRef.value = '';
							}
						}}
						onOpenChangeComplete={(open) => {
							if (!open) {
								if (tagInputRef) tagInputRef.value = '';
							}
						}}
					>
						{#if selectedTopics.length === MAXTOPICS}
							<div class="text-sm text-foreground-disabled">Max input</div>
						{:else}
							<Combobox.Input
								type="text"
								bind:ref={tagInputRef}
								oninput={(e) => (tagInput = e.currentTarget.value)}
								onclick={() => {
									tagOpen = true;
								}}
								placeholder="Type or select who benefits..."
								class="min-w-30 grow border-none bg-transparent p-1 text-[13.5px] text-foreground outline-none placeholder:text-foreground-disabled"
							/>
						{/if}
						<Combobox.Trigger />

						<Combobox.Portal>
							<Combobox.Content
								align="start"
								class="w-40 rounded-md border border-border bg-background p-2 shadow-md outline-hidden focus-visible:outline-hidden"
							>
								<Combobox.Viewport class="max-h-50 min-h-25 overflow-y-auto">
									{#each filteredTopics as chip (chip)}
										<Combobox.Item
											class="flex w-full cursor-pointer items-center gap-2 rounded-sm px-4 py-3 text-left text-[13px] font-medium text-foreground transition-colors hover:bg-background-muted focus-visible:outline-none data-highlighted:bg-muted data-highlighted:text-foreground"
											value={chip.id}
										>
											#{chip.name}
										</Combobox.Item>
									{:else}
										<div class="px-5 py-6 text-sm text-muted-foreground">
											No results found, try again.
										</div>
									{/each}
								</Combobox.Viewport>
							</Combobox.Content>
						</Combobox.Portal>
					</Combobox.Root>
				</div>
			</div>

			<!-- Anonymous toggle -->
			<div class="relative rounded-b-2xl p-[20px_24px]">
				<div
					class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
				>
					Post anonymously
					<span
						class="rounded-full bg-background-muted px-1.5 py-px text-[10px] font-medium tracking-normal text-foreground-disabled normal-case"
						>optional</span
					>
				</div>
				<div class="flex items-center gap-3">
					<label class="relative h-5.5 w-10 shrink-0 cursor-pointer">
						<input
							id="anon-toggle"
							class="peer absolute h-0 w-0 opacity-0"
							name="isanonymous"
							type="checkbox"
							bind:checked={isAnonymous}
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
				class="flex cursor-pointer items-center gap-2 rounded-full border-none bg-primary px-7 py-2.75 font-[inherit] text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-85 disabled:bg-border-strong disabled:text-foreground-disabled"
				type="button"
				name="intent"
				value="publish"
				disabled={!isValid || isLoading.state}
				onclick={() => submit('publish')}
			>
				{#if isLoading.state && isLoading.intent === 'publish'}
					<CircleNotchIcon class="animate-spin" />
				{:else}
					Publish idea
				{/if}
			</button>
			<button
				class="cursor-pointer rounded-full border border-border bg-transparent px-5 py-2.75 font-[inherit] text-[13px] font-medium text-foreground-secondary transition-all hover:border-foreground hover:text-foreground disabled:border-border disabled:text-foreground-disabled"
				type="button"
				name="intent"
				value="draft"
				disabled={!isValid || isLoading.state}
				onclick={() => submit('draft')}
			>
				{#if isLoading.state && isLoading.intent === 'draft'}
					<CircleNotchIcon class="animate-spin" />
				{:else}
					Save as draft
				{/if}
			</button>
			<span class="text-[12px] text-foreground-muted">Your idea will be visible to everyone</span>
		</div>
	</form>

	<!-- RIGHT COLUMN -->
	<div class="preview-col hidden flex-col gap-3.5 min-[761px]:flex">
		<div class="rounded-2xl bg-black p-4">
			<div class="mb-3 text-[11px] font-semibold tracking-[0.08em] text-accent uppercase">
				Tips for a great idea
			</div>
			<div class="mb-2.5 flex items-start gap-2.5">
				<div
					class="mt-px flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-dark"
				>
					1
				</div>
				<div class="text-[12px] leading-[1.55] text-foreground-muted">
					<strong class="text-white">Lead with the problem,</strong> not the solution. "Millions can't
					afford university" is more compelling than "free exams".
				</div>
			</div>
			<div class="mb-2.5 flex items-start gap-2.5">
				<div
					class="mt-px flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-dark"
				>
					2
				</div>
				<div class="text-[12px] leading-[1.55] text-foreground-muted">
					<strong class="text-white">Be specific</strong> about who benefits. "Students in rural areas"
					gets more traction than "everyone".
				</div>
			</div>
			<div class="flex items-start gap-2.5">
				<div
					class="mt-px flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-dark"
				>
					3
				</div>
				<div class="text-[12px] leading-[1.55] text-foreground-muted">
					<strong class="text-white">Raw ideas are welcome.</strong> You don't need to have it all figured
					out — the community will help refine it.
				</div>
			</div>
		</div>

		<div class="rounded-2xl border border-border bg-background p-3.5">
			<div
				class="mb-2.5 text-[11px] font-semibold tracking-[0.08em] text-foreground-muted uppercase"
			>
				Similar ideas already posted
			</div>
			<div class="cursor-pointer border-b border-border-muted py-1.75">
				<div
					class="mb-0.75 text-[12.5px] leading-[1.4] font-medium text-foreground hover:text-yellow-500"
				>
					Build your own university major from multiple institutions
				</div>
				<div class="text-[11px] text-foreground-muted">
					<span class="font-medium text-yellow-500">389 ⚡</span> · 2 builds
				</div>
			</div>
			<div class="cursor-pointer border-b border-border-muted py-1.75">
				<div
					class="mb-0.75 text-[12.5px] leading-[1.4] font-medium text-foreground hover:text-yellow-500"
				>
					Employer-run certification to replace degrees
				</div>
				<div class="text-[11px] text-foreground-muted">
					<span class="font-medium text-yellow-500">198 ⚡</span> · 1 build
				</div>
			</div>
			<div class="mt-2.5 text-center text-[12px] text-foreground-muted">
				Want to <a href={resolve('/')} class="cursor-pointer font-medium text-foreground"
					>build on one of these</a
				> instead?
			</div>
		</div>
	</div>
</div>
