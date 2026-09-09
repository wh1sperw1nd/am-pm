<script setup lang="ts">
import BaseCard from "@/components/common/BaseCard.vue";
import TickScale from "@/components/common/TickScale.vue";
import CheckboxField from "@/components/common/CheckboxField.vue";
import { TIME_VALUES } from '@/data/options';

const cookingTime = defineModel<number>('cookingTime', { default: TIME_VALUES[0] });
const extendedTime = defineModel<boolean>('extendedTime', { default: false });
</script>

<template>
    <BaseCard title="Cooking time" variant="accent" class-name="bg-gray-200">
        <TickScale v-model="cookingTime" :values="TIME_VALUES"/>
        <template #footer>
            <CheckboxField v-model="extendedTime">extended time</CheckboxField>
        </template>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
