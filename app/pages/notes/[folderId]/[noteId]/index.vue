<template>
	<NuxtLayout name="sidebar">
		<template #header>
			<div class="flex items-center gap-x-4">
				<Button @click="$router.push(`/notes/${selectedFolder?.id}`)" variant="outline">
					<NuxtIcon name="fluent:arrow-left-24-regular" />
				</Button>

				<h1>{{ selectedFolder?.name }}</h1>
			</div>
		</template>

		<template #content>
			<!-- LOADING HANDLING -->
			<SkeletonSidebar v-if="loading" />

			<!-- ERROR HANDLING -->
			<div v-else-if="error" class="flex items-center justify-center h-full">
				Oops! Something went wrong!
			</div>

			<ul v-else
				class="flex flex-col gap-y-5 overflow-y-auto no-scrollbar w-full pb-9 pt-2 snap-y snap-mandatory items-center">
				<li v-for="note in selectedFolder?.notes" :key="note?.id" class="lg:w-82 w-60 snap-start">
					<NoteCard :note="{ ...note, folder_id: selectedFolder?.id }" />
				</li>
			</ul>
		</template>

		<!-- MAIN CONTENT -->
		<div class="p-6 w-full h-full">
			<NoteForm :folder-id="folderId" :note="selectedNote" :mode="mode" />
		</div>
	</NuxtLayout>
</template>

<script setup>
const route = useRoute()

const notesStore = useNoteStore()
const { folders, loading, error } = storeToRefs(notesStore)

const folderId = computed(() => route.params.folderId)
const noteId = computed(() => route.params.noteId)
const selectedFolder = computed(() => notesStore.findFolder(folderId.value))
const selectedNote = computed(() => notesStore.findNote(noteId.value))
const mode = computed(() => (selectedNote.value ? 'editMode' : 'createMode'))

// const noteRefs = ref({});
// const setNoteRef = (id, el) => {
// 	if (el) noteRefs.value[id] = el;
// };

useHead({
	title: () =>
		selectedFolder.value?.name
			? `Notino | ${selectedFolder.value.name} Notes`
			: 'Notino | Notes',
})

onMounted(() => {
	if (!folders.value.length) {
		notesStore.fetchNotes()
	}
})
</script>