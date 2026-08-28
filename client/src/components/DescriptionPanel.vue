<script setup lang="ts">
import {computed, ref, useId} from "vue";
import BaseCard from "@/components/common/BaseCard.vue";
import {storeToRefs} from 'pinia';
import {useSommelierStore} from '@/store/sommelier';

const uid = useId();

const SHORT_DESCRIPTION = 'shortDescription';
const INSTRUCTIONS = 'instructions';
type Tab = typeof SHORT_DESCRIPTION | typeof INSTRUCTIONS;

const tabs: { id: Tab; label: string }[] = [
	{id: SHORT_DESCRIPTION, label: 'Short description'},
	{id: INSTRUCTIONS, label: 'Preparation instructions'},
];

const {name, altNames, shortDescription, instructions} = storeToRefs(useSommelierStore());

const activeTab = ref<Tab>(SHORT_DESCRIPTION);
const activeText = computed({
	get: () => (activeTab.value === SHORT_DESCRIPTION ? shortDescription.value : instructions.value),
	set: (value: string) => {
		if (activeTab.value === SHORT_DESCRIPTION) shortDescription.value = value;
		else instructions.value = value;
	},
});

const inputClass =
	'w-full rounded-sm border border-gray-300 bg-gray-50 px-3 py-2 text-sm italic text-gray-500 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500';
</script>

<template>
	<BaseCard title="Description" variant="secondary" class="md:col-span-2 lg:max-h-100"
			  content-class="h-72 flex flex-col p-3">
		<input :id="`${uid}-name`" v-model="name" type="text" name="name" placeholder="Name" class="mb-2"
			   :class="inputClass"/>
		<input :id="`${uid}-alt-names`" v-model="altNames" type="text" name="alt-names"
			   placeholder="Alternative names, comma separated" class="mb-2" :class="inputClass"/>

		<div class="flex gap-1">
			<button
				v-for="tab in tabs"
				:key="tab.id"
				type="button"
				class="cursor-pointer rounded-t border border-b-0 border-gray-300 px-3 py-1.5 text-sm"
				:class="activeTab === tab.id ? 'bg-white font-semibold text-gray-800' : 'bg-gray-200 text-gray-500 hover:bg-gray-100'"
				@click="activeTab = tab.id"
			>
				{{ tab.label }}
			</button>
		</div>

		<textarea
			:id="`${uid}-${activeTab}`"
			v-model="activeText"
			:name="activeTab"
			class="w-full flex-1 resize-none rounded-b rounded-tr border border-gray-300 bg-white p-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
		></textarea>
	</BaseCard>
</template>

<style scoped lang="scss">

</style>
