<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BaseCard from "@/components/common/BaseCard.vue";
import ScrollList from "@/components/common/ScrollList.vue";
import { storeToRefs } from 'pinia';
import { UNITS, makeIngredientRow, type IngredientKind, type IRecipeIngredient } from '@/types/ingredients';
import { useReferenceDataStore } from '@/store/referenceData';
import { useNotificationsStore } from '@/store/notifications';
import type { IIngredientCatalogItem } from '@/actions/Ingredients';

const ingredients = defineModel<IRecipeIngredient[]>({ default: (): IRecipeIngredient[] => [] });

const referenceData = useReferenceDataStore();
const { ingredients: catalog } = storeToRefs(referenceData);

const notifications = useNotificationsStore();

/** Id of the row whose name-suggestions dropdown is currently open, if any. */
const openSuggestionsFor = ref<IRecipeIngredient['id'] | null>(null);

onMounted(() => {
    referenceData.loadIngredients();
});

/**
 * Looks up a row by index instead of using the `item` the ScrollList slot hands back —
 * WebStorm can't resolve ScrollList's generic `T` through a scoped slot, so `item` shows
 * up there typed only as `{ id: ItemId }`. Going through our own already-typed `ingredients`
 * array sidesteps that IDE limitation (vue-tsc has always inferred `item` correctly).
 */
const rowAt = (index: number): IRecipeIngredient => ingredients.value[index];

const textColor = (kind: IngredientKind) => (kind === 'garnish' ? 'text-rose-500' : 'text-blue-600');

/** Allow "1,5" style decimal input, but keep only digits, one separator, and normalize it to "1.5" for storage. */
function onAmountInput(item: { amount: string }, event: Event) {
    const raw = (event.target as HTMLInputElement).value;
    item.amount = raw.replace(/[^0-9.,]/g, '').replace(',', '.');
}

/** Catalog entries whose name contains the typed text, for the suggestion dropdown. */
function matchingCatalog(name: string): IIngredientCatalogItem[] {
    const query = name.trim().toLowerCase();
    if (!query) return [];
    return catalog.value.filter((entry) => entry.name.toLowerCase().includes(query)).slice(0, 8);
}

/** Fills a row in from a picked catalog entry and closes the suggestion dropdown. */
function selectCatalogEntry(item: IRecipeIngredient, entry: IIngredientCatalogItem) {
    item.name = entry.name;
    item.kind = entry.kind;
    if ((UNITS as readonly string[]).includes(entry.defaultUnit)) {
        item.unit = entry.defaultUnit as IRecipeIngredient['unit'];
    }
    openSuggestionsFor.value = null;
}

/** If the typed name matches a catalog entry, reuse its kind/unit; otherwise add it to the catalog for next time. */
async function onNameBlur(item: IRecipeIngredient) {
    openSuggestionsFor.value = null;

    const name = item.name.trim();
    if (!name) return;

    const match = catalog.value.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
    if (match) {
        item.kind = match.kind;
        if (!item.unit && (UNITS as readonly string[]).includes(match.defaultUnit)) {
            item.unit = match.defaultUnit as IRecipeIngredient['unit'];
        }
        return;
    }

    try {
        await referenceData.createIngredient({ name, kind: item.kind, defaultUnit: item.unit || 'g' });
        notifications.notify('success', `Added "${name}" to the ingredient catalog.`);
    } catch (error) {
        console.error('Error saving new ingredient to catalog:', error);
        notifications.notify('error', `Couldn't save "${name}" to the ingredient catalog.`);
    }
}

function addIngredient() {
    ingredients.value = [...ingredients.value, makeIngredientRow()];
}

function removeIngredient(id: IRecipeIngredient['id']) {
    ingredients.value = ingredients.value.filter((item) => item.id !== id);
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
                        <div class="relative min-w-0 flex-1">
                            <input
                                    :id="`ingredient-name-${rowAt(index).id}`"
                                    v-model="rowAt(index).name"
                                    type="text"
                                    :name="`ingredient-name-${rowAt(index).id}`"
                                    placeholder="Ingredient name"
                                    autocomplete="off"
                                    class="min-w-0 w-full bg-transparent text-sm focus:outline-none"
                                    :class="textColor(rowAt(index).kind)"
                                    @focus="openSuggestionsFor = rowAt(index).id"
                                    @input="openSuggestionsFor = rowAt(index).id"
                                    @blur="onNameBlur(rowAt(index))"
                            />
                            <ul v-if="openSuggestionsFor === rowAt(index).id && matchingCatalog(rowAt(index).name).length"
                                class="absolute z-10 top-full left-0 mt-1 w-full max-h-40 overflow-auto rounded border border-gray-300 bg-white shadow-md">
                                <li v-for="entry in matchingCatalog(rowAt(index).name)" :key="entry.id"
                                    class="px-2 py-1.5 text-sm cursor-pointer hover:bg-gray-100"
                                    :class="textColor(entry.kind)"
                                    @mousedown.prevent="selectCatalogEntry(rowAt(index), entry)">
                                    {{ entry.name }}
                                </li>
                            </ul>
                        </div>
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
                                @click="removeIngredient(rowAt(index).id)"
                        >
                        </button>
                    </div>
                </template>
            </ScrollList>
        </div>

        <button type="button"
                class="self-end bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 w-1/4 cursor-pointer font-bold"
                @click="addIngredient">
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
