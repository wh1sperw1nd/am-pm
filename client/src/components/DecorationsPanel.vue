<script setup lang="ts">
import { onMounted } from 'vue';
import { pluralize } from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import CheckList from "@/components/common/CheckList.vue";
import { storeToRefs } from 'pinia';
import { useReferenceDataStore } from "@/store/referenceData.ts";
import type { ItemId } from '@/types/ui.ts';

const selectedDecorations = defineModel<ItemId[]>({ default: (): ItemId[] => [] });

const referenceData = useReferenceDataStore();
const { decorations } = storeToRefs(referenceData);

onMounted(() => {
    referenceData.loadDecorations();
});

</script>

<template>
    <BaseCard title="Decorations" :description="pluralize(decorations.length, 'decoration')" class="max-h-96"
              content-class="h-72">
        <CheckList v-model="selectedDecorations" :items="decorations"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
