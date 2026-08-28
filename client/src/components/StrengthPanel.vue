<script setup lang="ts">
import {pluralize} from "@/utils/text.ts";
import BaseCard from "@/components/common/BaseCard.vue";
import OptionList from "@/components/common/OptionList.vue";
import {storeToRefs} from 'pinia';
import {useSommelierStore} from '@/store/sommelier';
import {STRENGTHS} from '@/data/options';

const {strength: selectedStrength} = storeToRefs(useSommelierStore());
</script>

<template>
	<BaseCard title="Strength" :description="pluralize(STRENGTHS.length, 'strength')" class="max-h-100"
			  content-class="h-72">
		<OptionList v-model="selectedStrength" :items="STRENGTHS"/>
	</BaseCard>
</template>

<style scoped lang="scss">

</style>
