export default defineNuxtRouteMiddleware(async to => {
	if (to.path === '/login') return;

	const auth = useAuthStore();

	if (auth.user) return;

	await auth.fetchMe();

	if (!auth.user) return navigateTo('/login');
});
