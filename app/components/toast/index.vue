<template>
	<div class="fixed bottom-12 right-10 z-1000 flex flex-col gap-y-4">
		<div v-for="item in notifications" :key="item.id"
			class="flex min-w-60 max-w-80 items-start justify-between gap-x-2 rounded-xl shadow-sm px-2 py-3 group relative"
			:class="typeClass(item.type)">
			<div class="flex items-start gap-x-2">
				<NuxtIcon v-if="typeIcon(item.type)" :name="typeIcon(item.type)"
					class="shrink-0 translate-y-0.25 text-lg" />
				<p class="text-sm font-light">{{ item.message }}</p>
			</div>

			<!-- <button
				class="absolute -top-2 -right-2 group-hover:opacity-100 opacity-0 rounded-full transition text-zinc-500 bg-white flex items-center justify-center p-1 text-xs"
				@click="notificationsStore.remove(item.id)">
				<NuxtIcon name="fluent:dismiss-24-regular" />
			</button> -->
		</div>
	</div>
</template>

<script setup>
const notificationsStore = useNotificationsStore();
const { notifications } = storeToRefs(notificationsStore);

const typeClass = type => {
	switch (type) {
		case 'success':
			return 'bg-green-50 text-green-600';
		case 'error':
			return 'text-red-500 bg-red-50';
		default:
			return 'bg-zinc-50 text-zinc-500';
	}
};

const typeIcon = type => {
	switch (type) {
		case 'success':
			return 'fluent:checkmark-24-regular';
		case 'error':
			return 'fluent:error-24-regular';
		default:
			return '';
	}
};
</script>
