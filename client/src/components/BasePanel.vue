<script setup lang="ts">
import {pluralize} from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import OptionList from "@/components/common/OptionList.vue";
import {storeToRefs} from 'pinia';
import {useSommelierStore} from '@/store/sommelier';
import {BASE_DRINKS} from '@/data/options';

const {base: selectedDrinkType} = storeToRefs(useSommelierStore());
</script>

<template>
	<BaseCard title="Base" :description="pluralize(BASE_DRINKS.length, 'drink')" class="max-h-100" content-class="h-72">
		<OptionList v-model="selectedDrinkType" :items="BASE_DRINKS"/>
	</BaseCard>
</template>

<style scoped lang="scss">

</style>
