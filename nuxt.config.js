import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
	compatibilityDate: '2025-12-26',
	devtools: { enabled: true },
	runtimeConfig: {
		supabaseUrl: process.env.SUPABASE_URL,
		supabaseKey: process.env.SUPABASE_KEY,
	},
	vite: { plugins: [tailwindcss()] },
	css: ['./app/assets/styles/main.css'],
	modules: ['@nuxt/icon', '@pinia/nuxt'],
	icon: {
		componentName: 'NuxtIcon',
		serverBundle: {
			collections: ['fluent'],
		},
	},
});
