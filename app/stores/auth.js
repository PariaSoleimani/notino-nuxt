export const useAuthStore = defineStore('auth', () => {
	const user = ref(null);
	const loading = ref(false);
	const error = ref('');

	const isLoggedIn = computed(() => !!user.value);

	const clearError = () => {
		error.value = '';
	};

	const fetchMe = async () => {
		loading.value = true;
		error.value = '';

		try {
			// PASSING HEADERS TO SERVER BECAUSE MIDDLEWARE RUNS ON BOTH SERVER AND CLIENT
			const headers = process.server
				? useRequestHeaders(['cookie'])
				: undefined;

			const response = await $fetch('/api/auth/me', { headers });

			user.value = response.user;
		} catch {
			user.value = null;
		} finally {
			loading.value = false;
		}
	};

	const login = async formData => {
		loading.value = true;
		error.value = '';

		try {
			await $fetch('/api/auth/login', {
				method: 'POST',
				body: formData,
			});

			await fetchMe();
		} catch (err) {
			error.value = err?.statusText || 'Login failed';
		} finally {
			loading.value = false;
		}
	};

	const signup = async formData => {
		loading.value = true;
		error.value = '';

		try {
			await $fetch('/api/auth/signup', {
				method: 'POST',
				body: formData,
			});

			await fetchMe();
		} catch (err) {
			error.value = err?.statusMessage || 'Signup failed';
		} finally {
			loading.value = false;
		}
	};

	const logout = async () => {
		loading.value = true;
		error.value = '';
		
		try {
			await $fetch('/api/auth/logout', { method: 'POST' });
		} finally {
			user.value = null;
			loading.value = false;
		}
	};

	return {
		user,
		loading,
		error,

		isLoggedIn,

		clearError,
		fetchMe,
		login,
		signup,
		logout,
	};
});
