<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { pluralize } from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import OptionList from "@/components/common/OptionList.vue";
import type { IListItem, ItemId } from '@/types/ui';

const {
    title = 'Strength',
    items,
    unitLabel = 'strength',
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
    <BaseCard :title="title" :description="pluralize(items.length, unitLabel)" class="max-h-96"
              content-class="h-72">
        <OptionList v-model="selected" :items="items"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
