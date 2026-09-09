import {ref} from 'vue';
import {defineStore} from 'pinia';
import type {ItemId, IListItem} from '@/types/ui';
import {useReferenceDataStore} from '@/store/referenceData';
import {useCompatibilityFilter} from '@/utils/compatibilityFilter';
import type {IRecipeIngredient} from '@/types/ingredients';

export {UNITS, type Unit, type IngredientKind, type IRecipeIngredient} from '@/types/ingredients';

export const useSommelierStore = defineStore('sommelier', () => {
	const referenceData = useReferenceDataStore();

	const glass = ref<ItemId | null>(null);
	const cocktailType = ref<ItemId | null>(null);
	const strength = ref<ItemId | null>(null);
	const base = ref<ItemId | null>(null);

	const ingredients = ref<IRecipeIngredient[]>([]);

	const portions = ref(2);
	const doublePortions = ref(false);

	const cookingTime = ref(30);
	const extendedTime = ref(true);

	const complexity = ref(1);
	const uncategorized = ref(true);

	const method = ref<ItemId | null>('shaker');

	const decorations = ref<ItemId[]>([]);
	const tags = ref<ItemId[]>([]);

	const name = ref('');
	const altNames = ref('');
	const shortDescription = ref('');
	const instructions = ref('');

	/** Finds the slug of the item with the given id in `list`, or null if nothing is selected/found. */
	const slugOf = (list: IListItem[], id: ItemId | null) => list.find((item) => item.id === id)?.slug ?? null;

	/** Cocktail types allowed for the currently selected glass; unrestricted if the glass has no compatibility entry. */
	const availableCocktailTypes = useCompatibilityFilter(
		() => referenceData.cocktailTypes,
		() => glass.value as string | null, // glass is keyed by slug directly, not by id
		() => referenceData.glassTypeCompatibilityMap,
	);

	/** Strengths allowed for the currently selected cocktail type; unrestricted if the type has no compatibility entry. */
	const availableStrengths = useCompatibilityFilter(
		() => referenceData.strengths,
		() => slugOf(referenceData.cocktailTypes, cocktailType.value),
		() => referenceData.typeStrengthCompatibilityMap,
	);

	/** Base drinks allowed for the currently selected strength; unrestricted if the strength has no compatibility entry. */
	const availableBase = useCompatibilityFilter(
		() => referenceData.base,
		() => slugOf(referenceData.strengths, strength.value),
		() => referenceData.strengthBaseCompatibilityMap,
	);

	function toPayload() {
		return {
			glass: glass.value,
			cocktailType: cocktailType.value,
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
		glass.value = null;
		cocktailType.value = null;
		strength.value = null;
		base.value = null;
		ingredients.value = [];
		portions.value = 2;
		doublePortions.value = false;
		cookingTime.value = 30;
		extendedTime.value = true;
		complexity.value = 1;
		uncategorized.value = true;
		method.value = 'shaker';
		decorations.value = [];
		tags.value = [];
		name.value = '';
		altNames.value = '';
		shortDescription.value = '';
		instructions.value = '';
	}

	return {
		glass,
		cocktailType,
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
		availableCocktailTypes,
		availableStrengths,
		availableBase,
		toPayload,
		reset,
	};
});
