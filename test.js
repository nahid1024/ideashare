import { browser } from 'k6/browser';
import { check, fail, sleep } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:5173';
const EMAIL = __ENV.LOGIN_EMAIL || 'nahidkhan1024bit@gmail.com';
const PASSWORD = __ENV.LOGIN_PASSWORD || 'khan2019@nahid';
const PEAK_VUS = Number(__ENV.PEAK_VUS || __ENV.VUS || '100');
const RAMP_UP = __ENV.RAMP_UP || '1m';
const HOLD = __ENV.HOLD || '2m';
const RAMP_DOWN = __ENV.RAMP_DOWN || '1m';

export const options = {
	scenarios: {
		real_user_journey: {
			executor: 'ramping-vus',
			stages: [
				{ duration: RAMP_UP, target: PEAK_VUS },
				{ duration: HOLD, target: PEAK_VUS },
				{ duration: RAMP_DOWN, target: 0 }
			],
			options: {
				browser: {
					type: 'chromium'
				}
			}
		}
	},
	thresholds: {
		checks: ['rate==1.0']
	}
};

async function goAndCheck(page, path) {
	const res = await page.goto(`${BASE_URL}${path}`, { waitUntil: 'load' });
	check(res, {
		[`GET ${path} returned response`]: (r) => r !== null,
		[`GET ${path} successful`]: (r) => r && r.status() >= 200 && r.status() < 400
	});
}

async function waitForUrlContains(page, fragment, maxSeconds = 15) {
	for (let i = 0; i < maxSeconds; i++) {
		if (page.url().includes(fragment)) {
			return true;
		}
		sleep(1);
	}
	return false;
}

async function createPostViaUI(page) {
	const title = `k6 idea ${Date.now()}`;
	const description =
		'A lightweight idea created by a k6 browser journey to validate authenticated post creation.';

	const titleInput = page.locator('#title-input');
	const editor = page.locator('.ProseMirror[contenteditable="true"]');
	const publishButton = page.locator('button[name="intent"][value="publish"]');
	const titleInputCount = await titleInput.count();
	const editorCount = await editor.count();

	check({ titleInputCount }, {
		'create page has title input': (v) => v.titleInputCount > 0
	});
	check({ editorCount }, {
		'create page has TipTap editor': (v) => v.editorCount > 0
	});

	await titleInput.fill(title);
	await editor.click();
	await editor.fill(description);
	await publishButton.click();

	const redirectedToPost = await waitForUrlContains(page, '/post/', 20);
	check({ redirectedToPost }, {
		'post publish redirected to post detail': (v) => v.redirectedToPost
	});

	if (!redirectedToPost) {
		throw new Error(`publish did not redirect to post detail, current URL: ${page.url()}`);
	}
}

export default async function () {
	const context = await browser.newContext();
	const page = await context.newPage();

	try {
		await goAndCheck(page, '/');

		await page.goto(`${BASE_URL}/auth/login`, { waitUntil: 'load' });

		const emailField = page.locator('input[name="email"]');
		const passwordField = page.locator('input[name="password"]');

		if ((await emailField.count()) > 0 && (await passwordField.count()) > 0) {
			await emailField.fill(EMAIL);
			await passwordField.fill(PASSWORD);
			await passwordField.press('Enter');

			for (let i = 0; i < 12; i++) {
				if (!page.url().includes('/auth/login')) {
					break;
				}
				sleep(1);
			}

			check(page, {
				'logged in and redirected away from login': (p) => !p.url().includes('/auth/login')
			});

			if (page.url().includes('/auth/login')) {
				throw new Error('login did not redirect from /auth/login');
			}
		} else {
			// Already authenticated users can be redirected to '/'.
			check(page, {
				'login page redirected because session already exists': (p) => p.url().startsWith(BASE_URL)
			});
		}

		await goAndCheck(page, '/post/0c8398b3-3066-450b-9f7f-93cd0ca0853c');
		sleep(1);

		await goAndCheck(page, '/profile/nahid1024bit');
		sleep(1);

		await goAndCheck(page, '/');
		sleep(1);

		await goAndCheck(page, '/post/create');
		sleep(1);
		await createPostViaUI(page);
		sleep(1);

		await goAndCheck(page, '/');
	} catch (error) {
		const message = error && typeof error === 'object' && 'message' in error ? error.message : String(error);
		fail(`Journey failed: ${message}`);
	} finally {
		await page.close();
		await context.close();
	}
}