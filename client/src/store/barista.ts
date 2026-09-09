import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ItemId, IListItem } from '@/types/ui';
import type { IRecipeIngredient } from '@/types/ingredients';
import { useReferenceDataStore } from '@/store/referenceData';
import { useCompatibilityFilter } from '@/utils/compatibilityFilter';

/**
 * Coffee-recipe counterpart to `useSommelierStore`. Coffee's core chain (cup, coffee
 * type, roast strength, base) uses its own vocabulary and its own compatibility data,
 * so it isn't a good fit for the cocktail-specific fields on the sommelier store -
 * this mirrors that store's shape instead of reusing it.
 */
export const useBaristaStore = defineStore('barista', () => {
	const referenceData = useReferenceDataStore();

	const cup = ref<ItemId | null>(null);
	const coffeeType = ref<ItemId | null>(null);
	const strength = ref<ItemId | null>(null);
	const base = ref<ItemId | null>(null);

	/** Finds the slug of the item with the given id in `list`, or null if nothing is selected/found. */
	const slugOf = (list: IListItem[], id: ItemId | null) => list.find((item) => item.id === id)?.slug ?? null;

	/** Coffee types allowed for the currently selected cup; unrestricted if the cup has no compatibility entry. */
	const availableCoffeeTypes = useCompatibilityFilter(
		() => referenceData.coffeeTypes,
		() => cup.value as string | null, // cup is keyed by slug directly, not by id
		() => referenceData.cupTypeCompatibilityMap,
	);

	/**
	 * Base drinks allowed for the currently selected strength; unrestricted if the strength has
	 * no compatibility entry. Reuses the shared strength/base data - alcohol tier and spirit
	 * aren't cocktail-specific concepts, so the same compatibility map applies to a boozy coffee.
	 */
	const availableBase = useCompatibilityFilter(
		() => referenceData.base,
		() => slugOf(referenceData.strengths, strength.value),
		() => referenceData.strengthBaseCompatibilityMap,
	);

	const ingredients = ref<IRecipeIngredient[]>([]);

	const portions = ref(2);
	const doublePortions = ref(false);

	const cookingTime = ref(30);
	const extendedTime = ref(true);

	const complexity = ref(1);
	const uncategorized = ref(true);

	const method = ref<ItemId | null>(null);

	const decorations = ref<ItemId[]>([]);
	const tags = ref<ItemId[]>([]);

	const name = ref('');
	const altNames = ref('');
	const shortDescription = ref('');
	const instructions = ref('');

	function toPayload() {
		return {
			cup: cup.value,
			coffeeType: coffeeType.value,
			strength: strength.value,
			base: base.value,
			ingredients: ingredients.value,
			portions: portions.value + (doublePortions.value ? 2 : 0),
			cookingTime: cookingTime.value,
			extendedTime: extendedTime.value,
			complexity: uncategorized.value ? null : complexity.value,
			method: method.value,
			decorations: decorations.value,
			tags: tags.value,
			description: {
				name: name.value,
				altNames: altNames.value,
				shortDescription: shortDescription.value,
				instructions: instructions.value,
			},
		};
	}

	function reset() {
		cup.value = null;
		coffeeType.value = null;
		strength.value = null;
		base.value = null;
		ingredients.value = [];
		portions.value = 2;
		doublePortions.value = false;
		cookingTime.value = 30;
		extendedTime.value = true;
		complexity.value = 1;
		uncategorized.value = true;
		method.value = null;
		decorations.value = [];
		tags.value = [];
		name.value = '';
		altNames.value = '';
		shortDescription.value = '';
		instructions.value = '';
	}

	return {
		cup,
		coffeeType,
		strength,
		base,
		availableCoffeeTypes,
		availableBase,
		ingredients,
		portions,
		doublePortions,
		cookingTime,
		extendedTime,
		complexity,
		uncategorized,
		method,
		decorations,
		tags,
		name,
		altNames,
		shortDescription,
		instructions,
		toPayload,
		reset,
	};
});
