<template>
	<NuxtLink
		class="flex flex-col p-3 rounded-md gap-y-1.5 w-full min-h-58 flex-1 max-h-64 hover:scale-105 hover:-rotate-1 duration-200 transition-all relative text-zinc-700"
		:style="{ backgroundColor: note?.color || defaultColor }" :to="`/notes/${note.folder_id}/${note.id}`">
		<!-- NOTE TITLE -->
		<h3 v-if="note?.title" class="font-semibold line-clamp-2">
			{{ note.title }}
		</h3>

		<!-- NOTE BODY -->
		<div v-if="note?.body" class="flex-1 mb-1">
			<p class="text-sm line-clamp-6">{{ note.body }}</p>
		</div>

		<!-- NOTE DETAILS -->
		<div class="flex items-center justify-between mt-auto">
			<span v-if="note?.created_at" class="text-xs mt-auto capitalize text-zinc-500">
				{{ getRelativeTime(note.created_at) }}
			</span>

			<div class="flex items-center gap-x-2.5 text-zinc-600 ml-auto">
				<!-- STAR ACTION -->
				<button type="button" aria-label="Toggle favorite"
					class="flex items-center justify-center hover:scale-120 transition-transform duration-200"
					@click.stop.prevent="toggleFavorite(note.id)">
					<NuxtIcon :name="note.is_favorite ? 'fluent:star-24-filled' : 'fluent:star-24-regular'"
						:class="note.is_favorite ? 'text-yellow-400' : 'text-inherit'" />
				</button>
				<!-- DELETE ACTION -->
				<button type="button" aria-label="Delete note"
					class="flex items-center justify-center hover:scale-120 transition-transform duration-200"
					@click.stop.prevent="deleteNote(note.id)">
					<NuxtIcon name="fluent:delete-28-regular" />
				</button>
			</div>
		</div>
	</NuxtLink>
</template>

<script setup>
const { note } = defineProps(['note']);
const notesStore = useNoteStore()

const defaultColor = '#F5F5F4';

const deleteNote = (id) => {
	notesStore.deleteNote(id)
};

const toggleFavorite = (id) => {
	notesStore.toggleFavorite(id)
};
</script>
