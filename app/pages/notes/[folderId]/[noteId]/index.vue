<template>
	<NuxtLayout name="sidebar">
		<template #header>
			<div class="flex items-center gap-x-4">
				<Button @click="$router.push(`/notes/${selectedFolder.id}`)" variant="outline">
					<NuxtIcon name="fluent:arrow-left-24-regular" />
				</Button>

				<h1>{{ selectedFolder?.name }}</h1>
			</div>
		</template>

		<template #content>
			<ul ref="noteList"
				class="flex flex-col gap-y-5 overflow-y-auto no-scrollbar w-full pb-9 pt-2 snap-y snap-mandatory items-center">
				<li v-for="note in selectedFolder?.notes" :key="note.id" class="w-fit snap-start"
					:ref="(el) => setNoteRef(note.id, el)">
					<NoteCard :note="{ ...note, folder_id: selectedFolder?.id }" />
				</li>
			</ul>
		</template>

		<!-- MAIN CONTENT -->
		<div class="p-6 w-full h-full">
			<form class="flex flex-col gap-y-4 relative flex-1 h-full" @submit.prevent="handleSubmit">
				<div class="pb-6 border-b border-zinc-200">
					<input type="text" name="title" id="" v-model="formData.title" placeholder="title"
						class="focus:outline-none text-4xl block placeholder:capitalize w-full">
					<span class="text-xs mt-1.5 text-zinc-400">{{ selectedNote?.created_at }}</span>
				</div>
				<textarea name="body" id="" rows="20"
					class="resize-none focus:outline-none leading-relaxed placeholder:capitalize" placeholder="description"
					v-model="formData.body" />

				<Button size="lg" type="submit" class="absolute bottom-10 right-10">
					<span>{{ mode === 'editMode' ? 'edit note' : 'save note' }}</span>
					<NuxtIcon name="fluent:add-24-regular" />
				</Button>
			</form>
		</div>
	</NuxtLayout>
</template>

<script setup>
const route = useRoute();

const notesStore = useNoteStore();
const { folders, loading, error } = storeToRefs(notesStore);

const formData = ref({
	title: '',
	body: '',
	folder_id: route.params.folderId,
	color: '#eded89',
});

if (!folders.length) notesStore.fetchNotes();

const selectedFolder = computed(() =>
	notesStore.findFolder(route.params.folderId),
);

const selectedNote = computed(() =>
	notesStore.findNote(route?.params?.noteId),
);

const mode = computed(() => {
	if (selectedNote.value) {
		return 'editMode'
	} else {
		return 'createMode'
	};
});

const noteRefs = ref({});
const setNoteRef = (id, el) => {
	if (el) noteRefs.value[id] = el;
};

const handleSubmit = async () => {
	if (mode === 'editMode') {
		await notesStore.updateNote(formData.value);
	} else {
		await notesStore.addNote(formData.value);
	}
};

watch(
	() => selectedNote.value,
	(note) => {
		if (note && isEditMode.value) {
			formData.value.title = note.title || ''
			formData.value.body = note.body || ''
			formData.value.color = note.color || '#eded89'
		} else {
			formData.value.title = ''
			formData.value.body = ''
			formData.value.color = '#eded89'
		}
	},
	{ immediate: true }
)

watchEffect(() => {
	let form = formData.value;
	if (selectedNote.value) {
		form.title = selectedNote.value.title;
		form.body = selectedNote.value.body;
	}
});

// TO OVERWRITE THE USEHEAD IN APP.VUE
useHead({
	title: () =>
		selectedFolder.value?.name
			? `Notino | ${selectedFolder.value.name} Notes`
			: 'Notino | Notes',
});
</script>
