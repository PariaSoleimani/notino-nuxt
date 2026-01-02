<template>
	<form class="flex flex-col gap-y-4 relative flex-1 h-full" @submit.prevent="handleSubmit">
		<div class="pb-6 border-b border-zinc-200">
			<input v-model="formData.title" type="text" placeholder="title" ref="titleEl"
				class="focus:outline-none text-4xl block placeholder:capitalize w-full" />
			<span class="text-xs mt-1.5 text-zinc-400">{{ note?.created_at }}</span>
		</div>

		<textarea v-model="formData.body" rows="20"
			class="resize-none focus:outline-none leading-relaxed placeholder:capitalize" placeholder="description" />

		<Button size="lg" type="submit" class="absolute bottom-10 right-10"
			:disabled="(!formData.title && !formData.body) || isSubmitting">
			<span>{{ mode === 'editMode' ? 'edit note' : 'add note' }}</span>
			<NuxtIcon :name="mode === 'editMode' ? 'fluent:save-24-regular' : 'fluent:add-24-regular'" />
		</Button>
	</form>
</template>

<script setup>
const { folderId, note, mode } = defineProps(['folderId', 'note', 'mode'])

const notesStore = useNoteStore()
const { isSubmitting } = storeToRefs(notesStore)

const titleEl = ref(null)
const formData = ref({
	title: '',
	body: '',
	folder_id: folderId,
	color: '#eded89',
})

const resetForm = () => {
	formData.value = {
		title: '',
		body: '',
		folder_id: folderId,
		color: '#eded89',
	}
}

const focusTitle = async () => {
	await nextTick()
	titleEl.value?.focus()
}

watch(
	() => note,
	(n) => {
		if (n) {
			formData.value.title = n.title || ''
			formData.value.body = n.body || ''
			formData.value.color = n.color || '#eded89'
		}
	},
	{ immediate: true }
)

const handleSubmit = async () => {
	if (mode === 'editMode') {
		await notesStore.updateNote(note.id, {
			title: formData.value.title,
			body: formData.value.body,
			color: formData.value.color,
			folder_id: folderId
		})
	} else {
		await notesStore.addNote(formData.value)
		resetForm()
	}
}

onMounted(() => {
	if (mode !== 'editMode') focusTitle()
})
</script>