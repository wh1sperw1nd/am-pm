import { ref } from 'vue';
import { defineStore } from 'pinia';

export type NotificationType = 'success' | 'error' | 'info';

export interface INotification {
	id: number;
	type: NotificationType;
	message: string;
}

const DEFAULT_DURATION_MS = 4000;

export const useNotificationsStore = defineStore('notifications', () => {
	const items = ref<INotification[]>([]);
	let nextId = 0;

	function notify(type: NotificationType, message: string, duration = DEFAULT_DURATION_MS) {
		const id = nextId++;
		items.value.push({ id, type, message });
		setTimeout(() => dismiss(id), duration);
	}

	function dismiss(id: number) {
		items.value = items.value.filter((item) => item.id !== id);
	}

	return { items, notify, dismiss };
});
