import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();
	const supabase = createClient(config.supabaseUrl, config.supabaseKey);

	const body = await readBody(event);
	const { email, password } = body;

	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		clearAuthCookies(event);

		throw createError({
			status: error.status,
			statusMessage: 'login failed. enter valid email and password',
		});
	}

	setAuthCookies(event, data.session);

	return { ok: true };
});
