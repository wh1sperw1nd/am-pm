<script setup lang="ts">
import { pluralize } from "@/utils/text.ts";
import CheckList from "@/components/common/CheckList.vue";
import BaseCard from "@/components/common/BaseCard.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore } from '@/store/sommelier';
import { TAGS } from '@/data/options';

const { tags: selectedTags } = storeToRefs(useSommelierStore());
</script>

<template>
    <BaseCard title="Tags" :description="pluralize(TAGS.length, 'tag')" class="max-h-100" content-class="h-72">
        <CheckList v-model="selectedTags" :items="TAGS"/>
    </BaseCard>
</template>

<style scoped lang="scss">

</style>
