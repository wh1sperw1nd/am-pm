<script setup lang="ts">
import BaseCard from "@/components/common/BaseCard.vue";
import TickScale from "@/components/common/TickScale.vue";
import CheckboxField from "@/components/common/CheckboxField.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { TIME_VALUES } from '@/data/options';

const { cookingTime, extendedTime } = storeToRefs(useSommelierStore());
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
