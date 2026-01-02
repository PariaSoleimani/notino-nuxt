import { v4 as uuidv4 } from 'uuid';

export const useNotificationsStore = defineStore('notifications', () => {
	const notifications = ref([]);

	const push = (payload = {}) => {
		const toast = {
			id: uuidv4(),
			type: payload.type || 'error', // 'success' | 'error'
			message: payload.message || '',
			timeout: payload.timeout || 2000,
			createdAt: Date.now(),
		};

		notifications.value.push(toast);

		if (toast.timeout > 0) {
			setTimeout(() => remove(toast.id), toast.timeout);
		}

		return toast.id;
	};

	const remove = id => {
		notifications.value = notifications.value.filter(item => item.id !== id);
	};

	// const clear = () => {
	// 	notifications.value = [];
	// };

	const success = message => {
		return push({ type: 'success', message });
	};

	const error = message => {
		return push({ type: 'error', message });
	};

	const info = message => {
		return push({ type: 'info', message });
	};
	return {
		notifications,

		push,
		success,
		error,
		info
	};
});
