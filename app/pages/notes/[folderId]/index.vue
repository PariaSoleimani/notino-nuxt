<template>
	<NuxtLayout name="main">
		<template #header>
			<div class="flex items-center justify-between">
				<div class="flex items-center gap-x-4">
					<Button @click="$router.push('/notes')" variant="outline">
						<NuxtIcon name="fluent:arrow-left-24-regular" />
					</Button>

					<h1>{{ selectedFolder?.name }}</h1>
				</div>
				<div class="flex gap-x-2 items-center">
					<Button type="link" :to="`/notes/${selectedFolder?.id}/${id}`" size="lg">
						<span>add note</span>
						<NuxtIcon name="fluent:add-24-regular" />
					</Button>
				</div>
			</div>
		</template>

		<template #content>
			<div class="overflow-y-auto h-full scrollbar-hidden pb-9">
				<!-- LOADING HANDLING -->
				<SkeletonFolder v-if="loading" />

				<!-- ERROR HANDLING -->
				<div v-else-if="error" class="flex items-center justify-center h-full">
					Oops! Something went wrong!
				</div>

				<!-- NO FOLDER HANDLING -->
				<div v-else-if="!selectedFolder" class="flex items-center justify-center h-full">
					Opps! Looks like you are looking for a wrong folder.
				</div>

				<ul v-else class="flex flex-wrap gap-6 p-3">
					<li v-for="note in selectedFolder?.notes" :key="note.id">
						<NoteCard :note="{ ...note, folder_id: selectedFolder?.id }" />
					</li>
				</ul>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

const route = useRoute();
const id = uuidv4();
const notesStore = useNoteStore();
const { loading, folders, error } = storeToRefs(notesStore);

onMounted(() => {
	if (!folders.value.length) notesStore.fetchNotes();
});

const selectedFolder = computed(() =>
	notesStore.findFolder(route.params.folderId),
);

// TO OVERWRITE THE USEHEAD IN APP.VUE
useHead({
	title: () =>
		selectedFolder.value?.name
			? `Notino | ${selectedFolder.value.name} Notes`
			: 'Notino | Notes',
});
</script>
