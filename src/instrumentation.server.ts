import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: 'https://92538cf3f6119cfacae65fd0663c52a5@o4511474262867968.ingest.de.sentry.io/4511788574834768',

	tracesSampleRate: 1.0,

	// Enable logs to be sent to Sentry
	enableLogs: true

	// uncomment the line below to enable Spotlight (https://spotlightjs.com)
	// spotlight: import.meta.env.DEV,
});
