import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();

	const access = getCookie(event, 'sb_access_token');

	if (access) {
		const supabase = createClient(config.supabaseUrl, config.supabaseKey, {
			auth: {
				persistSession: false,
				autoRefreshToken: false,
				detectSessionInUrl: false,
			},
			global: { headers: { Authorization: `Bearer ${access}` } },
		});

		await supabase.auth.signOut();
	}

	// CLEARING COOKIES
	clearAuthCookies(event);

	return { ok: true };
});
