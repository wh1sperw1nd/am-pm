<script setup lang="ts">
import { pluralize } from "@/utils/text.ts";
import OptionList from "@/components/common/OptionList.vue";
import BaseCard from "@/components/common/BaseCard.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { METHODS } from '@/data/options';

const { method: selectedMethod } = storeToRefs(useSommelierStore());
</script>

<template>
    <BaseCard title="Method" :description="pluralize(METHODS.length, 'method')" variant="accent" content-class="h-40">
        <OptionList v-model="selectedMethod" :items="METHODS"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
