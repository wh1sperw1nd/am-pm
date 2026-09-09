<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { pluralize } from "@/utils/text.ts";
import OptionList from "@/components/common/OptionList.vue";
import BaseCard from "@/components/common/BaseCard.vue";
import type { IListItem, ItemId } from '@/types/ui';

const {
    title = 'Method',
    items,
    unitLabel = 'method',
    load,
} = defineProps<{
    title?: string;
    items: IListItem[];
    unitLabel?: string;
    load?: () => Promise<void> | void;
}>();

const selected = defineModel<ItemId | null>({ default: null });

watch(() => items, (available) => {
    if (selected.value !== null && !available.some((item) => item.id === selected.value)) {
        selected.value = null;
    }
});

onMounted(() => {
    load?.();
});
</script>

<template>
    <BaseCard :title="title" :description="pluralize(items.length, unitLabel)" variant="accent" content-class="h-40">
        <OptionList v-model="selected" :items="items"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
