<script setup lang="ts">
import { onMounted } from 'vue';
import BaseCard from "@/components/common/BaseCard.vue";
import ScrollList from "@/components/common/ScrollList.vue";
import { storeToRefs } from 'pinia';
import { useSommelierStore, UNITS } from '@/store/sommelier';
import type { IngredientKind, RecipeIngredient } from '@/store/sommelier';
import { useReferenceDataStore } from '@/store/referenceData';
import { useNotificationsStore } from '@/store/notifications';

const store = useSommelierStore();
const { ingredients } = storeToRefs(store);

const referenceData = useReferenceDataStore();
const { ingredients: catalog } = storeToRefs(referenceData);

const notifications = useNotificationsStore();

onMounted(() => {
    referenceData.loadIngredients();
});

/**
 * Looks up a row by index instead of using the `item` the ScrollList slot hands back —
 * WebStorm can't resolve ScrollList's generic `T` through a scoped slot, so `item` shows
 * up there typed only as `{ id: ItemId }`. Going through our own already-typed `ingredients`
 * array sidesteps that IDE limitation (vue-tsc has always inferred `item` correctly).
 */
const rowAt = (index: number): RecipeIngredient => ingredients.value[index];

const textColor = (kind: IngredientKind) => (kind === 'garnish' ? 'text-rose-500' : 'text-blue-600');

/** Allow "1,5" style decimal input, but keep only digits, one separator, and normalize it to "1.5" for storage. */
function onAmountInput(item: { amount: string }, event: Event) {
    const raw = (event.target as HTMLInputElement).value;
    item.amount = raw.replace(/[^0-9.,]/g, '').replace(',', '.');
}

/** If the typed name isn't in the catalog yet, add it there too, so it's remembered for next time. */
async function onNameBlur(item: RecipeIngredient) {
    const name = item.name.trim();
    if (!name) return;

    const exists = catalog.value.some((entry) => entry.name.toLowerCase() === name.toLowerCase());
    if (exists) return;

    try {
        await referenceData.createIngredient({ name, kind: item.kind, defaultUnit: item.unit || 'g' });
        notifications.notify('success', `Added "${name}" to the ingredient catalog.`);
    } catch (error) {
        console.error('Error saving new ingredient to catalog:', error);
        notifications.notify('error', `Couldn't save "${name}" to the ingredient catalog.`);
    }
}
</script>

<template>
    <BaseCard title="Ingredients" variant="secondary" class="md:col-span-2 lg:row-span-2"
              content-class="flex flex-col p-2 gap-2">
        <div class="flex-1 min-h-0">
            <ScrollList :items="ingredients">
                <template #item="{ index }">
                    <div class="group flex items-center gap-2 p-3.5">
                        <span class="w-5 shrink-0 text-right text-sm text-gray-400">{{ index + 1 }}.</span>
                        <input
                                :id="`ingredient-name-${rowAt(index).id}`"
                                v-model="rowAt(index).name"
                                type="text"
                                :name="`ingredient-name-${rowAt(index).id}`"
                                placeholder="Ingredient name"
                                class="min-w-0 flex-1 bg-transparent text-sm focus:outline-none"
                                :class="textColor(rowAt(index).kind)"
                                @blur="onNameBlur(rowAt(index))"
                        />
                        <input
                                :id="`ingredient-amount-${rowAt(index).id}`"
                                :value="rowAt(index).amount"
                                type="text"
                                inputmode="decimal"
                                :name="`ingredient-amount-${rowAt(index).id}`"
                                placeholder="amount"
                                class="w-14 shrink-0 bg-transparent text-right text-sm focus:outline-none"
                                :class="textColor(rowAt(index).kind)"
                                @input="onAmountInput(rowAt(index), $event)"
                        />
                        <select
                                :id="`ingredient-unit-${rowAt(index).id}`"
                                v-model="rowAt(index).unit"
                                :name="`ingredient-unit-${rowAt(index).id}`"
                                class="w-14 shrink-0 bg-transparent text-sm focus:outline-none"
                                :class="textColor(rowAt(index).kind)"
                        >
                            <option value="" disabled>unit</option>
                            <option v-for="unit in UNITS" :key="unit" :value="unit">{{ unit }}</option>
                        </select>
                        <select
                                :id="`ingredient-kind-${rowAt(index).id}`"
                                v-model="rowAt(index).kind"
                                :name="`ingredient-kind-${rowAt(index).id}`"
                                class="w-24 shrink-0 bg-transparent text-sm focus:outline-none"
                                :class="textColor(rowAt(index).kind)"
                        >
                            <option value="ingredient">ingredient</option>
                            <option value="garnish">garnish</option>
                        </select>
                        <button
                                type="button"
                                class="delete shrink-0 cursor-pointer text-gray-400 opacity-0 hover:text-red-500 group-hover:opacity-100 w-5 h-5"
                                aria-label="Remove ingredient"
                                @click="store.removeIngredient(rowAt(index).id)"
                        >
                        </button>
                    </div>
                </template>
            </ScrollList>
        </div>

        <button type="button"
                class="self-end bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 w-1/4 cursor-pointer font-bold"
                @click="store.addIngredient">
            Add ingredient
        </button>
    </BaseCard>
</template>

<style scoped lang="scss">
.delete {
    background: url("../assets/img/delete.svg") no-repeat;
    background-size: contain;
}
</style>
