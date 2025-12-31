import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();

	// GETTING COOKIES IN EVENT HEADER
	const access = getCookie(event, 'sb_access_token');
	const refresh = getCookie(event, 'sb_refresh_token');

	if (!access && !refresh) {
		return { user: null };
	}

	// PASSING ACCESS TOKENS TO EVERY REQUEST HEADER TO SUPABBASE
	const supabase = createClient(config.supabaseUrl, config.supabaseKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
		},
		global: {
			headers: access ? { Authorization: `Bearer ${access}` } : {},
		},
	});

	// TRYING WITH CURRENT ACCESS TOKEN
	const first = await supabase.auth.getUser(access);
	if (!first.error) return { user: first.data.user };

	// IF ACCESS FAILED, WE TRY TO REFRESH ACCESS WITH REFRESH TOKEN
	if (first.error && refresh) {
		const { data: refreshed, error: refreshError } =
			await supabase.auth.refreshSession({
				refresh_token: refresh,
			});

		if (refreshError || !refreshed.session) {
			// REFRESHING FAILED SO CLEAR COOKIES
			clearAuthCookies(event);
			return { user: null };
		}

		// SETTING COOKIES WITH NEW ACCESS TOKEN
		setAuthCookies(event, refreshed.session);

		// RETRYING GETTING USER WITH FRESH ACCESS TOKEN
		const second = await supabase.auth.getUser(
			refreshed.session.access_token,
		);
		if (second.error) return { user: null };
		return { user: second.data.user };
	}
});
