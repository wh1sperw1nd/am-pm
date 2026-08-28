<script setup lang="ts">
import { onMounted } from 'vue';
import { pluralize } from "@/utils/text.ts";
import OptionList from "@/components/common/OptionList.vue";
import BaseCard from "@/components/common/BaseCard.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { METHODS } from '@/data/options';
import { useReferenceDataStore } from "@/store/referenceData.ts";

const store = useSommelierStore();
const { method: selectedMethod } = storeToRefs(store);

const referenceData = useReferenceDataStore();
const { methods } = storeToRefs(referenceData);

onMounted(() => {
    referenceData.loadMethods();
});

</script>

<template>
    <BaseCard title="Method" :description="pluralize(METHODS.length, 'method')" variant="accent" content-class="h-40">
        <OptionList v-model="selectedMethod" :items="methods"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
