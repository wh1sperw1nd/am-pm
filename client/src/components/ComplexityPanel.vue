<script setup lang="ts">
import BaseCard from "@/components/common/BaseCard.vue";
import GradientScale from "@/components/common/GradientScale.vue";
import CheckboxField from "@/components/common/CheckboxField.vue";

const complexity = defineModel<number>('complexity', { default: 1 });
const uncategorized = defineModel<boolean>('uncategorized', { default: true });
</script>

<template>
    <BaseCard title="Complexity" variant="accent" class-name="bg-gray-200">
        <GradientScale v-model="complexity" :min="0" :max="10" label="Complexity"/>
        <template #footer>
            <CheckboxField v-model="uncategorized">uncategorized</CheckboxField>
        </template>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
