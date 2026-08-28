<script setup lang="ts" generic="T extends { id: ItemId }">
import type { ItemId } from '@/types/ui.ts';

defineProps<{ items: T[] }>();
defineSlots<{ item(props: { item: T; index: number }): unknown }>();
</script>

<template>
    <ul class="h-full overflow-auto">
        <li v-for="(item, index) in items" :key="item.id" class="border-b-2 border-b-gray-300">
            <slot name="item" :item="item" :index="index"/>
        </li>
    </ul>
</template>
