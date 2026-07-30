<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	import type { ActionData } from '../login/$types';
	import CircleNotchIcon from 'phosphor-svelte/lib/CircleNotchIcon';
	let password = $state('');
	let loading = $state(false);
	let { form }: { form: ActionData } = $props();
</script>

<div
	class="fixed inset-0 flex h-screen w-screen overflow-hidden bg-primary font-body text-foreground-inverted select-none"
>
	<!-- Left Panel -->
	<div
		class="left relative flex w-[52%] flex-col overflow-hidden bg-dark p-9 px-10 before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(circle,rgba(245,197,24,0.12)_1px,transparent_1px)] before:bg-size-[28px_28px] before:content-[''] after:pointer-events-none after:absolute after:-top-25 after:-left-25 after:h-125 after:w-125 after:animate-pulse-slow after:rounded-full after:bg-[radial-gradient(circle,rgba(245,197,24,0.18)_0%,transparent_70%)] after:content-[''] max-[860px]:w-[44%] max-[860px]:p-7 max-[860px]:px-6 max-[640px]:hidden"
	>
		<!-- Logo -->
		<div class="relative z-2 mb-12 flex items-center gap-2.25">
			<img src="/logo.svg" alt="logo" class="h-6 w-6" />
			<span class="font-display text-lg font-bold tracking-[-0.3px] text-light"
				>Idea<span class="text-accent">Share</span></span
			>
		</div>

		<!-- Headline -->
		<div class="left-headline relative z-2 mb-10">
			<h2
				class="font-display text-[36px] leading-[1.2] font-extrabold tracking-[-0.8px] text-light max-[860px]:text-[28px]"
			>
				Where good ideas<br />find
				<em
					class="headline-em relative text-accent not-italic after:absolute after:right-0 after:-bottom-0.5 after:left-0 after:h-0.75 after:rounded-[2px] after:bg-accent after:opacity-40 after:content-['']"
					>their people</em
				>
			</h2>
			<p class="mt-3 max-w-85 text-sm leading-[1.65] text-light/50">
				A place to drop the thought before it disappears. Share it, refine it, build it — together.
			</p>
		</div>

		<!-- Floating idea cards -->
		<div class="relative z-2 flex-1 overflow-hidden">
			<div
				class="absolute left-0 w-75 animate-float-up rounded-[14px] border border-foreground-inverted/20 bg-[#1c1c1c] p-[14px_16px] opacity-0"
				style="animation-duration: 14s; animation-delay: 0s;"
			>
				<div
					class="mb-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent"
				>
					#education
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-light">
					A universal exam that certifies your skills — no university required
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-accent-foreground"
					>
						RK
					</div>
					<div class="text-[11px] text-light/40">Rafiq K.</div>
					<div class="ml-auto text-[11px] font-semibold text-accent">⚡ 847</div>
				</div>
			</div>

			<div
				class="absolute left-12.5 w-75 animate-float-up rounded-[14px] border border-foreground-inverted/20 bg-[#1c1c1c] p-[14px_16px] opacity-0"
				style="animation-duration: 18s; animation-delay: -6s;"
			>
				<div
					class="mb-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent"
				>
					#health
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-light">
					Let patients own their medical records — shared with any doctor, anywhere
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full bg-success text-[9px] font-bold text-dark"
					>
						TA
					</div>
					<div class="text-[11px] text-light/40">Tolu A.</div>
					<div class="ml-auto text-[11px] font-semibold text-accent">⚡ 512</div>
				</div>
			</div>

			<div
				class="absolute left-5 w-75 animate-float-up rounded-[14px] border border-foreground-inverted/20 bg-[#1c1c1c] p-[14px_16px] opacity-0"
				style="animation-duration: 16s; animation-delay: -11s;"
			>
				<div
					class="mb-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent"
				>
					#cities
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-light">
					Neighbourhoods vote on which small businesses get rent subsidies each quarter
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[9px] font-bold text-brand-foreground"
					>
						LM
					</div>
					<div class="text-[11px] text-light/40">Lena M.</div>
					<div class="ml-auto text-[11px] font-semibold text-accent">⚡ 389</div>
				</div>
			</div>

			<div
				class="absolute left-15 w-75 animate-float-up rounded-[14px] border border-foreground-inverted/20 bg-[#1c1c1c] p-[14px_16px] opacity-0"
				style="animation-duration: 20s; animation-delay: -3s;"
			>
				<div
					class="mb-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent"
				>
					#economy
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-light">
					A global skills passport replacing the traditional CV once and for all
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full bg-warning text-[9px] font-bold text-warning-foreground"
					>
						NI
					</div>
					<div class="text-[11px] text-light/40">Nadia I.</div>
					<div class="ml-auto text-[11px] font-semibold text-accent">⚡ 271</div>
				</div>
			</div>

			<div
				class="absolute left-2.5 w-75 animate-float-up rounded-[14px] border border-foreground-inverted/20 bg-[#1c1c1c] p-[14px_16px] opacity-0"
				style="animation-duration: 15s; animation-delay: -9s;"
			>
				<div
					class="mb-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent"
				>
					#technology
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-light">
					Open-source AI trained only on public domain works — no copyright risk
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground"
					>
						PO
					</div>
					<div class="text-[11px] text-light/40">Paulo O.</div>
					<div class="ml-auto text-[11px] font-semibold text-accent">⚡ 634</div>
				</div>
			</div>
		</div>

		<!-- Bottom stats -->
		<div class="relative z-2 mt-6 flex gap-7 border-t border-foreground-inverted/10 pt-5">
			<div>
				<div class="font-display text-[22px] font-extrabold tracking-[-0.5px] text-accent">
					24k+
				</div>
				<div class="mt-0.5 text-[11px] text-light/40">Ideas shared</div>
			</div>
			<div>
				<div class="font-display text-[22px] font-extrabold tracking-[-0.5px] text-accent">
					8.3k
				</div>
				<div class="mt-0.5 text-[11px] text-light/40">Being built</div>
			</div>
			<div>
				<div class="font-display text-[22px] font-extrabold tracking-[-0.5px] text-accent">142</div>
				<div class="mt-0.5 text-[11px] text-light/40">Countries</div>
			</div>
		</div>
	</div>

	<div
		class="right relative flex w-[48%] flex-col justify-center overflow-y-auto bg-background px-13 py-12 max-md:w-[56%] max-md:p-9 max-sm:min-h-screen max-sm:w-full max-sm:justify-start max-sm:p-5 max-sm:pb-10"
		id="right-panel"
	>
		<div class="screen visible block animate-fade-in">
			<div
				class="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-warning-border bg-warning-background px-3 py-1 text-[11px] font-bold tracking-widest text-warning-foreground uppercase"
			>
				Welcome back
			</div>
			<h1
				class="screen-title mb-1.5 font-display text-[28px] leading-[1.2] font-extrabold tracking-[-0.5px] text-foreground max-sm:text-2xl"
			>
				Sign in to IdeaShare
			</h1>
			<p class="mb-6 text-[13px] leading-relaxed text-foreground-muted">
				Don't have an account?
				<a
					href={resolve('/auth/signup')}
					class="font-semibold text-foreground no-underline hover:underline">Create one free →</a
				>
			</p>

			<div class="social-btns mb-5 flex flex-col gap-2.5 max-sm:mb-3.5 max-sm:gap-2">
				<button
					class="social-btn flex h-11.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border-[1.5px] border-border bg-background font-body text-[13.5px] font-medium text-foreground transition-all duration-150 hover:border-border-strong hover:shadow-sm max-sm:h-11 max-sm:text-xs"
				>
					<svg class="h-4.5 w-4.5" viewBox="0 0 24 24"
						><path
							d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
							fill="#4285F4"
						/><path
							d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
							fill="#34A853"
						/><path
							d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
							fill="#FBBC05"
						/><path
							d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
							fill="#EA4335"
						/></svg
					>
					Continue with Google
				</button>
				<form method="post" action="?/signInSocial" use:enhance>
					<input type="hidden" name="provider" value="github" />
					<input type="hidden" name="callbackURL" value="/" />
					<button
						class="social-btn flex h-11.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border-[1.5px] border-border bg-background font-body text-[13.5px] font-medium text-foreground transition-all duration-150 hover:border-border-strong hover:shadow-sm max-sm:h-11 max-sm:text-xs"
					>
						<svg
							class="h-4.5 w-4.5"
							fill="currentColor"
							viewBox="0 -0.5 25 25"
							xmlns="http://www.w3.org/2000/svg"
							><path
								d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"
							></path></svg
						>
						Continue with Github
					</button>
				</form>
			</div>

			<form
				method="post"
				action="?/signInEmail"
				use:enhance={() => {
					loading = true;
					return async ({ update }) => {
						await update();
						loading = false;
					};
				}}
			>
				<div
					class="divider my-4.5 flex items-center gap-3 text-xs text-foreground-muted before:h-px before:flex-1 before:bg-border after:h-px after:flex-1 after:bg-border"
				>
					or sign in with email
				</div>
				<div class="field mb-4">
					<label for="email" class="field-label mb-1.5 block text-xs font-semibold text-foreground"
						>Email address</label
					>
					<input
						type="email"
						class="field-input h-11.5 w-full rounded-md border-[1.5px] border-border bg-background-muted px-3.5 font-body text-sm text-foreground transition-all duration-150 placeholder:text-foreground-disabled focus:border-accent focus:bg-background focus:ring-3 focus:ring-yellow-100 focus:outline-hidden max-sm:h-11"
						placeholder="you@example.com"
						id="email"
						name="email"
					/>
					{#if form?.code === 'INVALID_EMAIL_OR_PASSWORD'}
						<p class="pwd-hint mt-1 text-[11px] text-red-400">
							{form.message}
						</p>
					{/if}
				</div>
				<div class="field mb-4">
					<div class="mb-1.5 flex items-center justify-between">
						<label class="text-[12px] font-semibold text-foreground" for="password">Password</label>
						<a
							href={resolve('/')}
							class="text-[12px] font-medium text-warning-foreground no-underline hover:underline"
							>Forgot password?</a
						>
					</div>
					<input
						type="password"
						class="field-input h-11.5 w-full rounded-md border-[1.5px] border-border bg-background-muted px-3.5 font-body text-sm text-foreground transition-all duration-150 placeholder:text-foreground-disabled focus:border-accent focus:bg-background focus:ring-3 focus:ring-yellow-100 focus:outline-hidden max-sm:h-11"
						placeholder="Min. 8 characters"
						bind:value={password}
						id="password"
						name="password"
					/>
				</div>
				<div class="mb-5 flex items-center justify-between">
					<label
						class="flex cursor-pointer items-center gap-2 text-[12.5px] text-foreground-secondary"
					>
						<input
							type="checkbox"
							checked
							class="h-3.5 w-3.5 cursor-pointer rounded accent-accent"
						/>
						Keep me signed in
					</label>
				</div>
				<button
					disabled={loading}
					class="btn-next max-sm:text-span mb-3.5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-none bg-primary font-body text-sm font-semibold text-foreground-inverted transition-all duration-150 hover:opacity-85 active:scale-99 max-sm:h-12"
				>
					{#if loading}
						<CircleNotchIcon size="25px" class="animate-spin" />
					{:else}
						Sign in to IdeaShare
					{/if}
				</button>
			</form>
			<div class="text-center text-[13px] text-foreground-muted">
				New here?
				<a
					href={resolve('/auth/signup')}
					class="font-semibold text-foreground no-underline hover:underline"
					>Create a free account</a
				>
			</div>

			<div class="mt-6 text-center text-[11px] leading-relaxed text-foreground-muted">
				By signing in you agree to our
				<a href={resolve('/')} class="text-foreground no-underline hover:underline"
					>Terms of Service</a
				>
				and
				<a href={resolve('/')} class="text-foreground no-underline hover:underline"
					>Privacy Policy</a
				>
			</div>
		</div>
	</div>
</div>
