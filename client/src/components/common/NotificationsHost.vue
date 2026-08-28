<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useNotificationsStore, type NotificationType } from '@/store/notifications';

const store = useNotificationsStore();
const { items } = storeToRefs(store);

const colors: Record<NotificationType, string> = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-gray-700',
};
</script>

<template>
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2 w-72">
        <TransitionGroup name="notification">
            <div
                    v-for="item in items"
                    :key="item.id"
                    class="flex items-start justify-between gap-2 rounded-lg px-4 py-3 text-sm text-white shadow-lg cursor-pointer"
                    :class="colors[item.type]"
                    @click="store.dismiss(item.id)"
            >
                <span>{{ item.message }}</span>
            </div>
        </TransitionGroup>
    </div>
</template>

<style scoped>
.notification-enter-active,
.notification-leave-active {
    transition: all 0.2s ease;
}

.notification-enter-from,
.notification-leave-to {
    opacity: 0;
    transform: translateX(1rem);
}
</style>
