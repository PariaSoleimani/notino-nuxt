import { createClient } from '@supabase/supabase-js';

export default defineEventHandler(async () => {
	const config = useRuntimeConfig();
	const supabase = createClient(config.supabaseUrl, config.supabaseKey);

	const { data, error } = await supabase
		.from('folders')
		.select(
			'id, name, notes (id, folder_id, title, body, color, created_at, is_archived, is_favorite)',
		)
		.order('created_at', { foreignTable: 'notes', ascending: false });

	if (error) {
		throw createError({
			statusCode: error.status,
			statusMessage: error.message,
		});
	}

	return data;
});
