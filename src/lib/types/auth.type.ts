export interface BetterAuthError {
	status: string;
	statusCode: number;
	body?: {
		code?: string;
		message?: string;
	};
}
