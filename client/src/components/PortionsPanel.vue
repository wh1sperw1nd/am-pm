<script setup lang="ts">
import BaseCard from "@/components/common/BaseCard.vue";
import TickScale from "@/components/common/TickScale.vue";
import CheckboxField from "@/components/common/CheckboxField.vue";
import { PORTION_VALUES } from '@/data/options';

const portions = defineModel<number>('portions', { default: PORTION_VALUES[0] });
const doublePortions = defineModel<boolean>('doublePortions', { default: false });
</script>

<template>
    <BaseCard title="Portions" variant="accent" class-name="bg-gray-200">
        <TickScale v-model="portions" :values="PORTION_VALUES"/>
        <template #footer>
            <CheckboxField v-model="doublePortions">+2 portions</CheckboxField>
        </template>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
