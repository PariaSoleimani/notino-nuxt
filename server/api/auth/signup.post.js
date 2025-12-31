import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();
	const supabase = createClient(config.supabaseUrl, config.supabaseKey);

	const body = await readBody(event);
	const { email, password } = body;

	const { data, error } = await supabase.auth.signUp({
		email,
		password,
	});

	if (error) {
		throw createError({
			status: error.status,
			statusMessage: error.message,
		});
	}

	setAuthCookies(event, data.session);

	return { ok: true };
});
