import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();
	const supabase = createClient(config.supabaseUrl, config.supabaseKey);

	const payload = await readBody(event);

	const { title, body, color, folder_id } = payload || {};

	const { data, error } = await supabase
		.from('notes')
		.insert([
			{
				title: title || '',
				body: body || '',
				color,
				folder_id,
			},
		])
		.select('*')
		.single();

	if (error) {
		throw createError({
			statusCode: error.status,
			statusMessage: error.message,
		});
	}

	return data;
});
