<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { pluralize } from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import OptionList from "@/components/common/OptionList.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { useReferenceDataStore } from '@/store/referenceData';

const store = useSommelierStore();
const { strength: selectedStrength, availableStrengths } = storeToRefs(store);

const referenceData = useReferenceDataStore();

watch(availableStrengths, (items) => {
    if (selectedStrength.value !== null && !items.some((item) => item.id === selectedStrength.value)) {
        selectedStrength.value = null;
    }
});

onMounted(() => {
    referenceData.loadStrengths();
    referenceData.loadTypeStrengthCompatibility();
});

</script>

<template>
    <BaseCard title="Strength" :description="pluralize(availableStrengths.length, 'strength')" class="max-h-96"
              content-class="h-72">
        <OptionList v-model="selectedStrength" :items="availableStrengths"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
