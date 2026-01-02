<template>
	<NuxtLayout>
		<NuxtPage />
		<Toast />
	</NuxtLayout>
</template>

<script setup>
const route = useRoute()

const title = computed(() =>
	route.meta?.title
		? `Notino | ${route.meta.title}`
		: 'Notino | Your Daily Assistant'
)

useHead(() => ({
	title: title.value,
	htmlAttrs: {
		lang: 'en',
		dir: 'ltr',
	},
	link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
}))
</script>