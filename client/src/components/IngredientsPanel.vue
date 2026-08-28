<script setup lang="ts">
import BaseCard from "@/components/common/BaseCard.vue";
import ScrollList from "@/components/common/ScrollList.vue";
import {storeToRefs} from 'pinia';
import {useSommelierStore} from '@/store/sommelier';
import type {IngredientKind} from '@/store/sommelier';

const store = useSommelierStore();
const {ingredients} = storeToRefs(store);

const textColor = (kind: IngredientKind) => (kind === 'garnish' ? 'text-rose-500' : 'text-blue-600');
</script>

<template>
	<BaseCard title="Ingredients" variant="secondary" class="md:col-span-2 lg:row-span-2"
			  content-class="flex flex-col p-2">
		<div class="flex-1 min-h-0">
			<ScrollList :items="ingredients">
				<template #item="{ item, index }">
					<div class="group flex items-center gap-2 p-3.5">
						<span class="w-5 shrink-0 text-right text-sm text-gray-400">{{ index + 1 }}.</span>
						<input
								:id="`ingredient-name-${item.id}`"
								v-model="item.name"
								type="text"
								:name="`ingredient-name-${item.id}`"
								placeholder="Ingredient name"
								class="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
								:class="textColor(item.kind)"
						/>
						<input
								:id="`ingredient-amount-${item.id}`"
								v-model="item.amount"
								type="text"
								:name="`ingredient-amount-${item.id}`"
								placeholder="amount"
								class="w-20 shrink-0 bg-transparent text-right text-sm focus:outline-none"
								:class="textColor(item.kind)"
						/>
						<button
								type="button"
								class="delete shrink-0 cursor-pointer text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100 w-5 h-5"
								aria-label="Remove ingredient"
								@click="store.removeIngredient(item.id)"
						>
						</button>
					</div>
				</template>
			</ScrollList>
		</div>

		<button type="button"
				class="mt-2 shrink-0 cursor-pointer self-start px-2 text-sm text-gray-500 hover:text-blue-600"
				@click="store.addIngredient">
			add ingredient
		</button>
	</BaseCard>
</template>

<style scoped lang="scss">
.delete {
	background: url("../assets/img/delete.svg") no-repeat;
	background-size: contain;
}
</style>
