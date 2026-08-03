<!-- src/routes/settings/billing/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';

	let { data } = $props();

	// ── Billing cycle toggle ──────────────────────────────────
	let billing = $state<'monthly' | 'yearly'>('yearly');

	// ── Current plan ──────────────────────────────────────────
	let currentPlan = $state<'free' | 'pro'>('free');

	// ── Modals ────────────────────────────────────────────────
	let showUpgradeModal = $state(false);
	let showCancelModal = $state(false);
	let showCardModal = $state(false);
	let selectedPlan = $state<'pro' | null>(null);
	let cancelStep = $state<1 | 2>(1);
	let cancelReason = $state('');

	// ── Card form ─────────────────────────────────────────────
	let cardNumber = $state('');
	let cardExpiry = $state('');
	let cardCvc = $state('');
	let cardName = $state('');
	let cardSaving = $state(false);

	// ── Fake saved card (shown when pro) ──────────────────────
	const savedCard = { brand: 'Visa', last4: '4242', expiry: '08/26' };

	// ── Invoices ──────────────────────────────────────────────
	const invoices = [
		{
			id: 'INV-2025-006',
			date: 'Jun 1, 2025',
			amount: '$99.00',
			status: 'paid',
			plan: 'Pro Yearly'
		},
		{
			id: 'INV-2025-005',
			date: 'May 1, 2025',
			amount: '$99.00',
			status: 'paid',
			plan: 'Pro Yearly'
		},
		{
			id: 'INV-2025-004',
			date: 'Apr 1, 2025',
			amount: '$99.00',
			status: 'paid',
			plan: 'Pro Yearly'
		},
		{
			id: 'INV-2025-003',
			date: 'Mar 1, 2025',
			amount: '$99.00',
			status: 'paid',
			plan: 'Pro Yearly'
		},
		{
			id: 'INV-2025-002',
			date: 'Feb 1, 2025',
			amount: '$99.00',
			status: 'paid',
			plan: 'Pro Yearly'
		},
		{
			id: 'INV-2025-001',
			date: 'Jan 1, 2025',
			amount: '$99.00',
			status: 'paid',
			plan: 'Pro Yearly'
		}
	];

	// ── Plans ─────────────────────────────────────────────────
	const plans = [
		{
			id: 'free',
			name: 'Free',
			desc: 'For curious people and casual idea sharers.',
			price: { monthly: 0, yearly: 0 },
			features: [
				'Post unlimited ideas',
				'Spark and refine ideas',
				'Join public challenges',
				'Basic notifications',
				'Community feed access'
			],
			limits: ['No early access to ideas', 'No builder analytics', 'No direct messaging']
		},
		{
			id: 'pro',
			name: 'Pro',
			desc: 'For builders who want every advantage.',
			price: { monthly: 12, yearly: 99 },
			badge: 'Most popular',
			features: [
				'Everything in Free',
				'Early access to new ideas (24h)',
				'See who sparked your idea',
				'Direct message idea posters',
				'Builder analytics dashboard',
				'Priority in challenge leaderboards',
				'Pro badge on your profile',
				'Export your ideas as PDF / CSV'
			],
			limits: []
		}
	] as const;

	// ── Derived prices ────────────────────────────────────────
	const proMonthly = $derived(billing === 'monthly' ? '$12' : '$8.25');
	const proYearly = $derived(billing === 'yearly' ? '$99' : '$144');
	const saving = $derived(billing === 'yearly');

	// ── Helpers ───────────────────────────────────────────────
	function openUpgrade(plan: 'pro') {
		selectedPlan = plan;
		showUpgradeModal = true;
	}

	function confirmUpgrade() {
		currentPlan = selectedPlan ?? 'free';
		showUpgradeModal = false;
		selectedPlan = null;
	}

	function openCancel() {
		cancelStep = 1;
		cancelReason = '';
		showCancelModal = true;
	}

	function confirmCancel() {
		currentPlan = 'free';
		showCancelModal = false;
	}

	function saveCard() {
		cardSaving = true;
		setTimeout(() => {
			cardSaving = false;
			showCardModal = false;
			cardNumber = cardExpiry = cardCvc = cardName = '';
		}, 1200);
	}

	function formatCard(e: Event) {
		const inp = e.target as HTMLInputElement;
		inp.value = inp.value
			.replace(/\D/g, '')
			.substring(0, 16)
			.replace(/(.{4})/g, '$1 ')
			.trim();
		cardNumber = inp.value;
	}

	function formatExpiry(e: Event) {
		const inp = e.target as HTMLInputElement;
		let v = inp.value.replace(/\D/g, '').substring(0, 4);
		if (v.length >= 3) v = v.substring(0, 2) + '/' + v.substring(2);
		inp.value = v;
		cardExpiry = v;
	}

	const cancelReasons = [
		"I don't use it enough",
		'Too expensive',
		'Missing features I need',
		'Switching to another tool',
		'Just taking a break',
		'Other'
	];
</script>

<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
/>

<Navbar user={data.user} />

<div class="min-h-screen bg-background-muted">
	<!-- ── Page header ── -->
	<div class="border-b border-border bg-card px-4 py-4 sm:px-6 sm:py-5">
		<div class="mx-auto max-w-3xl">
			<h1 class="font-display text-xl font-semibold text-foreground sm:text-2xl">
				Billing &amp; Subscription
			</h1>
			<p class="mt-0.5 text-sm text-foreground-muted">
				Manage your plan, payment method, and invoices.
			</p>
		</div>
	</div>

	<div class="mx-auto flex max-w-3xl flex-col gap-5 px-4 py-5 sm:px-6 sm:py-7">
		<!-- ════════════════════════════════
		     CURRENT PLAN BANNER
		     ════════════════════════════════ -->
		{#if currentPlan === 'pro'}
			<!-- Pro banner -->
			<div class="relative overflow-hidden rounded-2xl bg-foreground px-5 py-5 sm:px-7 sm:py-6">
				<!-- subtle dot grid -->
				<div
					class="absolute inset-0 opacity-[0.06]"
					style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px);
					       background-size: 22px 22px;"
				></div>
				<div
					class="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
				>
					<div>
						<div class="mb-1.5 flex items-center gap-2">
							<span
								class="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5
							             py-1 text-xs font-bold text-accent-foreground"
							>
								⚡ IdeaShare Pro
							</span>
							<span class="text-xs text-foreground-inverted/40">Active</span>
						</div>
						<p class="text-sm leading-relaxed text-foreground-inverted/60">
							{billing === 'yearly' ? 'Next billing date:' : 'Renews:'}
							<strong class="text-foreground-inverted">July 1, 2026</strong>
							&nbsp;·&nbsp; ${billing === 'yearly' ? '99.00/yr' : '12.00/mo'}
						</p>
					</div>
					<div class="flex flex-wrap items-center gap-2">
						<button
							type="button"
							onclick={() => (showCardModal = true)}
							class="cursor-pointer rounded-xl border border-foreground-inverted/20 bg-transparent
							       px-4 py-2 text-sm font-medium
							       text-foreground-inverted transition-colors hover:bg-foreground-inverted/10"
						>
							Update card
						</button>
						<button
							type="button"
							onclick={openCancel}
							class="cursor-pointer rounded-xl border border-foreground-inverted/10 bg-transparent
							       px-4 py-2 text-sm font-medium
							       text-foreground-inverted/50 transition-colors hover:border-foreground-inverted/30
							       hover:text-foreground-inverted"
						>
							Cancel plan
						</button>
					</div>
				</div>
			</div>
		{:else}
			<!-- Free banner -->
			<div
				class="flex flex-col gap-3 rounded-2xl border border-border bg-card px-5
			            py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5"
			>
				<div class="flex items-center gap-3">
					<div
						class="flex h-10 w-10 flex-shrink-0 items-center justify-center
					            rounded-xl border border-border bg-background-muted"
					>
						<i class="ti ti-user text-xl text-foreground-muted" aria-hidden="true"></i>
					</div>
					<div>
						<div class="text-sm font-semibold text-foreground">Free plan</div>
						<div class="mt-0.5 text-xs text-foreground-muted">
							Upgrade to Pro to unlock builder tools and early access.
						</div>
					</div>
				</div>
				<button
					type="button"
					onclick={() => openUpgrade('pro')}
					class="flex cursor-pointer items-center justify-center gap-2 self-start rounded-xl border-none
					       bg-accent px-5 py-2.5 text-sm font-bold
					       whitespace-nowrap text-accent-foreground transition-opacity hover:opacity-90 sm:self-auto"
				>
					<i class="ti ti-bolt text-base" aria-hidden="true"></i>
					Upgrade to Pro
				</button>
			</div>
		{/if}

		<!-- ════════════════════════════════
		     BILLING CYCLE + PLAN CARDS
		     ════════════════════════════════ -->
		<section class="rounded-2xl border border-border bg-card p-4 sm:p-6">
			<div class="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2 class="font-display text-base font-semibold text-foreground">Plans</h2>

				<!-- Billing cycle toggle -->
				<div class="flex items-center gap-2 self-start sm:self-auto">
					<div
						class="flex items-center rounded-full border border-border bg-background-muted
					            p-0.5"
					>
						<button
							type="button"
							onclick={() => (billing = 'monthly')}
							class="cursor-pointer rounded-full border-none px-3.5 py-1.5 text-xs
							       font-medium transition-all
							       {billing === 'monthly'
								? 'bg-card text-foreground shadow-sm'
								: 'bg-transparent text-foreground-muted hover:text-foreground'}"
						>
							Monthly
						</button>
						<button
							type="button"
							onclick={() => (billing = 'yearly')}
							class="flex cursor-pointer items-center gap-1.5 rounded-full border-none
							       px-3.5 py-1.5 text-xs font-medium transition-all
							       {billing === 'yearly'
								? 'bg-card text-foreground shadow-sm'
								: 'bg-transparent text-foreground-muted hover:text-foreground'}"
						>
							Yearly
							{#if billing === 'monthly'}
								<span
									class="rounded-full bg-accent px-1.5 py-0.5
								             text-[10px] leading-none font-bold text-accent-foreground"
								>
									-31%
								</span>
							{/if}
						</button>
					</div>

					{#if saving}
						<span
							class="rounded-full border border-success-border
						             bg-success-background px-2 py-1 text-xs font-medium text-success-foreground"
						>
							You save $45/yr
						</span>
					{/if}
				</div>
			</div>

			<!-- Plan cards — stack on mobile, side by side on sm+ -->
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
				{#each plans as plan (plan)}
					<div
						class="relative flex flex-col rounded-xl border p-4 transition-all sm:p-5
					            {plan.id === 'pro'
							? 'border-accent bg-accent/5'
							: 'border-border bg-background-secondary'}
					            {currentPlan === plan.id ? 'ring-2 ring-accent' : ''}"
					>
						<!-- Popular badge -->
						{#if 'badge' in plan && plan.badge}
							<div class="absolute -top-3 left-4">
								<span
									class="rounded-full bg-accent px-2.5 py-1 text-[11px]
								             font-bold text-accent-foreground shadow-sm"
								>
									{plan.badge}
								</span>
							</div>
						{/if}

						<!-- Plan header -->
						<div class="mb-4 {'badge' in plan && plan.badge ? 'mt-2' : ''}">
							<div class="flex items-start justify-between gap-2">
								<div>
									<div class="font-display text-base font-semibold text-foreground">
										{plan.name}
									</div>
									<div class="mt-0.5 text-xs leading-snug text-foreground-muted">
										{plan.desc}
									</div>
								</div>
								{#if currentPlan === plan.id}
									<span
										class="flex-shrink-0 rounded-full border border-success-border bg-success-background
									             px-2 py-0.5 text-[11px]
									             font-semibold text-success-foreground"
									>
										Current
									</span>
								{/if}
							</div>

							<!-- Price -->
							<div class="mt-3 flex items-baseline gap-1">
								{#if plan.price.monthly === 0}
									<span class="font-display text-2xl font-bold text-foreground">Free</span>
									<span class="text-xs text-foreground-muted">forever</span>
								{:else}
									<span class="font-display text-2xl font-bold text-foreground">
										{billing === 'yearly' ? proMonthly : '$12'}
									</span>
									<span class="text-xs text-foreground-muted">/month</span>
									{#if billing === 'yearly'}
										<span class="ml-1 text-xs text-foreground-muted">
											({proYearly}/yr)
										</span>
									{/if}
								{/if}
							</div>
						</div>

						<!-- Features -->
						<ul class="mb-5 flex flex-1 flex-col gap-1.5">
							{#each plan.features as f (f)}
								<li class="flex items-start gap-2 text-sm text-foreground">
									<i
										class="ti ti-check mt-0.5 flex-shrink-0 text-sm text-success"
										aria-hidden="true"
									></i>
									{f}
								</li>
							{/each}
							{#each plan.limits as l (l)}
								<li class="flex items-start gap-2 text-sm text-foreground-muted">
									<i
										class="ti ti-x mt-0.5 flex-shrink-0 text-sm text-foreground-disabled"
										aria-hidden="true"
									></i>
									{l}
								</li>
							{/each}
						</ul>

						<!-- CTA -->
						{#if currentPlan === plan.id}
							<div
								class="flex h-9 items-center justify-center text-sm
							            font-medium text-foreground-muted"
							>
								✓ Your current plan
							</div>
						{:else if plan.id === 'pro' && currentPlan === 'free'}
							<button
								type="button"
								onclick={() => openUpgrade('pro')}
								class="flex h-9 w-full cursor-pointer items-center justify-center
								       gap-1.5 rounded-xl border-none bg-accent text-sm
								       font-bold text-accent-foreground transition-opacity hover:opacity-90"
							>
								<i class="ti ti-bolt text-sm" aria-hidden="true"></i>
								Upgrade to Pro
							</button>
						{:else if plan.id === 'free' && currentPlan === 'pro'}
							<button
								type="button"
								onclick={openCancel}
								class="h-9 w-full cursor-pointer rounded-xl border border-border bg-transparent
								       text-sm font-medium text-foreground-muted
								       transition-colors hover:border-destructive hover:text-destructive"
							>
								Downgrade to Free
							</button>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- ════════════════════════════════
		     PAYMENT METHOD
		     ════════════════════════════════ -->
		<section class="rounded-2xl border border-border bg-card p-4 sm:p-6">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="font-display text-base font-semibold text-foreground">Payment method</h2>
				{#if currentPlan === 'pro'}
					<button
						type="button"
						onclick={() => (showCardModal = true)}
						class="flex cursor-pointer items-center gap-1 border-none
						       bg-transparent text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
					>
						<i class="ti ti-pencil text-sm" aria-hidden="true"></i>
						Edit
					</button>
				{/if}
			</div>

			{#if currentPlan === 'pro'}
				<!-- Saved card -->
				<div
					class="flex items-center justify-between rounded-xl border
				            border-border bg-background-secondary p-3.5"
				>
					<div class="flex items-center gap-3">
						<!-- Card brand icon -->
						<div
							class="flex h-7 w-10 flex-shrink-0 items-center justify-center
						            rounded-md border border-border bg-card"
						>
							<span class="text-xs font-bold text-foreground">VISA</span>
						</div>
						<div>
							<div class="text-sm font-medium text-foreground">
								•••• •••• •••• {savedCard.last4}
							</div>
							<div class="mt-0.5 text-xs text-foreground-muted">
								Expires {savedCard.expiry}
							</div>
						</div>
					</div>
					<span
						class="rounded-full border border-success-border
					             bg-success-background px-2 py-0.5
					             text-xs font-medium text-success-foreground"
					>
						Default
					</span>
				</div>
			{:else}
				<!-- No card on file -->
				<div
					class="flex flex-col items-center justify-center gap-3 rounded-xl
				            border border-dashed border-border py-8"
				>
					<div
						class="flex h-10 w-10 items-center justify-center rounded-xl
					            border border-border bg-background-muted"
					>
						<i class="ti ti-credit-card text-xl text-foreground-muted" aria-hidden="true"></i>
					</div>
					<div class="text-center">
						<div class="text-sm font-medium text-foreground">No payment method</div>
						<div class="mt-0.5 text-xs text-foreground-muted">
							Add a card when you upgrade to Pro.
						</div>
					</div>
					<button
						type="button"
						onclick={() => openUpgrade('pro')}
						class="cursor-pointer rounded-xl border-none bg-accent px-4 py-2 text-xs
						       font-bold text-accent-foreground transition-opacity hover:opacity-90"
					>
						Upgrade to Pro
					</button>
				</div>
			{/if}

			<!-- Secure note -->
			<div class="mt-3 flex items-center gap-1.5">
				<i class="ti ti-lock text-xs text-foreground-muted" aria-hidden="true"></i>
				<span class="text-xs text-foreground-muted">
					Payments are processed securely. We never store your card details.
				</span>
			</div>
		</section>

		<!-- ════════════════════════════════
		     USAGE
		     ════════════════════════════════ -->
		<section class="rounded-2xl border border-border bg-card p-4 sm:p-6">
			<h2 class="mb-4 font-display text-base font-semibold text-foreground">Usage this month</h2>

			<div class="flex flex-col gap-4">
				{#each [{ label: 'Ideas posted', used: 3, limit: currentPlan === 'pro' ? null : 10, unit: 'ideas' }, { label: 'Direct messages', used: 0, limit: currentPlan === 'pro' ? null : 0, unit: 'messages' }, { label: 'Challenges joined', used: 2, limit: null, unit: 'challenges' }, { label: 'Spark storage', used: 847, limit: null, unit: 'sparks' }] as item (item.label)}
					<div>
						<div class="mb-1.5 flex items-center justify-between">
							<span class="text-sm text-foreground">{item.label}</span>
							<span class="text-sm font-medium text-foreground">
								{item.used}{item.limit !== null ? ` / ${item.limit}` : ''}
								<span class="ml-0.5 text-xs font-normal text-foreground-muted">{item.unit}</span>
							</span>
						</div>
						{#if item.limit !== null}
							<div class="h-1.5 overflow-hidden rounded-full bg-background-muted">
								<div
									class="h-full rounded-full transition-all duration-500
									       {item.used / item.limit > 0.8 ? 'bg-warning' : 'bg-accent'}"
									style="width: {Math.min((item.used / item.limit) * 100, 100)}%"
								></div>
							</div>
							{#if item.limit === 0}
								<p class="mt-1 text-xs text-foreground-muted">
									Upgrade to Pro to unlock direct messaging.
								</p>
							{/if}
						{:else}
							<div class="h-1.5 overflow-hidden rounded-full bg-background-muted">
								<div class="h-full w-full rounded-full bg-success opacity-30"></div>
							</div>
							<p class="mt-1 text-xs text-foreground-muted">Unlimited</p>
						{/if}
					</div>
				{/each}
			</div>
		</section>

		<!-- ════════════════════════════════
		     INVOICES
		     ════════════════════════════════ -->
		<section class="rounded-2xl border border-border bg-card p-4 sm:p-6">
			<div class="mb-4 flex items-center justify-between">
				<h2 class="font-display text-base font-semibold text-foreground">Invoice history</h2>
				{#if currentPlan === 'pro' && invoices.length > 0}
					<button
						type="button"
						class="flex cursor-pointer items-center gap-1 border-none
						       bg-transparent text-sm font-medium text-foreground-muted transition-colors hover:text-foreground"
					>
						<i class="ti ti-download text-sm" aria-hidden="true"></i>
						Export all
					</button>
				{/if}
			</div>

			{#if currentPlan === 'free' || invoices.length === 0}
				<div class="flex flex-col items-center gap-2 py-10">
					<i class="ti ti-receipt text-3xl text-foreground-disabled" aria-hidden="true"></i>
					<div class="text-sm font-medium text-foreground-muted">No invoices yet</div>
					<div class="text-xs text-foreground-muted">
						Invoices will appear here once you upgrade.
					</div>
				</div>
			{:else}
				<!-- Table: scroll on mobile, normal on desktop -->
				<div class="-mx-4 overflow-x-auto sm:-mx-6">
					<table class="w-full min-w-[480px] text-sm">
						<thead>
							<tr class="border-b border-border">
								<th
									class="px-4 pb-2.5 text-left text-xs
								           font-semibold text-foreground-muted sm:px-6"
								>
									Invoice
								</th>
								<th class="px-2 pb-2.5 text-left text-xs font-semibold text-foreground-muted">
									Date
								</th>
								<th class="px-2 pb-2.5 text-left text-xs font-semibold text-foreground-muted">
									Plan
								</th>
								<th class="px-2 pb-2.5 text-left text-xs font-semibold text-foreground-muted">
									Amount
								</th>
								<th class="px-2 pb-2.5 text-left text-xs font-semibold text-foreground-muted">
									Status
								</th>
								<th class="px-4 pb-2.5 sm:px-6"></th>
							</tr>
						</thead>
						<tbody>
							{#each invoices as inv (inv)}
								<tr
									class="border-b border-border-muted transition-colors
								           last:border-0 hover:bg-background-secondary"
								>
									<td class="px-4 py-3 font-mono text-xs text-foreground-muted sm:px-6">
										{inv.id}
									</td>
									<td class="px-2 py-3 text-foreground">{inv.date}</td>
									<td class="px-2 py-3 text-foreground-muted">{inv.plan}</td>
									<td class="px-2 py-3 font-medium text-foreground">{inv.amount}</td>
									<td class="px-2 py-3">
										<span
											class="rounded-full border border-success-border bg-success-background px-2
										             py-0.5 text-xs
										             font-semibold text-success-foreground"
										>
											Paid
										</span>
									</td>
									<td class="px-4 py-3 text-right sm:px-6">
										<button
											type="button"
											class="ml-auto flex cursor-pointer items-center
											       gap-1 border-none bg-transparent
											       text-xs font-medium text-foreground-muted transition-colors hover:text-foreground"
										>
											<i class="ti ti-download text-sm" aria-hidden="true"></i>
											PDF
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			{/if}
		</section>
	</div>
</div>

<!-- ════════════════════════════════════════════════
     UPGRADE MODAL
     ════════════════════════════════════════════════ -->
{#if showUpgradeModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-sm
		       sm:items-center sm:p-4"
		onclick={(e) => {
			if (e.target === e.currentTarget) showUpgradeModal = false;
		}}
	>
		<div
			class="w-full overflow-hidden rounded-t-2xl border border-border
		            bg-card shadow-2xl sm:max-w-md sm:rounded-2xl"
		>
			<!-- Header -->
			<div class="bg-foreground px-5 py-5 sm:px-6">
				<div class="mb-1 flex items-center gap-2.5">
					<span
						class="inline-flex items-center gap-1.5 rounded-full bg-accent px-2.5
					             py-1 text-xs font-bold text-accent-foreground"
					>
						⚡ Pro
					</span>
				</div>
				<div class="font-display text-lg font-bold text-foreground-inverted">
					Upgrade to IdeaShare Pro
				</div>
				<div class="mt-0.5 text-sm text-foreground-inverted/50">
					{billing === 'yearly' ? '$99/year · billed annually' : '$12/month · cancel anytime'}
				</div>
			</div>

			<!-- Body -->
			<div class="px-5 py-5 sm:px-6">
				<div class="mb-5 flex flex-col gap-2">
					{#each ['Early access to new ideas (24h)', 'See who sparked your idea', 'Direct message idea posters', 'Builder analytics dashboard', 'Pro badge on your profile'] as f (f)}
						<div class="flex items-center gap-2.5 text-sm text-foreground">
							<i class="ti ti-check flex-shrink-0 text-base text-success" aria-hidden="true"></i>
							{f}
						</div>
					{/each}
				</div>

				<!-- Cycle selector inside modal -->
				<div
					class="mb-5 flex w-fit items-center gap-2 rounded-full
				            border border-border bg-background-muted p-1"
				>
					<button
						type="button"
						onclick={() => (billing = 'monthly')}
						class="cursor-pointer rounded-full border-none px-3.5 py-1.5 text-xs font-medium
						       transition-all
						       {billing === 'monthly'
							? 'bg-card text-foreground shadow-sm'
							: 'bg-transparent text-foreground-muted'}"
					>
						$12/mo
					</button>
					<button
						type="button"
						onclick={() => (billing = 'yearly')}
						class="flex cursor-pointer items-center gap-1.5 rounded-full border-none px-3.5
						       py-1.5 text-xs font-medium transition-all
						       {billing === 'yearly'
							? 'bg-card text-foreground shadow-sm'
							: 'bg-transparent text-foreground-muted'}"
					>
						$99/yr
						<span
							class="rounded-full bg-accent px-1.5 py-0.5
						             text-[10px] leading-none font-bold text-accent-foreground"
						>
							Save 31%
						</span>
					</button>
				</div>

				<div class="flex flex-col gap-2 sm:flex-row">
					<button
						type="button"
						onclick={confirmUpgrade}
						class="flex h-10 flex-1 cursor-pointer items-center justify-center
						       gap-2 rounded-xl border-none bg-accent text-sm
						       font-bold text-accent-foreground transition-opacity hover:opacity-90"
					>
						<i class="ti ti-bolt text-base" aria-hidden="true"></i>
						Confirm upgrade
					</button>
					<button
						type="button"
						onclick={() => (showUpgradeModal = false)}
						class="h-10 cursor-pointer rounded-xl border border-border bg-transparent px-5
						       text-sm font-medium text-foreground-muted
						       transition-colors hover:border-border-strong hover:text-foreground"
					>
						Cancel
					</button>
				</div>

				<p class="mt-3 text-center text-xs text-foreground-muted">
					You can cancel anytime from settings. No hidden fees.
				</p>
			</div>
		</div>
	</div>
{/if}

<!-- ════════════════════════════════════════════════
     CANCEL MODAL
     ════════════════════════════════════════════════ -->
{#if showCancelModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-sm
		       sm:items-center sm:p-4"
		onclick={(e) => {
			if (e.target === e.currentTarget) showCancelModal = false;
		}}
	>
		<div
			class="w-full overflow-hidden rounded-t-2xl border border-border
		            bg-card shadow-2xl sm:max-w-md sm:rounded-2xl"
		>
			{#if cancelStep === 1}
				<div class="px-5 py-5 sm:px-6 sm:py-6">
					<h3 class="mb-1 font-display text-base font-semibold text-foreground">Before you go…</h3>
					<p class="mb-4 text-sm text-foreground-muted">
						What's the main reason for cancelling? This helps us improve.
					</p>
					<div class="mb-5 flex flex-col gap-2">
						{#each cancelReasons as reason (reason)}
							<button
								type="button"
								onclick={() => (cancelReason = reason)}
								class="flex cursor-pointer items-center gap-3 rounded-xl border px-3.5
								       py-2.5 text-left text-sm transition-all
								       {cancelReason === reason
									? 'border-accent bg-accent/10 text-foreground'
									: 'border-border bg-background-secondary text-foreground-muted hover:border-border-strong hover:text-foreground'}"
							>
								<div
									class="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full
								            border-2 transition-colors
								            {cancelReason === reason ? 'border-accent' : 'border-border'}"
								>
									{#if cancelReason === reason}
										<div class="h-2 w-2 rounded-full bg-accent"></div>
									{/if}
								</div>
								{reason}
							</button>
						{/each}
					</div>
					<div class="flex flex-col gap-2 sm:flex-row">
						<button
							type="button"
							onclick={() => (cancelStep = 2)}
							disabled={!cancelReason}
							class="flex h-10 flex-1 cursor-pointer items-center justify-center
							       rounded-xl border-none text-sm font-semibold transition-opacity
							       {cancelReason
								? 'bg-destructive text-destructive-foreground hover:opacity-85'
								: 'cursor-not-allowed bg-muted text-foreground-disabled'}"
						>
							Continue
						</button>
						<button
							type="button"
							onclick={() => (showCancelModal = false)}
							class="h-10 cursor-pointer rounded-xl border border-border bg-transparent px-5
							       text-sm font-medium text-foreground-muted
							       transition-colors hover:border-border-strong hover:text-foreground"
						>
							Keep Pro
						</button>
					</div>
				</div>
			{:else}
				<div class="px-5 py-5 sm:px-6 sm:py-6">
					<div class="mb-4 flex items-start gap-3">
						<div
							class="flex h-9 w-9 flex-shrink-0 items-center justify-center
						            rounded-xl border border-warning-border bg-warning-background"
						>
							<i class="ti ti-alert-triangle text-base text-warning-foreground" aria-hidden="true"
							></i>
						</div>
						<div>
							<h3 class="font-display text-base font-semibold text-foreground">
								You'll lose Pro access
							</h3>
							<p class="mt-0.5 text-sm text-foreground-muted">
								At the end of your billing period, you'll lose:
							</p>
						</div>
					</div>

					<ul class="mb-5 flex flex-col gap-1.5 pl-1">
						{#each ['Early idea access', 'Direct messaging', 'Builder analytics', 'Pro profile badge'] as f (f)}
							<li class="flex items-center gap-2 text-sm text-foreground">
								<i class="ti ti-x flex-shrink-0 text-sm text-destructive" aria-hidden="true"></i>
								{f}
							</li>
						{/each}
					</ul>

					<div class="flex flex-col gap-2 sm:flex-row">
						<button
							type="button"
							onclick={confirmCancel}
							class="flex h-10 flex-1 cursor-pointer items-center justify-center rounded-xl
							       border border-destructive/40 bg-transparent
							       text-sm font-medium text-destructive transition-colors
							       hover:bg-destructive/5"
						>
							Yes, cancel plan
						</button>
						<button
							type="button"
							onclick={() => (showCancelModal = false)}
							class="h-10 flex-1 cursor-pointer rounded-xl border-none bg-accent
							       text-sm font-bold text-accent-foreground transition-opacity hover:opacity-90"
						>
							Keep Pro
						</button>
					</div>
					<p class="mt-3 text-center text-xs text-foreground-muted">
						Your Pro features stay active until your billing period ends.
					</p>
				</div>
			{/if}
		</div>
	</div>
{/if}

<!-- ════════════════════════════════════════════════
     ADD / UPDATE CARD MODAL
     ════════════════════════════════════════════════ -->
{#if showCardModal}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-sm
		       sm:items-center sm:p-4"
		onclick={(e) => {
			if (e.target === e.currentTarget) showCardModal = false;
		}}
	>
		<div
			class="w-full overflow-hidden rounded-t-2xl border border-border
		            bg-card shadow-2xl sm:max-w-md sm:rounded-2xl"
		>
			<div class="px-5 py-5 sm:px-6 sm:py-6">
				<div class="mb-4 flex items-center justify-between">
					<h3 class="font-display text-base font-semibold text-foreground">
						Update payment method
					</h3>
					<button
						type="button"
						onclick={() => (showCardModal = false)}
						class="flex h-7 w-7 cursor-pointer items-center justify-center
						       rounded-lg border border-border bg-background-secondary
						       text-foreground-muted transition-colors hover:text-foreground"
					>
						<i class="ti ti-x text-sm" aria-hidden="true"></i>
					</button>
				</div>

				<div class="flex flex-col gap-3">
					<div>
						<label class="mb-1.5 block text-xs font-semibold text-foreground">
							Cardholder name
						</label>
						<input
							type="text"
							bind:value={cardName}
							placeholder="Rafiq Karim"
							class="card-input h-10 w-full"
						/>
					</div>
					<div>
						<label class="mb-1.5 block text-xs font-semibold text-foreground"> Card number </label>
						<div class="relative">
							<input
								type="text"
								value={cardNumber}
								oninput={formatCard}
								placeholder="1234 5678 9012 3456"
								maxlength="19"
								class="card-input h-10 w-full pr-10"
							/>
							<i
								class="ti ti-credit-card absolute top-1/2 right-3 -translate-y-1/2
							          text-base text-foreground-muted"
								aria-hidden="true"
							></i>
						</div>
					</div>
					<div class="grid grid-cols-2 gap-3">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground">
								Expiry date
							</label>
							<input
								type="text"
								value={cardExpiry}
								oninput={formatExpiry}
								placeholder="MM/YY"
								maxlength="5"
								class="card-input h-10 w-full"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground"> CVC </label>
							<input
								type="text"
								bind:value={cardCvc}
								placeholder="123"
								maxlength="4"
								class="card-input h-10 w-full"
							/>
						</div>
					</div>
				</div>

				<div class="mt-3 mb-5 flex items-center gap-1.5">
					<i class="ti ti-lock text-xs text-foreground-muted" aria-hidden="true"></i>
					<span class="text-xs text-foreground-muted">
						Encrypted and secure. We never store raw card data.
					</span>
				</div>

				<div class="flex flex-col gap-2 sm:flex-row">
					<button
						type="button"
						onclick={saveCard}
						disabled={cardSaving}
						class="flex h-10 flex-1 cursor-pointer items-center justify-center
						       gap-2 rounded-xl border-none bg-foreground
						       text-sm font-semibold text-background transition-opacity hover:opacity-85
						       {cardSaving ? 'cursor-not-allowed opacity-70' : ''}"
					>
						{#if cardSaving}
							<i class="ti ti-loader-2 animate-spin text-base" aria-hidden="true"></i>
							Saving…
						{:else}
							Save card
						{/if}
					</button>
					<button
						type="button"
						onclick={() => (showCardModal = false)}
						class="h-10 cursor-pointer rounded-xl border border-border bg-transparent px-5
						       text-sm font-medium text-foreground-muted
						       transition-colors hover:border-border-strong hover:text-foreground"
					>
						Cancel
					</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	:global(.card-input) {
		border: 1px solid var(--border);
		border-radius: var(--radius-sm);
		padding-left: 0.75rem;
		padding-right: 0.75rem;
		font-size: 0.875rem;
		color: var(--foreground);
		background-color: var(--background-secondary);
		outline: none;
		transition:
			border-color 0.15s,
			box-shadow 0.15s;
		font-family: var(--font-body);
		width: 100%;
	}
	:global(.card-input:focus) {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
	}
	:global(.card-input::placeholder) {
		color: var(--foreground-muted);
	}
</style>
