<script setup lang="ts">
import { useId } from 'vue';
import ScrollList from '@/components/common/ScrollList.vue';
import type { ItemId, ListItem } from '@/types/ui.ts';

defineProps<{ items: ListItem[] }>();

const selected = defineModel<ItemId[]>({ default: () => [] });
const uid = useId();
</script>

<template>
    <ScrollList :items="items">
        <template #item="{ item }">
            <label :for="`${uid}-${item.id}`"
                   class="relative p-3.5 flex gap-2 cursor-pointer items-center select-none hover:bg-gray-200"
                   :class="selected.includes(item.id) ? 'bg-gray-200' : 'text-gray-700'">
                <input
                        :id="`${uid}-${item.id}`"
                        v-model="selected"
                        :value="item.id"
                        type="checkbox"
                        class="sr-only peer"
                />
                <span class="w-6 h-6 rounded-md border-2 border-gray-300 flex items-center justify-center text-transparent peer-checked:bg-blue-500 peer-checked:text-white transition-all duration-200 bg-white">
				 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
				 </svg>
				</span>
                <span class="text-sm text-gray-600">{{ item.name }}</span>
            </label>
        </template>
    </ScrollList>
</template>
