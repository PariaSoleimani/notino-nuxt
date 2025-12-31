<template>
	<header :class="[
		'flex-none rounded-2xl bg-zinc-100 flex flex-col gap-y-7 py-6 px-3 relative transition-all duration-200 my-4',
		collapsed ? 'w-16' : 'w-56'
	]" @mouseenter="collapsed = false" @mouseleave="collapsed = true">
		<!-- LOGO -->
		<NuxtLink to="/" class="items-center flex font-extrabold text-2xl px-2.5">
			<span>N</span>
			<Transition>
				<span v-if="!collapsed">otino</span>
			</Transition>
		</NuxtLink>

		<!-- NAV -->
		<nav>
			<ul class="flex flex-col gap-y-2">
				<li v-for="item in nav" :key="item.to">
					<NavItem :item="item" :collapsed="collapsed" />
				</li>
			</ul>
		</nav>

		<!-- BOTTOM -->
		<ul class="mt-auto flex flex-col gap-y-2">
			<li v-for="item in navBottom" :key="item.to">
				<NavItem :item="item" :collapsed="collapsed" />
			</li>
			<li class="flex items-center gap-x-3 mt-3">
				<div class="bg-black size-10 rounded-full flex-none"></div>
				<Transition>
					<div v-if="!collapsed" class="min-w-0">
						<p>{{ user ? user?.name : '' }}</p>
						<p class="text-xs truncate ">{{ user?.email }}</p>
					</div>
				</Transition>
			</li>
		</ul>
	</header>
</template>

<script setup>
const auth = useAuthStore();
const { user } = storeToRefs(auth);

const nav = [
	{ name: 'notes', icon: 'fluent:notepad-24-regular', to: '/notes' },
	{ name: 'tasks', icon: 'fluent:task-list-ltr-24-regular', to: '/tasks' },
	{
		name: 'calendar',
		icon: 'fluent:calendar-date-24-regular',
		to: '/calendar',
	},
	{
		name: 'whiteboard',
		icon: 'fluent:whiteboard-24-regular',
		to: '/whiteboard',
	},
];

const navBottom = [
	{ name: 'log out', icon: 'fluent:sign-out-24-regular', to: '/logout' },
];

const collapsed = ref(false);
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
