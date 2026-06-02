<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	// 1. Create a reactive state for the password input
	let password = $state('');
	let loading = $state(false);
</script>

<div
	class="fixed inset-0 flex h-screen w-screen overflow-hidden bg-ink font-body text-white select-none"
>
	<!-- LEFT PANEL -->
	<div class="left relative flex w-[52%] flex-col overflow-hidden bg-ink p-9 px-10">
		<!-- Logo -->
		<div class="relative z-2 mb-12 flex items-center gap-2.25">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="30" height="30">
				<path
					d="M50 8 C32 8 19 21 19 38 C19 50 26 60 37 66 C38.5 67 39 68.5 39 70 L39 78 C39 80.2 40.8 82 43 82 L57 82 C59.2 82 61 80.2 61 78 L61 70 C61 68.5 61.5 67 63 66 C74 60 81 50 81 38 C81 21 68 8 50 8Z"
					fill="#F5C518"
				/>
				<ellipse
					cx="38"
					cy="26"
					rx="7"
					ry="10"
					fill="#FFF8DC"
					opacity="0.7"
					transform="rotate(-20 38 26)"
				/>
				<rect x="39" y="83" width="22" height="5" rx="2.5" fill="#C49A00" />
				<rect x="40.5" y="90" width="19" height="5" rx="2.5" fill="#C49A00" opacity="0.7" />
				<path d="M54 22 L44 46 L51 46 L46 68 L62 40 L54 40 Z" fill="#111111" />
			</svg>
			<span class="font-display text-lg font-bold tracking-[-0.3px] text-white"
				>Idea<span class="text-yellow">Share</span></span
			>
		</div>

		<!-- Headline -->
		<div class="left-headline relative z-2 mb-10">
			<h2
				class="font-display text-[36px] leading-[1.2] font-extrabold tracking-[-0.8px] text-white"
			>
				Where good ideas<br />find
				<em class="headline-em relative text-yellow not-italic">their people</em>
			</h2>
			<p class="mt-3 max-w-85 text-sm leading-[1.65] text-white/50">
				A place to drop the thought before it disappears. Share it, refine it, build it — together.
			</p>
		</div>

		<!-- Floating idea cards -->
		<div class="relative z-2 flex-1 overflow-hidden">
			<div
				class="idea-float absolute w-75 rounded-[14px] border border-white/8 bg-ink-soft p-[14px_16px]"
			>
				<div
					class="mb-2 inline-block rounded-full bg-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-yellow"
				>
					#education
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-white">
					A universal exam that certifies your skills — no university required
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
						style="background:#F5C518;color:#111"
					>
						RK
					</div>
					<div class="text-[11px] text-white/40">Rafiq K.</div>
					<div class="ml-auto text-[11px] font-semibold text-yellow">⚡ 847</div>
				</div>
			</div>

			<div
				class="idea-float absolute w-75 rounded-[14px] border border-white/8 bg-ink-soft p-[14px_16px]"
			>
				<div
					class="mb-2 inline-block rounded-full bg-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-yellow"
				>
					#health
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-white">
					Let patients own their medical records — shared with any doctor, anywhere
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
						style="background:#22C55E;color:#fff"
					>
						TA
					</div>
					<div class="text-[11px] text-white/40">Tolu A.</div>
					<div class="ml-auto text-[11px] font-semibold text-yellow">⚡ 512</div>
				</div>
			</div>

			<div
				class="idea-float absolute w-75 rounded-[14px] border border-white/8 bg-ink-soft p-[14px_16px]"
			>
				<div
					class="mb-2 inline-block rounded-full bg-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-yellow"
				>
					#cities
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-white">
					Neighbourhoods vote on which small businesses get rent subsidies each quarter
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
						style="background:#6366F1;color:#fff"
					>
						LM
					</div>
					<div class="text-[11px] text-white/40">Lena M.</div>
					<div class="ml-auto text-[11px] font-semibold text-yellow">⚡ 389</div>
				</div>
			</div>

			<div
				class="idea-float absolute w-75 rounded-[14px] border border-white/8 bg-ink-soft p-[14px_16px]"
			>
				<div
					class="mb-2 inline-block rounded-full bg-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-yellow"
				>
					#economy
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-white">
					A global skills passport replacing the traditional CV once and for all
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
						style="background:#F97316;color:#fff"
					>
						NI
					</div>
					<div class="text-[11px] text-white/40">Nadia I.</div>
					<div class="ml-auto text-[11px] font-semibold text-yellow">⚡ 271</div>
				</div>
			</div>

			<div
				class="idea-float absolute w-75 rounded-[14px] border border-white/8 bg-ink-soft p-[14px_16px]"
			>
				<div
					class="mb-2 inline-block rounded-full bg-yellow/15 px-2 py-0.5 text-[10px] font-semibold text-yellow"
				>
					#technology
				</div>
				<div class="mb-2.5 font-display text-[13px] leading-[1.45] font-semibold text-white">
					Open-source AI trained only on public domain works — no copyright risk
				</div>
				<div class="flex items-center gap-2">
					<div
						class="flex h-5 w-5 items-center justify-center rounded-full text-[9px] font-bold"
						style="background:#EC4899;color:#fff"
					>
						PO
					</div>
					<div class="text-[11px] text-white/40">Paulo O.</div>
					<div class="ml-auto text-[11px] font-semibold text-yellow">⚡ 634</div>
				</div>
			</div>
		</div>

		<!-- Bottom stats -->
		<div class="relative z-2 mt-6 flex gap-7 border-t border-white/[0.07] pt-5">
			<div>
				<div class="font-display text-[22px] font-extrabold tracking-[-0.5px] text-yellow">
					24k+
				</div>
				<div class="mt-0.5 text-[11px] text-white/40">Ideas shared</div>
			</div>
			<div>
				<div class="font-display text-[22px] font-extrabold tracking-[-0.5px] text-yellow">
					8.3k
				</div>
				<div class="mt-0.5 text-[11px] text-white/40">Being built</div>
			</div>
			<div>
				<div class="font-display text-[22px] font-extrabold tracking-[-0.5px] text-yellow">142</div>
				<div class="mt-0.5 text-[11px] text-white/40">Countries</div>
			</div>
		</div>
	</div>

	<!-- RIGHT PANEL -->
	<div
		class="right relative flex w-[48%] flex-col justify-center overflow-y-auto bg-white px-13 py-12"
		id="right-panel"
	>
		<div class="screen visible">
			<!-- Eyebrow -->
			<div
				class="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-yellow-mid bg-yellow-light px-3 py-1 text-[11px] font-bold tracking-widest text-yellow-dark uppercase"
			>
				Welcome back
			</div>
			<h1
				class="screen-title mb-1.5 font-display text-[28px] leading-[1.2] font-extrabold tracking-[-0.5px] text-ink"
			>
				Sign in to IdeaShare
			</h1>
			<p class="mb-6 text-[13px] leading-relaxed text-gray-mid">
				Don't have an account?
				<a
					href={resolve('/auth/signup')}
					class="font-semibold text-black no-underline hover:underline">Create one free →</a
				>
			</p>

			<div class="social-btns mb-5 flex flex-col gap-2.5">
				<button
					class="social-btn flex h-11.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border-[1.5px] border-gray-light bg-white font-body text-[13.5px] font-medium text-ink transition-[border-color,box-shadow] duration-150"
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
					<input type="hidden" name="callbackURL" value="/auth" />
					<button
						class="social-btn flex h-11.5 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border-[1.5px] border-gray-light bg-white font-body text-[13.5px] font-medium text-ink transition-[border-color,box-shadow] duration-150"
					>
						<svg
							class="h-4.5 w-4.5"
							fill="#000000"
							viewBox="0 -0.5 25 25"
							xmlns="http://www.w3.org/2000/svg"
							><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g
								id="SVGRepo_tracerCarrier"
								stroke-linecap="round"
								stroke-linejoin="round"
							></g><g id="SVGRepo_iconCarrier"
								><path
									d="m12.301 0h.093c2.242 0 4.34.613 6.137 1.68l-.055-.031c1.871 1.094 3.386 2.609 4.449 4.422l.031.058c1.04 1.769 1.654 3.896 1.654 6.166 0 5.406-3.483 10-8.327 11.658l-.087.026c-.063.02-.135.031-.209.031-.162 0-.312-.054-.433-.144l.002.001c-.128-.115-.208-.281-.208-.466 0-.005 0-.01 0-.014v.001q0-.048.008-1.226t.008-2.154c.007-.075.011-.161.011-.249 0-.792-.323-1.508-.844-2.025.618-.061 1.176-.163 1.718-.305l-.076.017c.573-.16 1.073-.373 1.537-.642l-.031.017c.508-.28.938-.636 1.292-1.058l.006-.007c.372-.476.663-1.036.84-1.645l.009-.035c.209-.683.329-1.468.329-2.281 0-.045 0-.091-.001-.136v.007c0-.022.001-.047.001-.072 0-1.248-.482-2.383-1.269-3.23l.003.003c.168-.44.265-.948.265-1.479 0-.649-.145-1.263-.404-1.814l.011.026c-.115-.022-.246-.035-.381-.035-.334 0-.649.078-.929.216l.012-.005c-.568.21-1.054.448-1.512.726l.038-.022-.609.384c-.922-.264-1.981-.416-3.075-.416s-2.153.152-3.157.436l.081-.02q-.256-.176-.681-.433c-.373-.214-.814-.421-1.272-.595l-.066-.022c-.293-.154-.64-.244-1.009-.244-.124 0-.246.01-.364.03l.013-.002c-.248.524-.393 1.139-.393 1.788 0 .531.097 1.04.275 1.509l-.01-.029c-.785.844-1.266 1.979-1.266 3.227 0 .025 0 .051.001.076v-.004c-.001.039-.001.084-.001.13 0 .809.12 1.591.344 2.327l-.015-.057c.189.643.476 1.202.85 1.693l-.009-.013c.354.435.782.793 1.267 1.062l.022.011c.432.252.933.465 1.46.614l.046.011c.466.125 1.024.227 1.595.284l.046.004c-.431.428-.718 1-.784 1.638l-.001.012c-.207.101-.448.183-.699.236l-.021.004c-.256.051-.549.08-.85.08-.022 0-.044 0-.066 0h.003c-.394-.008-.756-.136-1.055-.348l.006.004c-.371-.259-.671-.595-.881-.986l-.007-.015c-.198-.336-.459-.614-.768-.827l-.009-.006c-.225-.169-.49-.301-.776-.38l-.016-.004-.32-.048c-.023-.002-.05-.003-.077-.003-.14 0-.273.028-.394.077l.007-.003q-.128.072-.08.184c.039.086.087.16.145.225l-.001-.001c.061.072.13.135.205.19l.003.002.112.08c.283.148.516.354.693.603l.004.006c.191.237.359.505.494.792l.01.024.16.368c.135.402.38.738.7.981l.005.004c.3.234.662.402 1.057.478l.016.002c.33.064.714.104 1.106.112h.007c.045.002.097.002.15.002.261 0 .517-.021.767-.062l-.027.004.368-.064q0 .609.008 1.418t.008.873v.014c0 .185-.08.351-.208.466h-.001c-.119.089-.268.143-.431.143-.075 0-.147-.011-.214-.032l.005.001c-4.929-1.689-8.409-6.283-8.409-11.69 0-2.268.612-4.393 1.681-6.219l-.032.058c1.094-1.871 2.609-3.386 4.422-4.449l.058-.031c1.739-1.034 3.835-1.645 6.073-1.645h.098-.005zm-7.64 17.666q.048-.112-.112-.192-.16-.048-.208.032-.048.112.112.192.144.096.208-.032zm.497.545q.112-.08-.032-.256-.16-.144-.256-.048-.112.08.032.256.159.157.256.047zm.48.72q.144-.112 0-.304-.128-.208-.272-.096-.144.08 0 .288t.272.112zm.672.673q.128-.128-.064-.304-.192-.192-.32-.048-.144.128.064.304.192.192.32.044zm.913.4q.048-.176-.208-.256-.24-.064-.304.112t.208.24q.24.097.304-.096zm1.009.08q0-.208-.272-.176-.256 0-.256.176 0 .208.272.176.256.001.256-.175zm.929-.16q-.032-.176-.288-.144-.256.048-.224.24t.288.128.225-.224z"
								></path></g
							></svg
						>
						Continue with Github
					</button>
				</form>
			</div>

			<form
				method="post"
				action="?/signUpEmail"
				use:enhance={() => {
					loading = true;
					console.log('Submitting');
					return async ({ update }) => {
						await update();
						loading = false;
						console.log('Done');
					};
				}}
			>
				<div class="divider my-4.5 flex items-center gap-3 text-xs text-gray-mid">
					or sign in with email
				</div>
				<div class="field mb-4">
					<label for="email" class="field-label mb-1.5 block text-xs font-semibold text-ink"
						>Email address</label
					>
					<input
						type="email"
						class="field-input h-11.5 w-full rounded-md border-[1.5px] border-gray-light bg-gray-faint px-3.5 font-body text-sm text-ink transition-[border-color,background] duration-150"
						placeholder="you@example.com"
						id="email"
						name="email"
					/>
				</div>
				<div class="field mb-4">
					<div class="mb-1.5 flex items-center justify-between">
						<label class="text-[12px] font-semibold text-black" for="password">Password</label>
						<a
							href="#"
							class="text-[12px] font-medium text-yellow-dark no-underline hover:underline"
							>Forgot password?</a
						>
					</div>
					<input
						type="password"
						class="field-input h-11.5 w-full rounded-md border-[1.5px] border-gray-light bg-gray-faint px-3.5 font-body text-sm text-ink transition-[border-color,background] duration-150"
						placeholder="Min. 8 characters"
						bind:value={password}
						id="password"
						name="password"
					/>
				</div>
				<div class="mb-5 flex items-center justify-between">
					<label class="flex cursor-pointer items-center gap-2 text-[12.5px] text-gray-dark">
						<input
							type="checkbox"
							checked
							class="h-3.5 w-3.5 cursor-pointer rounded"
							style="accent-color:#F5C518;"
						/>
						Keep me signed in
					</label>
				</div>
				<button
					disabled={loading}
					class="btn-next mb-3.5 flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-none bg-ink font-body text-sm font-semibold text-white transition-[opacity,transform] duration-150"
				>
					Sign in to IdeaShare
				</button>
			</form>
			<!--Signup link-->
			<div class="text-center text-[13px] text-gray-mid">
				New here?
				<a
					href={resolve('/auth/signup')}
					class="font-semibold text-black no-underline hover:underline">Create a free account</a
				>
			</div>

			<!-- Terms note -->
			<div class="mt-6 text-center text-[11px] leading-relaxed text-gray-mid">
				By signing in you agree to our
				<a href="#" class="text-black no-underline hover:underline">Terms of Service</a>
				and
				<a href="#" class="text-black no-underline hover:underline">Privacy Policy</a>
			</div>
		</div>
	</div>
</div>

<style>
	/* ── Pseudo-elements (::before / ::after) ── */

	/* Dot-grid overlay on left panel */
	.left::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image: radial-gradient(circle, rgba(245, 197, 24, 0.12) 1px, transparent 1px);
		background-size: 28px 28px;
		pointer-events: none;
	}

	/* Yellow glow blob */
	.left::after {
		content: '';
		position: absolute;
		width: 500px;
		height: 500px;
		border-radius: 50%;
		background: radial-gradient(circle, rgba(245, 197, 24, 0.18) 0%, transparent 70%);
		top: -100px;
		left: -100px;
		pointer-events: none;
		animation: pulse 6s ease-in-out infinite;
	}

	/* Underline accent on headline <em> */
	.headline-em::after {
		content: '';
		position: absolute;
		bottom: -2px;
		left: 0;
		right: 0;
		height: 3px;
		background: #f5c518;
		border-radius: 2px;
		opacity: 0.4;
	}

	/* Divider lines */
	.divider::before,
	.divider::after {
		content: '';
		flex: 1;
		height: 1px;
		background: #ddd;
	}
	.pwd-bar {
		height: 3px;
		flex: 1;
		border-radius: 0.125rem; /* rounded-sm */
		background-color: #e5e7eb; /* bg-gray-light (fallback color) */
		transition: background-color 300ms;
	}

	/* Svelte safely compiles these classes now because they are explicitly in the template */
	.weak {
		background-color: #ef4444;
	} /* Red */
	.fair {
		background-color: #f59e0b;
	} /* Orange/Yellow */
	.strong {
		background-color: #10b981;
	} /* Green */

	/* ── Keyframe animations ── */
	@keyframes pulse {
		0%,
		100% {
			transform: scale(1);
			opacity: 1;
		}
		50% {
			transform: scale(1.1);
			opacity: 0.7;
		}
	}

	@keyframes floatUp {
		0% {
			transform: translateY(340px);
			opacity: 0;
		}
		8% {
			opacity: 1;
		}
		85% {
			opacity: 1;
		}
		100% {
			transform: translateY(-120px);
			opacity: 0;
		}
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: translateY(8px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes popIn {
		from {
			transform: scale(0.5);
			opacity: 0;
		}
		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	@keyframes confettiFall {
		0% {
			transform: translateY(-20px) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: translateY(600px) rotate(720deg);
			opacity: 0;
		}
	}

	/* ── Animated elements ── */
	.idea-float {
		animation: floatUp linear infinite;
		opacity: 0;
	}
	.idea-float:nth-child(1) {
		left: 0;
		animation-duration: 14s;
		animation-delay: 0s;
	}
	.idea-float:nth-child(2) {
		left: 50px;
		animation-duration: 18s;
		animation-delay: -6s;
	}
	.idea-float:nth-child(3) {
		left: 20px;
		animation-duration: 16s;
		animation-delay: -11s;
	}
	.idea-float:nth-child(4) {
		left: 60px;
		animation-duration: 20s;
		animation-delay: -3s;
	}
	.idea-float:nth-child(5) {
		left: 10px;
		animation-duration: 15s;
		animation-delay: -9s;
	}

	.success-bulb {
		animation: popIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	.conf-piece {
		animation: confettiFall linear forwards;
		opacity: 0;
	}

	/* ── JS-toggled states (class names referenced by script) ── */

	/* Screen visibility */
	.screen {
		display: none;
	}
	.screen.visible {
		display: block;
		animation: fadeIn 0.3s ease;
	}

	/* Progress step bar states */
	.step.done {
		background: #f5c518;
	}
	.step.active {
		background: #111111;
	}

	/* Topic tile selected state */
	.topic-tile:hover {
		border-color: #c49a00;
	}
	.topic-tile.selected {
		border-color: #f5c518;
		background: #fff8dc;
	}

	/* Type tile selected state */
	.type-tile:hover {
		border-color: #444;
	}
	.type-tile.selected {
		border-color: #111;
		background: #111;
	}

	/* ── Input focus & placeholder ── */
	.field-input:focus {
		outline: none;
		border-color: #f5c518;
		background: #fff;
		box-shadow: 0 0 0 3px #fff8dc;
	}
	.field-input::placeholder {
		color: #bbbbbb;
	}

	/* ── Hover / active states ── */
	.social-btn:hover {
		border-color: #444;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
	}
	.btn-next:hover {
		opacity: 0.88;
	}
	.btn-next:active {
		transform: scale(0.99);
	}
	.already-have a:hover {
		text-decoration: underline;
	}

	/* ── Responsive ── */
	@media (max-width: 860px) {
		.left {
			width: 44%;
			padding: 28px 24px;
		}
		.right {
			width: 56%;
			padding: 36px;
		}
		.left-headline h2 {
			font-size: 28px;
		}
	}

	@media (max-width: 640px) {
		.left {
			display: none;
		}
		.right {
			width: 100%;
			min-height: 100vh;
			padding: 28px 20px 40px;
			justify-content: flex-start;
		}
		.mobile-top {
			display: flex !important;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 28px;
		}
		.mobile-logo {
			display: flex;
			align-items: center;
			gap: 8px;
		}
		.mobile-logo-text {
			font-family: 'Bricolage Grotesque', sans-serif;
			font-size: 17px;
			font-weight: 700;
			color: #111;
			letter-spacing: -0.3px;
		}
		.mobile-signin {
			font-size: 13px;
			color: #111;
			font-weight: 500;
			cursor: pointer;
			text-decoration: underline;
		}
		.steps {
			margin-bottom: 24px;
		}
		.screen-title {
			font-size: 22px;
		}
		.screen-sub {
			font-size: 13px;
			margin-bottom: 20px;
		}
		.social-btns {
			gap: 8px;
			margin-bottom: 14px;
		}
		.social-btn {
			height: 44px;
			font-size: 13px;
		}
		.field-row {
			grid-template-columns: 1fr;
			gap: 0;
		}
		.field-input {
			height: 44px;
			font-size: 14px;
		}
		.topic-grid {
			grid-template-columns: 1fr 1fr;
			gap: 7px;
		}
		.topic-tile {
			padding: 10px 12px;
		}
		.topic-emoji {
			font-size: 17px;
		}
		.topic-name {
			font-size: 12px;
		}
		.topic-count {
			font-size: 10px;
		}
		.type-list {
			gap: 7px;
		}
		.type-tile {
			padding: 12px 14px;
		}
		.type-icon-wrap {
			width: 32px;
			height: 32px;
			font-size: 16px;
		}
		.type-name {
			font-size: 13px;
		}
		.type-desc {
			font-size: 11.5px;
		}
		.btn-next {
			height: 48px;
			font-size: 14px;
		}
		.success-bulb {
			width: 60px;
			height: 60px;
			font-size: 30px;
			border-radius: 16px;
		}
	}
</style>
