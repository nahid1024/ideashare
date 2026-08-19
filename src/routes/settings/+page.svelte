<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { sleep } from '$lib/utils.js';
	import { Avatar } from 'bits-ui';
	import { setMode } from 'mode-watcher';
	import { toast } from 'svelte-sonner';
	import CircleNotch from 'phosphor-svelte/lib/CircleNotchIcon';
	import { invalidate } from '$app/navigation';

	const { data } = $props();
	// ── Active tab ─────────────────────────────────────────────
	let activeTab = $state('profile');

	const tabs = [
		{ id: 'profile', label: 'Profile', icon: 'ti-user' },
		{ id: 'account', label: 'Account', icon: 'ti-shield' },
		{ id: 'notifications', label: 'Notifications', icon: 'ti-bell' },
		{ id: 'privacy', label: 'Privacy', icon: 'ti-lock' },
		{ id: 'appearance', label: 'Appearance', icon: 'ti-palette' },
		{ id: 'danger', label: 'Danger zone', icon: 'ti-alert-triangle' }
	];

	// ── Profile ────────────────────────────────────────────────

	// 2. Initialize your mutable form state
	let form = $state({ ...data.userInfo });
	// 4. Check for changes instantly
	let hasProfileChanged = $derived(JSON.stringify(form) !== JSON.stringify(data.userInfo));
	// let role = $state('sharer');
	let isProfileSaving = $state(false);
	let errorType = $state({ type: '' });

	async function saveProfile() {
		try {
			isProfileSaving = true;
			const res = await fetch('/api/user/profile/update', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					id: form.id,
					name: form.name,
					username: form.username,
					bio: form.bio,
					location: form.location,
					website: form.website,
					field: form.field
				})
			});
			if (!res.ok) {
				const resError = await res.json();
				errorType.type = resError.message;
				isProfileSaving = false;
				return;
			}
			await sleep(1000);
			await invalidate((url) => url.pathname === '/settings');
			isProfileSaving = false;
			toast.success('Saved changes!');
		} catch (error) {
			console.log(error);
		}
	}

	// ── Account ────────────────────────────────────────────────
	let email = $state(data.userInfo.email);
	let newEmail = $state('');
	let currentPwd = $state('');
	let newPwd = $state('');
	let confirmPwd = $state('');
	let showCurrent = $state(false);
	let showNew = $state(false);
	let pwdError = $state('');

	function changePassword() {
		if (newPwd !== confirmPwd) {
			pwdError = 'Passwords do not match.';
			return;
		}
		if (newPwd.length < 8) {
			pwdError = 'Must be at least 8 characters.';
			return;
		}
		pwdError = '';
		currentPwd = '';
		newPwd = '';
		confirmPwd = '';
	}

	// ── Notifications ──────────────────────────────────────────
	let notifs = $state({
		sparks: true,
		builders: true,
		refinements: true,
		forks: true,
		followers: false,
		digest: true,
		challenges: true,
		milestones: true
	});

	let emailNotifs = $state({
		sparks: false,
		builders: true,
		digest: true,
		milestones: true
	});

	// ── Privacy ────────────────────────────────────────────────
	let privacy = $state({
		publicProfile: true,
		showLocation: true,
		showSparked: true,
		allowMessages: true,
		showInSearch: true,
		anonymousDefault: false
	});

	// ── Appearance ─────────────────────────────────────────────
	let theme = $state<'light' | 'dark' | 'system'>('system');
	let language = $state('en');

	function setTheme(t: 'light' | 'dark' | 'system') {
		theme = t;
		if (t === 'dark') setMode('dark');
		if (t === 'light') setMode('light');
		if (t === 'system') setMode('system');
	}

	// ── Danger zone ────────────────────────────────────────────
	let deleteConfirm = $state('');
	let showDelete = $state(false);
</script>

<Navbar user={data.user} />

<link
	rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css"
/>

<div class="min-h-screen bg-background-muted">
	<!-- ── Page header ── -->
	<div class="border-b border-border bg-card px-4 py-4 sm:px-6 sm:py-5">
		<div class="mx-auto max-w-4xl">
			<h1 class="font-display text-xl font-semibold text-foreground sm:text-2xl">Settings</h1>
			<p class="mt-0.5 text-sm text-foreground-muted">
				Manage your IdeaShare account and preferences.
			</p>
		</div>
	</div>

	<!-- ── Mobile tab strip ── -->
	<div class="overflow-x-auto border-b border-border bg-card lg:hidden">
		<div class="flex min-w-max px-4">
			{#each tabs as tab (tab)}
				<button
					type="button"
					onclick={() => (activeTab = tab.id)}
					class="flex cursor-pointer items-center gap-1.5 border-b-2 border-none px-3.5
					       py-3 font-body text-sm whitespace-nowrap transition-colors
					       {activeTab === tab.id
						? 'border-b-accent bg-transparent font-medium text-foreground'
						: 'border-b-transparent bg-transparent text-foreground-muted hover:text-foreground'}"
					style="margin-bottom: -1px;"
				>
					<i
						class="ti {tab.icon} text-sm
					          {tab.id === 'danger' ? 'text-destructive' : ''}"
						aria-hidden="true"
					></i>
					<span class={tab.id === 'danger' ? 'text-destructive' : ''}>{tab.label}</span>
				</button>
			{/each}
		</div>
	</div>

	<!-- ── Layout ── -->
	<div class="mx-auto max-w-4xl px-4 py-4 sm:px-6 sm:py-6 lg:flex lg:items-start lg:gap-6">
		<!-- ── Desktop sidebar ── -->
		<aside class="sticky top-6 hidden w-48 flex-shrink-0 lg:block">
			<nav class="overflow-hidden rounded-xl border border-border bg-card">
				{#each tabs.slice(0, 5) as tab (tab)}
					<button
						type="button"
						onclick={() => (activeTab = tab.id)}
						class="flex w-full cursor-pointer items-center gap-2.5 border-none px-3.5
						       py-2.5 text-left font-body text-sm transition-colors
						       {activeTab === tab.id
							? 'border-l-2 border-l-accent bg-accent/10 font-medium text-foreground'
							: 'bg-transparent text-foreground-muted hover:bg-background-secondary hover:text-foreground'}"
					>
						<i class="ti {tab.icon} text-base" aria-hidden="true"></i>
						{tab.label}
					</button>
				{/each}
			</nav>

			<!-- Danger zone -->
			<button
				type="button"
				onclick={() => (activeTab = 'danger')}
				class="mt-2 flex w-full cursor-pointer items-center gap-2.5 rounded-xl
				       border border-none border-border bg-card px-3.5 py-2.5
				       text-left font-body text-sm transition-colors
				       {activeTab === 'danger'
					? 'font-medium text-destructive'
					: 'text-foreground-muted hover:bg-destructive/5 hover:text-destructive'}"
			>
				<i class="ti ti-alert-triangle text-base" aria-hidden="true"></i>
				Danger zone
			</button>
		</aside>

		<!-- ── Main panel ── -->
		<main class="flex min-w-0 flex-1 flex-col gap-4">
			<!-- ════════════════════════ PROFILE ════════════════════════ -->
			{#if activeTab === 'profile'}
				<!-- Avatar -->
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Profile picture</h2>
					<div class="flex items-center gap-4">
						<Avatar.Root
							class="flex h-16 w-16 items-center justify-center rounded-full border border-border-brand bg-foreground"
						>
							<Avatar.Image class="flex rounded-full" src={data.userInfo.image} />
							<Avatar.Fallback class="flex font-display text-lg font-bold text-accent"
								>NK</Avatar.Fallback
							>
						</Avatar.Root>

						<div>
							<button
								type="button"
								class="cursor-pointer rounded-lg border border-border bg-background-secondary px-3.5
								       py-1.5 text-sm font-medium
								       text-foreground transition-colors hover:border-border-strong"
							>
								Upload photo
							</button>
							<p class="mt-1.5 text-xs text-foreground-muted">JPG, PNG or GIF. Max 2MB.</p>
						</div>
					</div>
				</section>

				<!-- Basic info -->
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Basic info</h2>

					<!-- Name + handle: stack on mobile, side by side on sm+ -->
					<div class="mb-3 grid grid-cols-1 gap-3 sm:mb-4 sm:grid-cols-2 sm:gap-4">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="name"
								>Full name</label
							>
							<input type="text" bind:value={form.name} class="field-input h-10 w-full" id="name" />
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="handle"
								>Handle</label
							>
							<div class="relative">
								<input
									id="handle"
									type="text"
									bind:value={form.username}
									class="field-input h-10 w-full"
								/>
							</div>
							{#if errorType.type === 'username'}
								<span class="text-xs text-destructive">Username already exists!</span>
							{/if}
						</div>
					</div>

					<div class="mb-3 sm:mb-4">
						<label class="mb-1.5 block text-xs font-semibold text-foreground" for="bio">Bio</label>
						<textarea
							bind:value={form.bio}
							rows="3"
							id="bio"
							placeholder="Tell the community what you're about..."
							class="field-input w-full resize-none py-2.5 font-body"
						></textarea>
						<p class="mt-1 text-right text-xs text-foreground-muted">
							{form.bio?.length ?? null} / 200
						</p>
					</div>

					<div class="mb-3 grid grid-cols-1 gap-3 sm:mb-4 sm:grid-cols-2 sm:gap-4">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="location"
								>Location</label
							>
							<input
								type="text"
								bind:value={form.location}
								id="location"
								placeholder="City, Country"
								class="field-input h-10 w-full"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="website"
								>Website</label
							>
							<input
								type="text"
								id="website"
								bind:value={form.website}
								placeholder="yoursite.com"
								class="field-input h-10 w-full"
							/>
						</div>
					</div>

					<div class="mb-5">
						<label class="mb-1.5 block text-xs font-semibold text-foreground" for="field"
							>Field / industry</label
						>
						<input
							type="text"
							id="field"
							bind:value={form.field}
							placeholder="e.g. Education, Health, Technology"
							class="field-input h-10 w-full"
						/>
					</div>

					<div class="flex flex-wrap items-center gap-2.5">
						<button
							type="button"
							disabled={!hasProfileChanged}
							onclick={saveProfile}
							class="flex cursor-pointer items-center gap-2 rounded-full
							       border-none bg-foreground px-5 py-2
							       text-sm font-semibold text-background transition-opacity hover:opacity-85 disabled:bg-border-strong disabled:text-foreground-disabled"
						>
							{#if isProfileSaving}
								<CircleNotch class="animate-spin" />
							{:else}
								Save changes
							{/if}
						</button>
					</div>
				</section>

				<!-- Role -->
				<!-- <section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Your role</h2>
					<p class="mb-4 text-sm text-foreground-muted">How you primarily use IdeaShare.</p>
					<div class="grid grid-cols-2 gap-2 sm:gap-2.5">
						{#each [{ id: 'sharer', icon: 'ti-bulb', label: 'Idea sharer', desc: 'I post raw ideas' }, { id: 'builder', icon: 'ti-hammer', label: 'Builder', desc: 'I build things' }, { id: 'refiner', icon: 'ti-zoom-in', label: 'Refiner', desc: 'I improve ideas' }, { id: 'explorer', icon: 'ti-compass', label: 'Explorer', desc: 'I browse and spark' }] as r (r.id)}
							<button
								type="button"
								onclick={() => (role = r.id)}
								class="flex cursor-pointer items-center gap-2.5 rounded-xl border p-2.5
								       text-left transition-all sm:p-3
								       {role === r.id
									? 'border-accent bg-accent/10'
									: 'border-border bg-background-secondary hover:border-border-strong'}"
							>
								<div
									class="justify-content-center flex h-7 w-7 flex-shrink-0 items-center rounded-lg
								            sm:h-8 sm:w-8
								            {role === r.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground-muted'}
								            flex items-center justify-center"
								>
									<i class="ti {r.icon} text-sm sm:text-base" aria-hidden="true"></i>
								</div>
								<div class="min-w-0">
									<div class="text-sm leading-tight font-medium text-foreground">{r.label}</div>
									<div class="mt-0.5 hidden text-xs text-foreground-muted sm:block">{r.desc}</div>
								</div>
							</button>
						{/each}
					</div>
				</section> -->

				<!-- ════════════════════════ ACCOUNT ════════════════════════ -->
			{:else if activeTab === 'account'}
				<!-- Email -->
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Email address</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Current: <strong class="text-foreground">{email}</strong>
					</p>
					<!-- Stack on mobile, row on sm+ -->
					<div class="flex flex-col gap-2 sm:flex-row sm:gap-3">
						<input
							type="email"
							bind:value={newEmail}
							placeholder="Enter new email address"
							class="field-input h-10 flex-1"
						/>
						<button
							type="button"
							class="h-10 cursor-pointer rounded-lg border-none bg-foreground px-4
							       text-sm font-semibold whitespace-nowrap text-background
							       transition-opacity hover:opacity-85"
						>
							Update email
						</button>
					</div>
				</section>

				<!-- Password -->
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Change password</h2>
					<div class="mb-4 flex flex-col gap-3">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="curr-password"
								>Current password</label
							>
							<div class="relative">
								<input
									type={showCurrent ? 'text' : 'password'}
									bind:value={currentPwd}
									id="curr-password"
									placeholder="••••••••"
									class="field-input h-10 w-full pr-10"
								/>
								<button
									type="button"
									onclick={() => (showCurrent = !showCurrent)}
									aria-label={showCurrent ? 'Hide' : 'Show'}
									class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer
									       border-none bg-transparent p-0 text-foreground-muted
									       transition-colors hover:text-foreground"
								>
									<i class="ti {showCurrent ? 'ti-eye-off' : 'ti-eye'} text-base" aria-hidden="true"
									></i>
								</button>
							</div>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="new-password"
								>New password</label
							>
							<div class="relative">
								<input
									type={showNew ? 'text' : 'password'}
									bind:value={newPwd}
									id="new-password"
									placeholder="Min. 8 characters"
									class="field-input h-10 w-full pr-10"
								/>
								<button
									type="button"
									onclick={() => (showNew = !showNew)}
									aria-label={showNew ? 'Hide' : 'Show'}
									class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer
									       border-none bg-transparent p-0 text-foreground-muted
									       transition-colors hover:text-foreground"
								>
									<i class="ti {showNew ? 'ti-eye-off' : 'ti-eye'} text-base" aria-hidden="true"
									></i>
								</button>
							</div>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground" for="conf-password"
								>Confirm new password</label
							>
							<input
								type="password"
								id="conf-password"
								bind:value={confirmPwd}
								placeholder="Re-enter new password"
								class="field-input h-10 w-full
								       {pwdError ? '!border-destructive focus:!ring-destructive/20' : ''}"
							/>
							{#if pwdError}
								<p class="mt-1 text-xs text-destructive">{pwdError}</p>
							{/if}
						</div>
					</div>
					<button
						type="button"
						onclick={changePassword}
						class="cursor-pointer rounded-full border-none bg-foreground px-5 py-2
						       text-sm font-semibold text-background transition-opacity hover:opacity-85"
					>
						Update password
					</button>
				</section>

				<!-- Connected accounts -->
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Connected accounts
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">Sign in with these providers.</p>
					<div class="flex flex-col">
						{#each [{ name: 'Google', icon: 'ti-brand-google', connected: true }, { name: 'GitHub', icon: 'ti-brand-github', connected: false }, { name: 'LinkedIn', icon: 'ti-brand-linkedin', connected: false }] as p (p.name)}
							<div
								class="flex items-center justify-between border-b
							            border-border-muted py-3 last:border-0"
							>
								<div class="flex items-center gap-3">
									<i class="ti {p.icon} text-xl text-foreground-muted" aria-hidden="true"></i>
									<div>
										<div class="text-sm font-medium text-foreground">{p.name}</div>
										<div class="text-xs text-foreground-muted">
											{p.connected ? 'Connected' : 'Not connected'}
										</div>
									</div>
								</div>
								<button
									type="button"
									class="cursor-pointer rounded-full border px-3 py-1.5 text-xs
									       font-semibold transition-all
									       {p.connected
										? 'border-border bg-transparent text-foreground-muted hover:border-destructive hover:text-destructive'
										: 'border-border bg-background-secondary text-foreground hover:border-border-strong'}"
								>
									{p.connected ? 'Disconnect' : 'Connect'}
								</button>
							</div>
						{/each}
					</div>
				</section>

				<!-- ════════════════════════ NOTIFICATIONS ════════════════════════ -->
			{:else if activeTab === 'notifications'}
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						In-app notifications
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">What shows up in your notifications tab.</p>
					<div class="flex flex-col">
						{#each [{ key: 'sparks', label: 'Sparks', desc: 'When someone sparks your idea' }, { key: 'builders', label: 'Builders', desc: 'When someone wants to build your idea' }, { key: 'refinements', label: 'Refinements', desc: 'Comments and feedback on your ideas' }, { key: 'forks', label: 'Forks', desc: 'When your idea is forked' }, { key: 'followers', label: 'New followers', desc: 'When someone follows you' }, { key: 'challenges', label: 'Challenges', desc: 'New challenges in your topics' }, { key: 'milestones', label: 'Milestones', desc: 'Spark count milestones hit' }, { key: 'digest', label: 'Weekly digest', desc: 'Your weekly summary every Sunday' }] as item (item.key)}
							<div
								class="flex items-center justify-between gap-4
							            border-b border-border-muted py-3.5 last:border-0"
							>
								<div class="min-w-0">
									<div class="text-sm font-medium text-foreground">{item.label}</div>
									<div class="mt-0.5 text-xs leading-snug text-foreground-muted">{item.desc}</div>
								</div>
								<button
									aria-label="notification"
									type="button"
									role="switch"
									aria-checked={notifs[item.key as keyof typeof notifs]}
									onclick={() =>
										(notifs[item.key as keyof typeof notifs] =
											!notifs[item.key as keyof typeof notifs])}
									class="toggle {notifs[item.key as keyof typeof notifs] ? 'toggle--on' : ''}"
								>
									<span
										class="toggle-thumb {notifs[item.key as keyof typeof notifs]
											? 'translate-x-4.5'
											: 'translate-x-0'}"
									></span>
								</button>
							</div>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Email notifications
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">Sent to {email}.</p>
					<div class="flex flex-col">
						{#each [{ key: 'sparks', label: 'Spark milestones', desc: 'When your idea hits 100, 500, 1000 sparks' }, { key: 'builders', label: 'Builder requests', desc: 'When someone wants to build your idea' }, { key: 'digest', label: 'Weekly digest', desc: 'Top ideas in your topics every Sunday' }, { key: 'milestones', label: 'Big milestones', desc: 'When your idea goes viral or gets built' }] as item (item.key)}
							<div
								class="flex items-center justify-between gap-4
							            border-b border-border-muted py-3.5 last:border-0"
							>
								<div class="min-w-0">
									<div class="text-sm font-medium text-foreground">{item.label}</div>
									<div class="mt-0.5 text-xs leading-snug text-foreground-muted">{item.desc}</div>
								</div>
								<button
									type="button"
									role="switch"
									aria-label="email-notifs"
									aria-checked={emailNotifs[item.key as keyof typeof emailNotifs]}
									onclick={() =>
										(emailNotifs[item.key as keyof typeof emailNotifs] =
											!emailNotifs[item.key as keyof typeof emailNotifs])}
									class="toggle {emailNotifs[item.key as keyof typeof emailNotifs]
										? 'toggle--on'
										: ''}"
								>
									<span
										class="toggle-thumb {emailNotifs[item.key as keyof typeof emailNotifs]
											? 'translate-x-[18px]'
											: 'translate-x-0'}"
									></span>
								</button>
							</div>
						{/each}
					</div>
				</section>

				<!-- ════════════════════════ PRIVACY ════════════════════════ -->
			{:else if activeTab === 'privacy'}
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Profile visibility
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Control what others can see on your profile.
					</p>
					<div class="flex flex-col">
						{#each [{ key: 'publicProfile', label: 'Public profile', desc: 'Anyone can view your profile and ideas' }, { key: 'showLocation', label: 'Show location', desc: 'Display your city on your profile' }, { key: 'showSparked', label: 'Show sparked ideas', desc: "Others can see which ideas you've sparked" }, { key: 'allowMessages', label: 'Allow direct messages', desc: 'Builders can message you about your ideas' }, { key: 'showInSearch', label: 'Appear in search', desc: 'Your profile shows up in user search results' }] as item (item.key)}
							<div
								class="flex items-center justify-between gap-4
							            border-b border-border-muted py-3.5 last:border-0"
							>
								<div class="min-w-0">
									<div class="text-sm font-medium text-foreground">{item.label}</div>
									<div class="mt-0.5 text-xs leading-snug text-foreground-muted">{item.desc}</div>
								</div>
								<button
									type="button"
									aria-label="privacy"
									role="switch"
									aria-checked={privacy[item.key as keyof typeof privacy]}
									onclick={() =>
										(privacy[item.key as keyof typeof privacy] =
											!privacy[item.key as keyof typeof privacy])}
									class="toggle {privacy[item.key as keyof typeof privacy] ? 'toggle--on' : ''}"
								>
									<span
										class="toggle-thumb {privacy[item.key as keyof typeof privacy]
											? 'translate-x-[18px]'
											: 'translate-x-0'}"
									></span>
								</button>
							</div>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Idea defaults</h2>
					<p class="mb-4 text-sm text-foreground-muted">Applied to every new idea you post.</p>
					<div class="flex items-center justify-between gap-4 py-1">
						<div class="min-w-0">
							<div class="text-sm font-medium text-foreground">Post anonymously by default</div>
							<div class="mt-0.5 text-xs leading-snug text-foreground-muted">
								Your name is hidden on all new ideas. You can override per post.
							</div>
						</div>
						<button
							type="button"
							aria-label="anonymous"
							role="switch"
							aria-checked={privacy.anonymousDefault}
							onclick={() => (privacy.anonymousDefault = !privacy.anonymousDefault)}
							class="toggle {privacy.anonymousDefault ? 'toggle--on' : ''}"
						>
							<span
								class="toggle-thumb {privacy.anonymousDefault
									? 'translate-x-[18px]'
									: 'translate-x-0'}"
							></span>
						</button>
					</div>
				</section>

				<!-- ════════════════════════ APPEARANCE ════════════════════════ -->
			{:else if activeTab === 'appearance'}
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Theme</h2>
					<p class="mb-4 text-sm text-foreground-muted">Choose how IdeaShare looks for you.</p>
					<div class="grid grid-cols-3 gap-2 sm:gap-3">
						{#each [{ id: 'light', label: 'Light', icon: 'ti-sun' }, { id: 'dark', label: 'Dark', icon: 'ti-moon' }, { id: 'system', label: 'System', icon: 'ti-device-laptop' }] as t (t.id)}
							<button
								type="button"
								onclick={() => setTheme(t.id as 'light' | 'dark' | 'system')}
								class="flex cursor-pointer flex-col items-center gap-2 rounded-xl border p-3
								       transition-all sm:p-4
								       {theme === t.id
									? 'border-accent bg-accent/10'
									: 'border-border bg-background-secondary hover:border-border-strong'}"
							>
								<!-- Mini preview -->
								<div
									class="h-10 w-full overflow-hidden rounded-lg border border-border sm:h-12
								            {t.id === 'dark'
										? 'bg-[#111]'
										: t.id === 'light'
											? 'bg-white'
											: 'bg-gradient-to-r from-white to-[#111]'}"
								>
									<div
										class="h-3 border-b
									            {t.id === 'dark' ? 'border-white/10 bg-[#1a1a1a]' : 'border-border bg-[#f9f9f9]'}"
									></div>
									<div class="flex gap-1 px-2 py-1">
										<div
											class="h-1.5 w-6 rounded-full sm:w-8
										            {t.id === 'dark' ? 'bg-white/20' : 'bg-[#ddd]'}"
										></div>
										<div
											class="h-1.5 w-4 rounded-full sm:w-5
										            {t.id === 'dark' ? 'bg-[#f5c518]/40' : 'bg-[#f5c518]/60'}"
										></div>
									</div>
								</div>
								<div class="flex items-center gap-1">
									<i
										class="ti {t.icon} text-xs sm:text-sm
									          {theme === t.id ? 'text-accent-foreground' : 'text-foreground-muted'}"
										aria-hidden="true"
									></i>
									<span
										class="text-xs font-medium sm:text-sm
									             {theme === t.id ? 'text-foreground' : 'text-foreground-muted'}"
									>
										{t.label}
									</span>
								</div>
							</button>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Language</h2>
					<div>
						<label class="mb-1.5 block text-xs font-semibold text-foreground" for="language"
							>Display language</label
						>
						<select
							bind:value={language}
							class="field-input h-10 w-full cursor-pointer"
							id="language"
						>
							<option value="en">English</option>
							<option value="bn">Bengali (বাংলা)</option>
						</select>
					</div>
				</section>

				<!-- ════════════════════════ DANGER ZONE ════════════════════════ -->
			{:else if activeTab === 'danger'}
				<section class="rounded-xl border border-border bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Export your data
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Download all your ideas, refinements, and account data as a JSON file.
					</p>
					<button
						type="button"
						class="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-background-secondary
						       px-4 py-2 text-sm font-medium
						       text-foreground transition-colors hover:border-border-strong"
					>
						<i class="ti ti-download text-base" aria-hidden="true"></i>
						Export data
					</button>
				</section>

				<section class="rounded-xl border border-destructive/40 bg-card p-4 sm:p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Deactivate account
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Your profile and ideas will be hidden. You can reactivate anytime by signing back in.
					</p>
					<button
						type="button"
						class="flex cursor-pointer items-center gap-2 rounded-lg border border-destructive/40
						       bg-transparent px-4 py-2 text-sm
						       font-medium text-destructive transition-colors hover:bg-destructive/5"
					>
						<i class="ti ti-pause text-base" aria-hidden="true"></i>
						Deactivate account
					</button>
				</section>

				<section class="rounded-xl border-2 border-destructive/50 bg-card p-4 sm:p-5">
					<div class="mb-4 flex items-start gap-3">
						<div
							class="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center
						            justify-center rounded-lg bg-destructive/10"
						>
							<i class="ti ti-alert-triangle text-base text-destructive" aria-hidden="true"></i>
						</div>
						<div>
							<h2 class="font-display text-base font-semibold text-destructive">Delete account</h2>
							<p class="mt-0.5 text-sm text-foreground-muted">
								Permanently deletes your account, all ideas, sparks, and refinements. This cannot be
								undone.
							</p>
						</div>
					</div>

					{#if !showDelete}
						<button
							type="button"
							onclick={() => (showDelete = true)}
							class="flex cursor-pointer items-center gap-2 rounded-lg border-none bg-destructive
							       px-4 py-2 text-sm
							       font-semibold text-destructive-foreground transition-opacity hover:opacity-85"
						>
							<i class="ti ti-trash text-base" aria-hidden="true"></i>
							Delete my account
						</button>
					{:else}
						<div class="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
							<p class="mb-3 text-sm font-medium text-foreground">
								Type <strong class="font-mono text-destructive">delete my account</strong> to confirm.
							</p>
							<input
								type="text"
								bind:value={deleteConfirm}
								placeholder="delete my account"
								class="mb-3 h-10 w-full rounded-lg border border-destructive/40
								       bg-background px-3 text-sm text-foreground
								       transition-all outline-none focus:border-destructive
								       focus:ring-2 focus:ring-destructive/20"
							/>
							<div class="flex flex-wrap gap-2.5">
								<button
									type="button"
									disabled={deleteConfirm !== 'delete my account'}
									class="rounded-lg border-none bg-destructive px-4 py-2 text-sm
									       font-semibold text-destructive-foreground transition-opacity
									       {deleteConfirm !== 'delete my account'
										? 'cursor-not-allowed opacity-40'
										: 'cursor-pointer hover:opacity-85'}"
								>
									Permanently delete
								</button>
								<button
									type="button"
									onclick={() => {
										showDelete = false;
										deleteConfirm = '';
									}}
									class="cursor-pointer rounded-lg border border-border bg-background-secondary px-4 py-2
									       text-sm font-medium text-foreground
									       transition-colors hover:border-border-strong"
								>
									Cancel
								</button>
							</div>
						</div>
					{/if}
				</section>
			{/if}
		</main>
	</div>
</div>

<style>
	/* Shared input style — avoids repeating 8 long Tailwind strings */
	:global(.field-input) {
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
	:global(.field-input:focus) {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent);
	}
	:global(select.field-input) {
		appearance: auto;
	}

	/* Toggle switch */
	:global(.toggle) {
		position: relative;
		display: flex;
		align-items: center;
		width: 40px;
		height: 22px;
		border-radius: 999px;
		border: none;
		cursor: pointer;
		flex-shrink: 0;
		background-color: var(--muted);
		transition: background-color 0.2s;
	}
	:global(.toggle--on) {
		background-color: var(--accent);
	}
	:global(.toggle-thumb) {
		position: absolute;
		top: 3px;
		left: 3px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: white;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
		transition: transform 0.2s;
	}
</style>
