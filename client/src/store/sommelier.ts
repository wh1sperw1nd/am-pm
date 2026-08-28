import {computed, ref} from 'vue';
import {defineStore} from 'pinia';
import type {ItemId} from '@/types/ui';
import {COCKTAIL_TYPES, GLASS_TYPE_COMPATIBILITY} from '@/data/options';

export type IngredientKind = 'ingredient' | 'garnish';

export interface Ingredient {
	id: number;
	name: string;
	amount: string;
	kind: IngredientKind;
}

let nextIngredientId = 0;
const makeIngredient = (name: string, amount: string, kind: IngredientKind = 'ingredient'): Ingredient => ({
	id: nextIngredientId++,
	name,
	amount,
	kind,
});

const defaultIngredients = (): Ingredient[] => [
	makeIngredient('Rowan liqueur (cognac-based)', '1 tbsp'),
	makeIngredient('Brandy', '100 ml'),
	makeIngredient('Cocktail cherry', '1 pc', 'garnish'),
];

export const useSommelierStore = defineStore('sommelier', () => {
	const glass = ref<ItemId | null>(null);
	const cocktailType = ref<ItemId | null>(null);
	const strength = ref<ItemId | null>(null);
	const base = ref<ItemId | null>(null);

	const ingredients = ref<Ingredient[]>(defaultIngredients());

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

	/** Cocktail types allowed for the currently selected glass; unrestricted if the glass has no compatibility entry. */
	const availableCocktailTypes = computed(() => {
		if (glass.value === null) return COCKTAIL_TYPES;
		const allowed = GLASS_TYPE_COMPATIBILITY[glass.value];
		if (!allowed) return COCKTAIL_TYPES;
		return COCKTAIL_TYPES.filter((type) => allowed.includes(type.id));
	});

	function addIngredient() {
		ingredients.value.push(makeIngredient('', ''));
	}

	function removeIngredient(id: number) {
		ingredients.value = ingredients.value.filter((item) => item.id !== id);
	}

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
		ingredients.value = defaultIngredients();
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
		addIngredient,
		removeIngredient,
		toPayload,
		reset,
	};
});
