<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { pluralize } from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import OptionList from "@/components/common/OptionList.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { useReferenceDataStore } from "@/store/referenceData.ts";

const store = useSommelierStore();
const { base: selectedDrinkType, availableBase } = storeToRefs(store);

const referenceData = useReferenceDataStore();

watch(availableBase, (items) => {
    if (selectedDrinkType.value !== null && !items.some((item) => item.id === selectedDrinkType.value)) {
        selectedDrinkType.value = null;
    }
});

onMounted(() => {
    referenceData.loadBaseDrinks();
    referenceData.loadStrengthBaseCompatibility();
});

</script>

<template>
    <BaseCard title="Base" :description="pluralize(availableBase.length, 'drink')" class="max-h-96" content-class="h-72">
        <OptionList v-model="selectedDrinkType" :items="availableBase"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
