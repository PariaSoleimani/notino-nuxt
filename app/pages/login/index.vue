<template>
	<div class="min-h-screen bg-zinc-50 flex items-center justify-center relative overflow-hidden">
		<BackgroundPattern />

		<section class="px-5 flex flex-col md:flex-row w-full relative z-20">
			<div class="hidden lg:flex flex-1 text-zinc-800">
				<div class="w-full flex items-center justify-center">
					<div class="space-y-6 max-w-lg">
						<h1 class="text-4xl font-extrabold">
							Welcome back to Notino
						</h1>

						<p class="text-lg leading-relaxed text-zinc-600">
							Stay in flow with your notes, tasks, and whiteboards in one
							calm space. Sign in to pick up right where you left off.
						</p>

						<ul class="space-y-3">
							<li class="flex items-center gap-x-2">
								<span class="size-2 rounded-full bg-amber-400" />
								<span>Instant sync across notes, tasks, and boards</span>
							</li>
							<li class="flex items-center gap-x-2">
								<span class="size-2 rounded-full bg-sky-400" />
								<span>Soft, focused interface that stays out of your way</span>
							</li>
							<li class="flex items-center gap-x-2">
								<span class="size-2 rounded-full bg-emerald-400" />
								<span>Undo-friendly workflows to experiment freely</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div class="flex-1 flex items-center justify-center text-zinc-800 px-3">
				<div class="w-full max-w-md">
					<Form :title="formTitle" :mode="mode" @submit="handleSubmit" @toggle-mode="toggleMode" :loading="loading"
						:error="error" v-model="formData" />
				</div>
			</div>
		</section>
	</div>
</template>

<script setup>
definePageMeta({
	layout: false,
	title: 'Login',
});

const auth = useAuthStore();
const { loading, error, isLoggedIn } = storeToRefs(auth);

const formData = ref({
	email: '',
	password: ''
})
const mode = ref('signin');

const formTitle = computed(() =>
	mode.value === 'signup' ? 'sign up' : 'sign in',
);

const toggleMode = () => {
	mode.value = mode.value === 'signup' ? 'signin' : 'signup';
	if (error.value) auth.clearError();
};

const handleSubmit = async () => {
	if (mode.value === 'signup') {
		await auth.signup(formData.value);
	} else {
		await auth.login(formData.value);
	}

	if (isLoggedIn.value) {
		await navigateTo('/');
	}
};

watch(formData, () => {
	if (error.value) auth.clearError();
});
</script>

<style>
.v-enter-active,
.v-leave-active {
	transition: opacity 0.2s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}

.v-enter-to,
.v-leave-from {
	opacity: 100;
}
</style>
