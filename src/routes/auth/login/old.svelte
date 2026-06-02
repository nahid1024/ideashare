<script lang="ts">
	import { resolve } from '$app/paths';
	import { enhance } from '$app/forms';
	//import type { ActionData } from './$types';
	import './login.css';

	//let { form }: { form: ActionData } = $props();

	const isBrowser = typeof window !== 'undefined';

	function checkPwd(value: string) {
		if (!isBrowser) return;

		const bars = [
			document.getElementById('pb1'),
			document.getElementById('pb2'),
			document.getElementById('pb3')
		];
		const hint = document.getElementById('pwd-hint');

		bars.forEach((bar) => {
			if (bar) bar.className = 'pwd-bar';
		});

		if (!hint) return;

		if (value.length === 0) {
			hint.textContent = 'Use a mix of letters, numbers, and symbols';
			return;
		}

		if (value.length < 6) {
			bars[0]?.classList.add('weak');
			hint.textContent = 'Too short';
		} else if (value.length < 10 || !/[0-9]/.test(value)) {
			bars[0]?.classList.add('fair');
			bars[1]?.classList.add('fair');
			hint.textContent = 'Getting there — add numbers or symbols';
		} else {
			bars.forEach((bar) => bar?.classList.add('strong'));
			hint.textContent = '✓ Strong password';
		}
	}
</script>

<!-- LEFT PANEL -->
<div class="left">
	<div class="left-logo">
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
		<span class="left-logo-text">Idea<span>Share</span></span>
	</div>

	<div class="left-headline">
		<h2>Where good ideas<br />find <em>their people</em></h2>
		<p class="left-sub">
			A place to drop the thought before it disappears. Share it, refine it, build it — together.
		</p>
	</div>

	<div class="cards-stage">
		<div class="idea-float">
			<div class="ifc-tag">#education</div>
			<div class="ifc-title">
				A universal exam that certifies your skills — no university required
			</div>
			<div class="ifc-footer">
				<div class="ifc-av" style="background:#F5C518;color:#111">RK</div>
				<div class="ifc-name">Rafiq K.</div>
				<div class="ifc-spark">⚡ 847</div>
			</div>
		</div>
		<div class="idea-float">
			<div class="ifc-tag">#health</div>
			<div class="ifc-title">
				Let patients own their medical records — shared with any doctor, anywhere
			</div>
			<div class="ifc-footer">
				<div class="ifc-av" style="background:#22C55E;color:#fff">TA</div>
				<div class="ifc-name">Tolu A.</div>
				<div class="ifc-spark">⚡ 512</div>
			</div>
		</div>
		<div class="idea-float">
			<div class="ifc-tag">#cities</div>
			<div class="ifc-title">
				Neighbourhoods vote on which small businesses get rent subsidies each quarter
			</div>
			<div class="ifc-footer">
				<div class="ifc-av" style="background:#6366F1;color:#fff">LM</div>
				<div class="ifc-name">Lena M.</div>
				<div class="ifc-spark">⚡ 389</div>
			</div>
		</div>
		<div class="idea-float">
			<div class="ifc-tag">#economy</div>
			<div class="ifc-title">
				A global skills passport replacing the traditional CV once and for all
			</div>
			<div class="ifc-footer">
				<div class="ifc-av" style="background:#F97316;color:#fff">NI</div>
				<div class="ifc-name">Nadia I.</div>
				<div class="ifc-spark">⚡ 271</div>
			</div>
		</div>
		<div class="idea-float">
			<div class="ifc-tag">#technology</div>
			<div class="ifc-title">
				Open-source AI trained only on public domain works — no copyright risk
			</div>
			<div class="ifc-footer">
				<div class="ifc-av" style="background:#EC4899;color:#fff">PO</div>
				<div class="ifc-name">Paulo O.</div>
				<div class="ifc-spark">⚡ 634</div>
			</div>
		</div>
	</div>

	<div class="left-stats">
		<div class="stat-item">
			<div class="stat-num">24k+</div>
			<div class="stat-lbl">Ideas shared</div>
		</div>
		<div class="stat-item">
			<div class="stat-num">8.3k</div>
			<div class="stat-lbl">Being built</div>
		</div>
		<div class="stat-item">
			<div class="stat-num">142</div>
			<div class="stat-lbl">Countries</div>
		</div>
	</div>
</div>

<!-- RIGHT PANEL -->
<div class="right" id="right-panel">
	<div class="mobile-top" style="display:none;">
		<div class="mobile-logo">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="28" height="28">
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
				<path d="M54 22 L44 46 L51 46 L46 68 L62 40 L54 40 Z" fill="#111111" />
			</svg>
			<span class="mobile-logo-text">Idea<span>Share</span></span>
		</div>
		<span class="mobile-signin">Sign in</span>
	</div>

	<div class="screen visible" id="screen1">
		<h1 class="screen-title">Welcome back</h1>
		<p class="screen-sub">Your ideas deserve a home. Takes 30 seconds.</p>

		<div class="social-btns">
			<button class="social-btn" onclick={() => goTo(2)}>
				<svg class="social-icon" viewBox="0 0 24 24"
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
				<button class="social-btn">
					<svg
						class="social-icon"
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
		<!--Email sign up-->
		<form method="post" action="?/signInEmail" use:enhance>
			<div class="divider">or logn with email</div>
			<div class="field">
				<label class="field-label" for="email-address">Email address</label>
				<input
					id="email-address"
					type="email"
					name="email"
					class="field-input"
					placeholder="you@example.com"
				/>
			</div>
			<div class="field">
				<label class="field-label" for="password">Password</label>
				<input
					id="password"
					type="password"
					class="field-input"
					name="password"
					placeholder="Min. 8 characters"
					oninput={(event) => checkPwd((event.currentTarget as HTMLInputElement).value)}
				/>
				<div class="pwd-strength">
					<div class="pwd-bar" id="pb1"></div>
					<div class="pwd-bar" id="pb2"></div>
					<div class="pwd-bar" id="pb3"></div>
				</div>
				<div class="pwd-hint" id="pwd-hint">Use a mix of letters, numbers, and symbols</div>
			</div>
			<button class="btn-next" formaction="?/signUpEmail"> Login </button>
		</form>

		<div class="already-have">
			Don't have an account? <a href={resolve('/auth/signup')}>Sign up</a>
		</div>
	</div>
</div>
