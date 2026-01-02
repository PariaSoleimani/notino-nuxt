import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();
	const supabase = createClient(config.supabaseUrl, config.supabaseKey);

	const id = getRouterParam(event, 'id');

	const { data, error } = await supabase.from('notes').delete().eq('id', id);
	console.log(data);

	if (error) {
		throw createError({
			statusCode: error.status,
			statusMessage: error.message,
		});
	}

	return { success: true };
});
