<script setup lang="ts">
import ScrollList from '@/components/common/ScrollList.vue';
import type { ItemId, ListItem } from '@/types/ui.ts';

defineProps<{ items: ListItem[] }>();

const selected = defineModel<ItemId | null>({ default: null });
</script>

<template>
    <ScrollList :items="items">
        <template #item="{ item }">
            <button
                    type="button"
                    class="flex justify-between w-full text-left cursor-pointer p-3.5 hover:bg-gray-200"
                    :class="selected === item.id ? 'bg-gray-200 font-semibold' : 'text-gray-700'"
                    @click="selected = item.id"
            >
                <span>{{ item.label }}</span>
                <span v-if="item.hint">{{ item.hint }}</span>
            </button>
        </template>
    </ScrollList>
</template>
