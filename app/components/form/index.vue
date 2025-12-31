<template>
	<div class="bg-white border border-zinc-200 rounded-2xl shadow-sm p-8 space-y-8">
		<div class="flex items-center gap-x-2">
			<div class="size-11 rounded-lg bg-zinc-900 text-white flex items-center justify-center text-xl font-black">
				N
			</div>
			<div>
				<p class="text-sm uppercase tracking-[0.2em] text-zinc-500">
					Notino
				</p>
				<p class="text-lg font-semibold text-zinc-900 capitalize">
					{{ title }}
				</p>
			</div>
		</div>

		<form class="space-y-6" @submit.prevent="$emit('submit')">
			<div class="space-y-2">
				<label for="email" class="block text-sm font-medium">Email</label>
				<input id="email" name="email" type="email" autocomplete="email" v-model="emailModel" required
					class="w-full h-11 rounded-lg border border-zinc-200 bg-white px-3 placeholder:text-zinc-400 focus:outline-none  transition-all"
					:class="error ? 'ring-2 ring-red-300' : 'focus:ring-2 focus:ring-amber-300'"
					placeholder="you@example.com">
			</div>

			<div class="space-y-2">
				<label for="password" class="block text-sm font-medium">
					Password
				</label>
				<input id="password" name="password" type="password" autocomplete="current-password" v-model="passwordModel"
					required
					class="w-full h-11 rounded-lg border border-zinc-200 bg-white px-3 placeholder:text-zinc-400 focus:outline-none  transition-all"
					:class="error ? 'ring-2 ring-red-300' : 'focus:ring-2 focus:ring-amber-300'" placeholder="••••••••">
			</div>

			<div class="space-y-2">
				<Button type="submit" size="lg" :disabled="loading" class="w-full" :class="error ? 'animate-wiggle' : ''">
					{{ loading ? loadingText : buttonText }}
				</Button>
				<Transition>
					<p v-if="error" class="text-red-600 capitalize text-sm">
						{{ error }}
					</p>
				</Transition>
			</div>
		</form>

		<div class="text-center text-sm text-zinc-800">
			<span>{{ linkPrompt }}</span>
			<button type="button" class="text-sky-400 font-medium hover:text-sky-500 ml-1" @click="$emit('toggleMode')">{{
				linkLabel }}</button>
		</div>
	</div>
</template>

<script setup>
const { modelValue, mode } = defineProps([
	'title',
	'mode',
	'loading',
	'error',
	'modelValue'
]);

const emit = defineEmits(['submit', 'toggleMode', 'update:modelValue']);

const buttonText = computed(() => mode === 'signup' ? 'Create account' : 'Sign in');
const loadingText = computed(() => mode === 'signup' ? 'Creating account…' : 'Signing in…');
const linkPrompt = computed(() => mode === 'signup' ? 'Already have an account?' : 'New here?');
const linkLabel = computed(() => mode === 'signup' ? 'Sign in' : 'Create account');

const emailModel = computed({
	get: () => modelValue.email,
	set: value => emit('update:modelValue', {
		...modelValue,
		email: value
	}),
});

const passwordModel = computed({
	get: () => modelValue.password,
	set: value => emit('update:modelValue', {
		...modelValue,
		password: value
	}),
});
</script>
