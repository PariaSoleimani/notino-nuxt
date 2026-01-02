<template>
	<NuxtLink class="flex items-center rounded-md px-2 h-9 gap-x-2 hover:bg-zinc-200 duration-200"
		active-class="bg-zinc-200" :to="item.to">
		<NuxtIcon :name="item.icon" :aria-label="item.name" class="text-xl flex-none translate-x-0.5" />
		<Transition>
			<span v-if="!collapsed" class="capitalize flex-none text-base">
				{{ item.name }}
			</span>
		</Transition>
	</NuxtLink>
</template>

<script setup>
const { item, collapsed } = defineProps(['item', 'collapsed'])
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