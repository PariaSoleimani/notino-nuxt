export const useNoteStore = defineStore('notes', () => {
	const notifications = useNotificationsStore();

	const folders = ref([]);
	const loading = ref(true);
	const error = ref(null);
	const isSubmitting = ref(false);

	const activityTime = n => new Date(n.updated_at || n.created_at).getTime();

	const sortFolderNotes = folderId => {
		const folder = findFolder(folderId);
		if (!folder) return;

		folder.notes.sort((a, b) => activityTime(b) - activityTime(a));
	};

	const allNotes = computed(() =>
		folders.value.flatMap(folder => folder.notes || []),
	);

	const favoriteNotes = computed(() =>
		allNotes.value.filter(note => note.is_favorite && !note.is_archived),
	);

	const archivedNotes = computed(() =>
		allNotes.value.filter(note => note.is_archived),
	);

	// FIND FOLDER
	const findFolder = id => {
		return (
			folders.value.find(folder => String(folder.id) === String(id)) ?? null
		);
	};

	// FIND NOTE
	const findNote = id => {
		return (
			allNotes.value.find(note => String(note.id) === String(id)) ?? null
		);
	};

	// FETCH NOTES
	const fetchNotes = async () => {
		loading.value = true;
		error.value = null;

		try {
			const data = await $fetch('/api/notes');
			folders.value = data;
		} catch (err) {
			error.value = err;
		} finally {
			loading.value = false;
		}
	};

	// CREATE NOTES
	const addNote = async formData => {
		isSubmitting.value = true;
		const folderId = formData?.folder_id;

		if (!folderId) {
			notifications.error('Failed to create note. Try again please.');
			return;
		}

		try {
			const newNote = await $fetch('/api/notes', {
				method: 'POST',
				body: formData,
			});

			const selectedFolder = findFolder(folderId);
			if (selectedFolder) {
				selectedFolder.notes.unshift(newNote);
				notifications.success('A new note was added.');
			} else {
				notifications.error('Failed to create a note. Try again.');
			}
		} catch {
			notifications.error('Failed to create note. Try again');
		} finally {
			isSubmitting.value = false;
		}
	};

	// UPDATE NOTE
	const updateNote = async (id, patch) => {
		isSubmitting.value = true;

		const selectedNote = findNote(id);
		if (!selectedNote) {
			notifications.error('Failed to edit note. Try again please.');
			return;
		}

		const prev = { ...selectedNote };
		Object.assign(selectedNote, patch);

		try {
			const updated = await $fetch(`/api/notes/${id}`, {
				method: 'PATCH',
				body: patch,
			});

			sortFolderNotes(updated.folder_id)
			Object.assign(selectedNote, updated);
			notifications.success('Note updated');
		} catch {
			Object.assign(selectedNote, prev);
			notifications.error('Failed to update note');
		} finally {
			isSubmitting.value = false;
		}
	};

	// DELETE NOTE
	const deleteNote = async id => {
		const prev = [...folders.value];

		folders.value = folders.value.map(folder => ({
			...folder,
			notes: (folder.notes || []).filter(
				note => String(note.id) !== String(id),
			),
		}));

		try {
			await $fetch(`/api/notes/${id}`, { method: 'DELETE' });

			notifications.info('Note was deleted.');
		} catch {
			notifications.error('Failed to delete note. Try again');
			folders.value = prev;
		}
	};

	// TOGGLE FAVORITE
	const toggleFavorite = async id => {
		const note = findNote(id);

		if (!note) {
			notifications.error('Failed to star note. Try again');
			return;
		}

		const prevValue = note.is_favorite;
		note.is_favorite = !note.is_favorite;

		try {
			const updated = await $fetch(`/api/notes/${id}`, {
				method: 'PATCH',
				body: { is_favorite: note.is_favorite },
			});

			Object.assign(note, updated);
		} catch {
			note.is_favorite = prevValue;
			notifications.error('Failed to star note. Try again');
		}
	};

	// TOGGLE ARCHIVE
	// const toggleArchived = async id => {
	// 	const note = findNote(id);
	// 	if (!note) return;

	// 	const prevValue = note.is_archived;
	// 	note.is_archived = !note.is_archived;

	// 	try {
	// 		const updated = await $fetch(`/api/notes/${id}`, {
	// 			method: 'PATCH',
	// 			body: { is_archived: note.is_archived },
	// 		});

	// 		notes.value = updated;
	// 	} catch (err) {
	// 		note.is_archived = prevValue;
	// 		error.value = err.message;
	// 	}
	// };

	return {
		folders,
		allNotes,
		favoriteNotes,
		archivedNotes,
		loading,
		error,
		isSubmitting,

		fetchNotes,
		addNote,
		updateNote,
		findFolder,
		findNote,
		deleteNote,
		toggleFavorite,
	};
});
