<template>
	<NuxtLayout name="main">
		<template #header>
			<h1>my notes</h1>
		</template>

		<template #content>
			<div class="overflow-y-auto h-full scrollbar-hidden space-y-8 pb-9">
				<!-- LOADING HANDLING -->
				<SkeletonNotes v-if="loading" />

				<!-- ERROR HANDLING -->
				<div v-else-if="error" class="flex items-center justify-center h-full">
					Oops! Something went wrong!
				</div>

				<!-- NO NOTES HANDLING -->
				<div v-else-if="!hasNotes" class="flex items-center justify-center h-full">
					<p>You have no notes!</p>
				</div>

				<div v-else class="space-y-6">
					<!-- FAVORITE FOLDERS -->
					<div v-if="favoriteNotes.length" class="space-y-2">
						<div class="flex items-center justify-between">
							<NuxtLink to="/notes/favorites">
								<h2>Favorite Notes</h2>
							</NuxtLink>

							<div class="flex gap-x-2 items-center">
								<Button aria-label="Scroll left" @click="scrollCarousel('left', 'favorites')" variant="outline">
									<NuxtIcon name="fluent:chevron-left-24-regular" />
								</Button>
								<Button aria-label="Scroll right" @click="scrollCarousel('right', 'favorites')"
									variant="outline">
									<NuxtIcon name="fluent:chevron-right-24-regular" />
								</Button>
							</div>
						</div>

						<ul class="flex overflow-x-auto py-3.5 pr-68 snap-x snap-mandatory scrollbar-hidden"
							:ref="(el) => setCarouselRef('favorites', el)">
							<li v-for="note in favoriteNotes" :key="note.id" class="snap-start px-3">
								<NoteCard :note="note" />
							</li>
						</ul>
					</div>

					<!-- OTHER FOLDERS -->
					<div v-for="folder in folders" :key="folder.id" class="space-y-2">
						<div class="flex items-center justify-between">
							<NuxtLink :to="`/notes/${folder.id}`">
								<h2>{{ folder.name }}</h2>
							</NuxtLink>

							<div class="flex gap-x-2 items-center">
								<Button aria-label="Scroll left" @click="scrollCarousel('left', folder.id)" variant="outline">
									<NuxtIcon name="fluent:chevron-left-24-regular" />
								</Button>
								<Button aria-label="Scroll right" @click="scrollCarousel('right', folder.id)" variant="outline">
									<NuxtIcon name="fluent:chevron-right-24-regular" />
								</Button>
								<Button @click="$router.push(`/notes/${folder.id}/${id}`)">
									<span>add note</span>
									<NuxtIcon name="fluent:add-24-regular" />
								</Button>
							</div>
						</div>

						<ul class="flex overflow-x-auto py-3.5 pr-68 snap-x snap-mandatory scrollbar-hidden"
							:ref="(el) => setCarouselRef(folder.id, el)">
							<li v-for="note in folder.notes" :key="note.id" class="snap-start px-3">
								<NoteCard :note="{ ...note, folder_id: folder.id }" />
							</li>
						</ul>
					</div>
				</div>
			</div>
		</template>
	</NuxtLayout>
</template>

<script setup>
import { v4 as uuidv4 } from 'uuid';

definePageMeta({ title: 'Your Notes' });

const id = uuidv4();
const notesStore = useNoteStore();

onMounted(() => {
	notesStore.fetchNotes();
});

const { folders, favoriteNotes, allNotes, loading, error } =
	storeToRefs(notesStore);

const hasNotes = computed(() => allNotes.value.length > 0);

const carousels = shallowRef({});
const setCarouselRef = (id, el) => {
	if (el) carousels.value[id] = el;
};

const scrollDistance = 200;
const scrollCarousel = (direction, id) => {
	const el = carousels.value[id];
	if (!el) return;
	const move = direction === 'left' ? -scrollDistance : scrollDistance;
	el.scrollBy({ left: move, behavior: 'smooth' });
};
</script>
