import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async event => {
	const config = useRuntimeConfig();
	const supabase = createClient(config.supabaseUrl, config.supabaseKey);

	const id = getRouterParam(event, 'id');
	const body = await readBody(event);

	const { data, error } = await supabase
		.from('notes')
		.update(body)
		.eq('id', id)
		.select()
		.single();

	if (error) {
		throw createError({
			statusCode: error.status,
			statusMessage: 'Error updating note',
		});
	}

	return data;
});
