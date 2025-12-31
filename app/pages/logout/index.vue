<template>
	<div class="min-h-screen bg-zinc-50 flex items-center justify-center relative overflow-hidden px-3">
		<BackgroundPattern />

		<div class="w-full max-w-3xl px-5 z-20">
			<div class="bg-white shadow-xl rounded-3xl p-8 relative overflow-hidden">
				<div class="absolute -right-10 -top-10 size-32 rounded-full bg-zinc-100" />
				<div class="flex flex-col gap-y-6 relative">
					<div class="flex items-center gap-x-3">
						<div
							class="size-12 rounded-xl bg-zinc-900 text-white flex items-center justify-center text-xl font-black">
							N
						</div>
						<div>
							<p class="text-xs uppercase tracking-[0.25em] text-zinc-400">Notino</p>
							<p class="md:text-lg font-semibold text-zinc-900">Session closed</p>
						</div>
					</div>

					<div class="space-y-2">
						<p class="text-2xl md:text-3xl font-extrabold text-zinc-900 leading-tight">You have been signed out.
							Goodbye!</p>
						<p class="text-base text-zinc-500 flex flex-col">
							<span>Your workspace is saved.</span>
							<span>We look forward to have you back again.</span>
						</p>

					</div>

					<Button to="/login" size="lg">
						Back to login
					</Button>

				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
definePageMeta({
	layout: false,
	title: 'Logout'
});

const auth = useAuthStore();

onMounted(async () => {
	await auth.logout();
});
</script>
