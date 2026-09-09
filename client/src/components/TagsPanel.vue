<script setup lang="ts">
import { onMounted } from 'vue';
import { pluralize } from "@/utils/text.ts";
import CheckList from "@/components/common/CheckList.vue";
import BaseCard from "@/components/common/BaseCard.vue";
import { storeToRefs } from 'pinia';
import { useReferenceDataStore } from "@/store/referenceData.ts";
import type { ItemId } from '@/types/ui.ts';

const selectedTags = defineModel<ItemId[]>({ default: (): ItemId[] => [] });

const referenceData = useReferenceDataStore();
const { tags } = storeToRefs(referenceData);

onMounted(() => {
    referenceData.loadTags();
});

</script>

<template>
    <BaseCard title="Tags" :description="pluralize(tags.length, 'tag')" class="max-h-96" content-class="h-72">
        <CheckList v-model="selectedTags" :items="tags"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
