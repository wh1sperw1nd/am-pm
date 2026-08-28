<script setup lang="ts">
import { pluralize } from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import CheckList from "@/components/common/CheckList.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { DECORATIONS } from '@/data/options';

const { decorations: selectedDecorations } = storeToRefs(useSommelierStore());
</script>

<template>
    <BaseCard title="Decorations" :description="pluralize(DECORATIONS.length, 'decoration')" class="max-h-100"
              content-class="h-72">
        <CheckList v-model="selectedDecorations" :items="DECORATIONS"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
