import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ItemId } from '@/types/ui';
import type { Unit, IngredientKind, IRecipeIngredient } from '@/store/sommelier';

let nextIngredientRowId = 0;
const makeIngredientRow = (name = '', amount = '', unit: Unit = '', kind: IngredientKind = 'ingredient'): IRecipeIngredient => ({
	id: nextIngredientRowId++,
	name,
	amount,
	unit,
	kind,
});

/**
 * Coffee-recipe counterpart to `useSommelierStore`. Coffee's core chain (cup, coffee
 * type, roast strength, base) uses its own vocabulary and its own compatibility data,
 * so it isn't a good fit for the cocktail-specific fields on the sommelier store -
 * this mirrors that store's shape instead of reusing it.
 */
export const useBaristaStore = defineStore('barista', () => {
	const cup = ref<ItemId | null>(null);
	const coffeeType = ref<ItemId | null>(null);
	const strength = ref<ItemId | null>(null);
	const base = ref<ItemId | null>(null);

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

	function addIngredient() {
		ingredients.value.push(makeIngredientRow());
	}

	function removeIngredient(id: ItemId) {
		ingredients.value = ingredients.value.filter((item) => item.id !== id);
	}

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
		addIngredient,
		removeIngredient,
		toPayload,
		reset,
	};
});
