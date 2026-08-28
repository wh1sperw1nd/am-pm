<script setup lang="ts">
import { onMounted } from 'vue';
import { pluralize } from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import CheckList from "@/components/common/CheckList.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { useReferenceDataStore } from "@/store/referenceData.ts";


const store = useSommelierStore();
const { decorations: selectedDecorations } = storeToRefs(store);

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
