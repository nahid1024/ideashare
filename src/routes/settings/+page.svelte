<!-- src/routes/settings/+page.svelte -->
<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import { setMode } from 'mode-watcher';

	// ── Active tab ─────────────────────────────────────────────
	let activeTab = $state('profile');

	const { data } = $props();

	const tabs = [
		{ id: 'profile', label: 'Profile', icon: 'ti-user' },
		{ id: 'account', label: 'Account', icon: 'ti-shield' },
		{ id: 'notifications', label: 'Notifications', icon: 'ti-bell' },
		{ id: 'privacy', label: 'Privacy', icon: 'ti-lock' },
		{ id: 'appearance', label: 'Appearance', icon: 'ti-palette' }
	];

	// ── Profile state ──────────────────────────────────────────
	let fullName = $state('Rafiq Karim');
	let handle = $state('rafiqkarim');
	let bio = $state(
		"Thinking about the future of education and skills. Sharing ideas so they don't disappear."
	);
	let location = $state('Dhaka, Bangladesh');
	let website = $state('ideashare.io/rafiq');
	let workField = $state('Education');
	let role = $state('sharer');
	let profileSaved = $state(false);

	function saveProfile() {
		profileSaved = true;
		setTimeout(() => (profileSaved = false), 2500);
	}

	// ── Account state ──────────────────────────────────────────
	let email = $state('rafiq@example.com');
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

	// ── Notification toggles ───────────────────────────────────
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

	// ── Privacy toggles ────────────────────────────────────────
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
	<!-- Page header -->
	<div class="border-b border-border bg-card px-6 py-5">
		<div class="mx-auto max-w-4xl">
			<h1 class="font-display text-2xl font-semibold text-foreground">Settings</h1>
			<p class="mt-0.5 text-sm text-foreground-muted">
				Manage your IdeaShare account and preferences.
			</p>
		</div>
	</div>

	<div class="mx-auto flex max-w-4xl items-start gap-6 px-6 py-6">
		<!-- ── Sidebar nav ── -->
		<aside class="sticky top-6 w-48 flex-shrink-0">
			<nav class="overflow-hidden rounded-xl border border-border bg-card">
				{#each tabs as tab (tab)}
					<button
						type="button"
						onclick={() => (activeTab = tab.id)}
						class="flex w-full cursor-pointer items-center gap-2.5 border-none px-3.5
						       py-2.5 text-left text-sm transition-colors
						       {activeTab === tab.id
							? 'border-l-2 border-l-accent bg-accent/10 font-medium text-foreground'
							: 'bg-transparent text-foreground-muted hover:bg-background-secondary hover:text-foreground'}"
					>
						<i class="ti {tab.icon} text-base" aria-hidden="true"></i>
						{tab.label}
					</button>
				{/each}
			</nav>

			<!-- Danger zone link -->
			<button
				type="button"
				onclick={() => {
					activeTab = 'danger';
				}}
				class="mt-2 flex w-full cursor-pointer items-center gap-2.5 rounded-xl
				       border border-none border-border bg-card px-3.5
				       py-2.5 text-left text-sm transition-colors
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
			<!-- ════════════════════════════════════════════
			     PROFILE
			     ════════════════════════════════════════════ -->
			{#if activeTab === 'profile'}
				<!-- Avatar section -->
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Profile picture</h2>
					<div class="flex items-center gap-4">
						<div
							class="flex h-16 w-16 flex-shrink-0 items-center
						            justify-center rounded-full bg-foreground font-display
						            text-xl font-bold text-accent"
						>
							RK
						</div>
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
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Basic info</h2>

					<div class="mb-4 grid grid-cols-2 gap-4">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground"> Full name </label>
							<input
								type="text"
								bind:value={fullName}
								class="h-10 w-full rounded-lg border border-border bg-background-secondary
								       px-3 text-sm text-foreground
								       transition-all outline-none
								       focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground"> Handle </label>
							<div class="relative">
								<span
									class="absolute top-1/2 left-3 -translate-y-1/2
								             text-sm text-foreground-muted select-none">@</span
								>
								<input
									type="text"
									bind:value={handle}
									class="h-10 w-full rounded-lg border border-border bg-background-secondary pr-3
									       pl-7 text-sm text-foreground
									       transition-all outline-none
									       focus:border-accent focus:ring-2 focus:ring-accent/20"
								/>
							</div>
						</div>
					</div>

					<div class="mb-4">
						<label class="mb-1.5 block text-xs font-semibold text-foreground">Bio</label>
						<textarea
							bind:value={bio}
							rows="3"
							class="w-full resize-none rounded-lg border border-border bg-background-secondary
							       px-3 py-2.5 font-body
							       text-sm text-foreground
							       transition-all outline-none focus:border-accent
							       focus:ring-2 focus:ring-accent/20"
							placeholder="Tell the community what you're about..."
						></textarea>
						<p class="mt-1 text-right text-xs text-foreground-muted">{bio.length} / 200</p>
					</div>

					<div class="mb-4 grid grid-cols-2 gap-4">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground">Location</label>
							<input
								type="text"
								bind:value={location}
								placeholder="City, Country"
								class="h-10 w-full rounded-lg border border-border bg-background-secondary
								       px-3 text-sm text-foreground
								       transition-all outline-none
								       focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground">Website</label>
							<input
								type="text"
								bind:value={website}
								placeholder="yoursite.com"
								class="h-10 w-full rounded-lg border border-border bg-background-secondary
								       px-3 text-sm text-foreground
								       transition-all outline-none
								       focus:border-accent focus:ring-2 focus:ring-accent/20"
							/>
						</div>
					</div>

					<div class="mb-5">
						<label class="mb-1.5 block text-xs font-semibold text-foreground"
							>Field / industry</label
						>
						<input
							type="text"
							bind:value={workField}
							placeholder="e.g. Education, Health, Technology"
							class="h-10 w-full rounded-lg border border-border bg-background-secondary
							       px-3 text-sm text-foreground
							       transition-all outline-none
							       focus:border-accent focus:ring-2 focus:ring-accent/20"
						/>
					</div>

					<div class="flex items-center gap-3">
						<button
							type="button"
							onclick={saveProfile}
							class="flex cursor-pointer items-center gap-2 rounded-full border-none
							       bg-foreground px-5 py-2 text-sm
							       font-semibold text-background transition-opacity hover:opacity-85"
						>
							{#if profileSaved}
								<i class="ti ti-check text-base text-accent" aria-hidden="true"></i>
								Saved
							{:else}
								Save changes
							{/if}
						</button>
						<button
							type="button"
							class="cursor-pointer rounded-full border border-border bg-transparent px-4
							       py-2 text-sm font-medium
							       text-foreground-muted transition-all hover:border-border-strong
							       hover:text-foreground"
						>
							Cancel
						</button>
					</div>
				</section>

				<!-- Role -->
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Your role</h2>
					<p class="mb-4 text-sm text-foreground-muted">How you primarily use IdeaShare.</p>

					<div class="grid grid-cols-2 gap-2.5">
						{#each [{ id: 'sharer', icon: 'ti-bulb', label: 'Idea sharer', desc: 'I post raw ideas' }, { id: 'builder', icon: 'ti-hammer', label: 'Builder', desc: 'I want to build things' }, { id: 'refiner', icon: 'ti-zoom-in', label: 'Refiner', desc: 'I improve ideas' }, { id: 'explorer', icon: 'ti-compass', label: 'Explorer', desc: 'I browse and spark' }] as r (r.id)}
							<button
								type="button"
								onclick={() => (role = r.id)}
								class="flex cursor-pointer items-center gap-3 rounded-xl border p-3
								       text-left transition-all
								       {role === r.id
									? 'border-accent bg-accent/10'
									: 'border-border bg-background-secondary hover:border-border-strong'}"
							>
								<div
									class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg
								            {role === r.id ? 'bg-accent text-accent-foreground' : 'bg-muted text-foreground-muted'}"
								>
									<i class="ti {r.icon} text-base" aria-hidden="true"></i>
								</div>
								<div>
									<div class="text-sm font-medium text-foreground">{r.label}</div>
									<div class="text-xs text-foreground-muted">{r.desc}</div>
								</div>
							</button>
						{/each}
					</div>
				</section>

				<!-- ════════════════════════════════════════════
			     ACCOUNT
			     ════════════════════════════════════════════ -->
			{:else if activeTab === 'account'}
				<!-- Email -->
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Email address</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Your current email is <strong class="text-foreground">{email}</strong>.
					</p>
					<div class="flex gap-3">
						<input
							type="email"
							bind:value={newEmail}
							placeholder="Enter new email address"
							class="h-10 flex-1 rounded-lg border border-border bg-background-secondary
							       px-3 text-sm text-foreground
							       transition-all outline-none
							       focus:border-accent focus:ring-2 focus:ring-accent/20"
						/>
						<button
							type="button"
							class="cursor-pointer rounded-lg border-none bg-foreground px-4
							       py-2 text-sm font-semibold whitespace-nowrap
							       text-background transition-opacity hover:opacity-85"
						>
							Update email
						</button>
					</div>
				</section>

				<!-- Password -->
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Change password</h2>

					<div class="mb-4 flex flex-col gap-3">
						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground"
								>Current password</label
							>
							<div class="relative">
								<input
									type={showCurrent ? 'text' : 'password'}
									bind:value={currentPwd}
									placeholder="••••••••"
									class="h-10 w-full rounded-lg border border-border bg-background-secondary px-3
									       pr-10 text-sm text-foreground
									       transition-all outline-none
									       focus:border-accent focus:ring-2 focus:ring-accent/20"
								/>
								<button
									type="button"
									onclick={() => (showCurrent = !showCurrent)}
									class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer
									       border-none bg-transparent p-0 text-foreground-muted
									       transition-colors hover:text-foreground"
									aria-label={showCurrent ? 'Hide password' : 'Show password'}
								>
									<i class="ti {showCurrent ? 'ti-eye-off' : 'ti-eye'} text-base" aria-hidden="true"
									></i>
								</button>
							</div>
						</div>

						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground">New password</label>
							<div class="relative">
								<input
									type={showNew ? 'text' : 'password'}
									bind:value={newPwd}
									placeholder="Min. 8 characters"
									class="h-10 w-full rounded-lg border border-border bg-background-secondary px-3
									       pr-10 text-sm text-foreground
									       transition-all outline-none
									       focus:border-accent focus:ring-2 focus:ring-accent/20"
								/>
								<button
									type="button"
									onclick={() => (showNew = !showNew)}
									class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer
									       border-none bg-transparent p-0 text-foreground-muted
									       transition-colors hover:text-foreground"
									aria-label={showNew ? 'Hide password' : 'Show password'}
								>
									<i class="ti {showNew ? 'ti-eye-off' : 'ti-eye'} text-base" aria-hidden="true"
									></i>
								</button>
							</div>
						</div>

						<div>
							<label class="mb-1.5 block text-xs font-semibold text-foreground"
								>Confirm new password</label
							>
							<input
								type="password"
								bind:value={confirmPwd}
								placeholder="Re-enter new password"
								class="h-10 w-full rounded-lg border bg-background-secondary px-3 text-sm
								       text-foreground transition-all outline-none
								       {pwdError
									? 'border-destructive focus:ring-destructive/20'
									: 'border-border focus:border-accent focus:ring-accent/20'}
								       focus:ring-2"
							/>
							{#if pwdError}
								<p class="mt-1 text-xs text-destructive">{pwdError}</p>
							{/if}
						</div>
					</div>

					<button
						type="button"
						onclick={changePassword}
						class="cursor-pointer rounded-full border-none bg-foreground px-5
						       py-2 text-sm font-semibold text-background
						       transition-opacity hover:opacity-85"
					>
						Update password
					</button>
				</section>

				<!-- Connected accounts -->
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Connected accounts
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">Sign in with these providers.</p>

					<div class="flex flex-col gap-2">
						{#each [{ name: 'Google', icon: 'ti-brand-google', connected: true }, { name: 'GitHub', icon: 'ti-brand-github', connected: false }, { name: 'LinkedIn', icon: 'ti-brand-linkedin', connected: false }] as provider (provider.name)}
							<div
								class="flex items-center justify-between border-b border-border-muted py-3 last:border-0"
							>
								<div class="flex items-center gap-3">
									<i class="ti {provider.icon} text-xl text-foreground-muted" aria-hidden="true"
									></i>
									<div>
										<div class="text-sm font-medium text-foreground">{provider.name}</div>
										<div class="text-xs text-foreground-muted">
											{provider.connected ? 'Connected' : 'Not connected'}
										</div>
									</div>
								</div>
								<button
									type="button"
									class="cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold
									       transition-all
									       {provider.connected
										? 'border-border bg-transparent text-foreground-muted hover:border-destructive hover:text-destructive'
										: 'border-border bg-background-secondary text-foreground hover:border-border-strong'}"
								>
									{provider.connected ? 'Disconnect' : 'Connect'}
								</button>
							</div>
						{/each}
					</div>
				</section>

				<!-- ════════════════════════════════════════════
			     NOTIFICATIONS
			     ════════════════════════════════════════════ -->
			{:else if activeTab === 'notifications'}
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						In-app notifications
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">What shows up in your notifications tab.</p>

					<div class="flex flex-col gap-0">
						{#each [{ key: 'sparks', label: 'Sparks', desc: 'When someone sparks your idea' }, { key: 'builders', label: 'Builders', desc: 'When someone wants to build your idea' }, { key: 'refinements', label: 'Refinements', desc: 'Comments and feedback on your ideas' }, { key: 'forks', label: 'Forks', desc: 'When your idea is forked' }, { key: 'followers', label: 'New followers', desc: 'When someone follows you' }, { key: 'challenges', label: 'Challenges', desc: 'New challenges in your topics' }, { key: 'milestones', label: 'Milestones', desc: 'Spark count milestones hit' }, { key: 'digest', label: 'Weekly digest', desc: 'Your weekly summary every Sunday' }] as item (item.key)}
							<div
								class="flex items-center justify-between border-b border-border-muted py-3.5 last:border-0"
							>
								<div>
									<div class="text-sm font-medium text-foreground">{item.label}</div>
									<div class="mt-0.5 text-xs text-foreground-muted">{item.desc}</div>
								</div>
								<!-- Toggle -->
								<button
									type="button"
									role="switch"
									aria-checked={notifs[item.key as keyof typeof notifs]}
									onclick={() =>
										(notifs[item.key as keyof typeof notifs] =
											!notifs[item.key as keyof typeof notifs])}
									class="relative h-[22px] w-10 flex-shrink-0 cursor-pointer rounded-full
									       border-none transition-colors duration-200
									       {notifs[item.key as keyof typeof notifs] ? 'bg-accent' : 'bg-muted'}"
								>
									<span
										class="absolute top-[3px] h-4 w-4 rounded-full bg-white
										       shadow-sm transition-all duration-200
										       {notifs[item.key as keyof typeof notifs] ? 'left-[22px]' : 'left-[3px]'}"
									></span>
								</button>
							</div>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Email notifications
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">Sent to {email}.</p>

					<div class="flex flex-col gap-0">
						{#each [{ key: 'sparks', label: 'Spark milestones', desc: 'When your idea hits 100, 500, 1000 sparks' }, { key: 'builders', label: 'Builder requests', desc: 'When someone wants to build your idea' }, { key: 'digest', label: 'Weekly digest', desc: 'Top ideas in your topics every Sunday' }, { key: 'milestones', label: 'Big milestones', desc: 'When your idea goes viral or gets built' }] as item (item.key)}
							<div
								class="flex items-center justify-between border-b border-border-muted py-3.5 last:border-0"
							>
								<div>
									<div class="text-sm font-medium text-foreground">{item.label}</div>
									<div class="mt-0.5 text-xs text-foreground-muted">{item.desc}</div>
								</div>
								<button
									type="button"
									role="switch"
									aria-checked={emailNotifs[item.key as keyof typeof emailNotifs]}
									onclick={() =>
										(emailNotifs[item.key as keyof typeof emailNotifs] =
											!emailNotifs[item.key as keyof typeof emailNotifs])}
									class="relative h-[22px] w-10 flex-shrink-0 cursor-pointer rounded-full
									       border-none transition-colors duration-200
									       {emailNotifs[item.key as keyof typeof emailNotifs] ? 'bg-accent' : 'bg-muted'}"
								>
									<span
										class="absolute top-[3px] h-4 w-4 rounded-full bg-white
										       shadow-sm transition-all duration-200
										       {emailNotifs[item.key as keyof typeof emailNotifs] ? 'left-[22px]' : 'left-[3px]'}"
									></span>
								</button>
							</div>
						{/each}
					</div>
				</section>

				<!-- ════════════════════════════════════════════
			     PRIVACY
			     ════════════════════════════════════════════ -->
			{:else if activeTab === 'privacy'}
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Profile visibility
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Control what others can see on your profile.
					</p>

					<div class="flex flex-col gap-0">
						{#each [{ key: 'publicProfile', label: 'Public profile', desc: 'Anyone can view your profile and ideas' }, { key: 'showLocation', label: 'Show location', desc: 'Display your city on your profile' }, { key: 'showSparked', label: 'Show sparked ideas', desc: "Others can see which ideas you've sparked" }, { key: 'allowMessages', label: 'Allow direct messages', desc: 'Builders can message you about your ideas' }, { key: 'showInSearch', label: 'Appear in search', desc: 'Your profile shows up in user search results' }] as item (item.key)}
							<div
								class="flex items-center justify-between border-b border-border-muted py-3.5 last:border-0"
							>
								<div>
									<div class="text-sm font-medium text-foreground">{item.label}</div>
									<div class="mt-0.5 text-xs text-foreground-muted">{item.desc}</div>
								</div>
								<button
									type="button"
									role="switch"
									aria-checked={privacy[item.key as keyof typeof privacy]}
									onclick={() =>
										(privacy[item.key as keyof typeof privacy] =
											!privacy[item.key as keyof typeof privacy])}
									class="relative h-[22px] w-10 flex-shrink-0 cursor-pointer rounded-full
									       border-none transition-colors duration-200
									       {privacy[item.key as keyof typeof privacy] ? 'bg-accent' : 'bg-muted'}"
								>
									<span
										class="absolute top-[3px] h-4 w-4 rounded-full bg-white
										       shadow-sm transition-all duration-200
										       {privacy[item.key as keyof typeof privacy] ? 'left-[22px]' : 'left-[3px]'}"
									></span>
								</button>
							</div>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Idea defaults</h2>
					<p class="mb-4 text-sm text-foreground-muted">Applied to every new idea you post.</p>

					<div class="flex items-center justify-between py-3">
						<div>
							<div class="text-sm font-medium text-foreground">Post anonymously by default</div>
							<div class="mt-0.5 text-xs text-foreground-muted">
								Your name is hidden on all new ideas. You can override per post.
							</div>
						</div>
						<button
							type="button"
							role="switch"
							aria-checked={privacy.anonymousDefault}
							onclick={() => (privacy.anonymousDefault = !privacy.anonymousDefault)}
							class="relative h-[22px] w-10 flex-shrink-0 cursor-pointer rounded-full
							       border-none transition-colors duration-200
							       {privacy.anonymousDefault ? 'bg-accent' : 'bg-muted'}"
						>
							<span
								class="absolute top-[3px] h-4 w-4 rounded-full bg-white
								       shadow-sm transition-all duration-200
								       {privacy.anonymousDefault ? 'left-[22px]' : 'left-[3px]'}"
							></span>
						</button>
					</div>
				</section>

				<!-- ════════════════════════════════════════════
			     APPEARANCE
			     ════════════════════════════════════════════ -->
			{:else if activeTab === 'appearance'}
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">Theme</h2>
					<p class="mb-4 text-sm text-foreground-muted">Choose how IdeaShare looks for you.</p>

					<div class="grid grid-cols-3 gap-3">
						{#each [{ id: 'light', label: 'Light', icon: 'ti-sun' }, { id: 'dark', label: 'Dark', icon: 'ti-moon' }, { id: 'system', label: 'System', icon: 'ti-device-laptop' }] as t (t.id)}
							<button
								type="button"
								onclick={() => setTheme(t.id as 'light' | 'dark' | 'system')}
								class="flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border
								       p-4 transition-all
								       {theme === t.id
									? 'border-accent bg-accent/10'
									: 'border-border bg-background-secondary hover:border-border-strong'}"
							>
								<!-- Mini preview -->
								<div
									class="h-12 w-full overflow-hidden rounded-lg border border-border
								            {t.id === 'dark'
										? 'bg-[#111]'
										: t.id === 'light'
											? 'bg-white'
											: 'bg-gradient-to-r from-white to-[#111]'}"
								>
									<div
										class="h-3 border-b {t.id === 'dark'
											? 'border-white/10 bg-[#1a1a1a]'
											: 'border-border bg-[#f9f9f9]'}"
									></div>
									<div class="flex gap-1 px-2 py-1.5">
										<div
											class="h-1.5 w-8 rounded-full {t.id === 'dark' ? 'bg-white/20' : 'bg-[#ddd]'}"
										></div>
										<div
											class="h-1.5 w-5 rounded-full {t.id === 'dark'
												? 'bg-[#f5c518]/40'
												: 'bg-[#f5c518]/60'}"
										></div>
									</div>
								</div>
								<div class="flex items-center gap-1.5">
									<i
										class="ti {t.icon} text-sm
									          {theme === t.id ? 'text-accent-foreground' : 'text-foreground-muted'}"
										aria-hidden="true"
									></i>
									<span
										class="text-sm font-medium
									             {theme === t.id ? 'text-foreground' : 'text-foreground-muted'}"
									>
										{t.label}
									</span>
								</div>
							</button>
						{/each}
					</div>
				</section>

				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-4 font-display text-base font-semibold text-foreground">Language</h2>
					<div>
						<label class="mb-1.5 block text-xs font-semibold text-foreground"
							>Display language</label
						>
						<select
							bind:value={language}
							class="h-10 w-full cursor-pointer rounded-lg border border-border
							       bg-background-secondary px-3 text-sm
							       text-foreground transition-all
							       outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
						>
							<option value="en">English</option>
							<option value="bn">Bengali</option>
							<option value="de">Deutsch</option>
							<option value="fr">Français</option>
							<option value="es">Español</option>
							<option value="pt">Português</option>
						</select>
					</div>
				</section>

				<!-- ════════════════════════════════════════════
			     DANGER ZONE
			     ════════════════════════════════════════════ -->
			{:else if activeTab === 'danger'}
				<section class="rounded-xl border border-border bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Export your data
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Download a copy of all your ideas, refinements, and account data as a JSON file.
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

				<section class="rounded-xl border border-destructive/40 bg-card p-5">
					<h2 class="mb-1 font-display text-base font-semibold text-foreground">
						Deactivate account
					</h2>
					<p class="mb-4 text-sm text-foreground-muted">
						Your profile and ideas will be hidden. You can reactivate at any time by signing back
						in.
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

				<section class="rounded-xl border-2 border-destructive/50 bg-card p-5">
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
								This permanently deletes your account, all your ideas, sparks, and refinements. This
								action cannot be undone.
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
								       bg-background px-3 text-sm
								       text-foreground transition-all
								       outline-none focus:border-destructive focus:ring-2 focus:ring-destructive/20"
							/>
							<div class="flex gap-2.5">
								<button
									type="button"
									disabled={deleteConfirm !== 'delete my account'}
									class="cursor-pointer rounded-lg border-none bg-destructive px-4 py-2
									       text-sm font-semibold text-destructive-foreground
									       transition-opacity
									       {deleteConfirm !== 'delete my account'
										? 'cursor-not-allowed opacity-40'
										: 'hover:opacity-85'}"
								>
									Permanently delete
								</button>
								<button
									type="button"
									onclick={() => {
										showDelete = false;
										deleteConfirm = '';
									}}
									class="cursor-pointer rounded-lg border border-border bg-background-secondary px-4
									       py-2 text-sm font-medium
									       text-foreground transition-colors hover:border-border-strong"
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
