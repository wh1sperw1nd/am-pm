<script setup lang="ts">
import BaseCard from '@/components/common/BaseCard.vue';
import OptionList from '@/components/common/OptionList.vue';
import {pluralize} from "@/utils/text.ts";
import {storeToRefs} from 'pinia';
import {useSommelierStore} from '@/store/sommelier';
import {watch} from 'vue';

const store = useSommelierStore();
const {cocktailType: selectedCocktail, availableCocktailTypes} = storeToRefs(store);

watch(availableCocktailTypes, (types) => {
	if (selectedCocktail.value !== null && !types.some((type) => type.id === selectedCocktail.value)) {
		selectedCocktail.value = null;
	}
});
</script>

<template>
	<BaseCard title="Type" :description="pluralize(availableCocktailTypes.length, 'type')" class="max-h-100"
			  content-class="h-72">
		<OptionList v-model="selectedCocktail" :items="availableCocktailTypes"/>
	</BaseCard>
</template>

<style scoped lang="scss">

</style>
