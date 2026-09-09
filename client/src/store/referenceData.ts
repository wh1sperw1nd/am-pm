import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IListItem } from '@/types/ui';
import { GLASS_TYPES, CUP_TYPES, COCKTAIL_TYPES, COFFEE_TYPES, STRENGTHS, GLASS_TYPE_COMPATIBILITY, COFFEE_METHODS } from '@/data/options';
import { fetchGlasses } from '@/actions/glasses';
import { fetchCups } from '@/actions/cups';
import { fetchCocktailTypes } from '@/actions/cocktailTypes';
import { fetchStrengths } from '@/actions/strength';
import { fetchGlassTypeCompatibility } from '@/actions/glassTypeCompatibility';
import { fetchTypeStrengthCompatibility } from '@/actions/typeStrengthCompatibility';
import { fetchStrengthBaseCompatibility } from '@/actions/strengthBaseCompatibility';
import { fetchBaseDrinks } from "@/actions/baseDrinks.ts";
import { fetchMethods } from "@/actions/methods.ts";
import { fetchTags } from "@/actions/tags.ts";
import { fetchDecorations } from "@/actions/decorations.ts";
import { fetchIngredients, createIngredient as createIngredientRequest, updateIngredient as updateIngredientRequest, type IIngredientCatalogItem, type INewIngredient, type IIngredientUpdate } from "@/actions/Ingredients.ts";
import { fetchRecipes, type IRecipe } from "@/actions/recipes";
import { fetchCoffeeTypes } from "@/actions/coffeeTypes.ts";
import { fetchCoffeeMethods } from "@/actions/coffeeMethods.ts";
import { fetchCupTypeCompatibility } from "@/actions/cupTypeCompatibility.ts";

function useFetchableList<T>(fallback: T, fetcher: () => Promise<T>, label: string) {
	const data = ref<T>(fallback);

	async function load() {
		try {
			data.value = await fetcher();
		} catch (error) {
			console.error(`Error fetching ${label}, using fallback:`, error);
		}
	}

	return { data, load };
}

export const useReferenceDataStore = defineStore('referenceData', () => {
	const { data: glasses, load: loadGlasses } = useFetchableList<IListItem[]>(GLASS_TYPES, fetchGlasses, 'glasses');

	const { data: cups, load: loadCups } = useFetchableList<IListItem[]>(CUP_TYPES, fetchCups, 'cups');

	const { data: cocktailTypes, load: loadCocktailTypes } = useFetchableList<IListItem[]>(COCKTAIL_TYPES, fetchCocktailTypes, 'cocktail types');

	const { data: coffeeTypes, load: loadCoffeeTypes } = useFetchableList<IListItem[]>(COFFEE_TYPES, fetchCoffeeTypes, 'coffee types');

	const { data: strengths, load: loadStrengths } = useFetchableList<IListItem[]>(STRENGTHS, fetchStrengths, 'strengths');

	const { data: base, load: loadBaseDrinks } = useFetchableList<IListItem[]>([], fetchBaseDrinks, 'base drinks');

	const { data: methods, load: loadMethods } = useFetchableList<IListItem[]>([], fetchMethods, 'methods');

	const { data: coffeeMethods, load: loadCoffeeMethods } = useFetchableList<IListItem[]>(COFFEE_METHODS, fetchCoffeeMethods, 'coffee methods');

	const { data: tags, load: loadTags } = useFetchableList<IListItem[]>([], fetchTags, 'tags');

	const { data: decorations, load: loadDecorations } = useFetchableList<IListItem[]>([], fetchDecorations, 'decorations');

	const { data: ingredients, load: loadIngredients } = useFetchableList<IIngredientCatalogItem[]>([], fetchIngredients, 'ingredients');

	const { data: recipes, load: loadRecipes } = useFetchableList<IRecipe[]>([], fetchRecipes, 'recipes');

	/** Creates a new catalog ingredient on the server and appends it to the loaded list. */
	async function createIngredient(ingredient: INewIngredient) {
		const created = await createIngredientRequest(ingredient);
		if (!ingredients.value.some((entry) => entry.id === created.id)) {
			ingredients.value.push(created);
		}
		return created;
	}

	/** Saves an edit to a catalog ingredient on the server and updates it in the loaded list. */
	async function updateIngredient(id: number, update: IIngredientUpdate) {
		const updated = await updateIngredientRequest(id, update);
		const index = ingredients.value.findIndex((entry) => entry.id === id);
		if (index !== -1) ingredients.value[index] = updated;
		return updated;
	}

	const { data: glassTypeCompatibilityMap, load: loadGlassTypeCompatibility } = useFetchableList<Record<string, string[]>>(GLASS_TYPE_COMPATIBILITY, fetchGlassTypeCompatibility, 'glass/type compatibility');

	const { data: typeStrengthCompatibilityMap, load: loadTypeStrengthCompatibility } =	useFetchableList<Record<string, string[]>>({}, fetchTypeStrengthCompatibility, 'type/strength compatibility');

	const { data: strengthBaseCompatibilityMap, load: loadStrengthBaseCompatibility } =	useFetchableList<Record<string, string[]>>({}, fetchStrengthBaseCompatibility, 'strength/base compatibility');

	const { data: cupTypeCompatibilityMap, load: loadCupTypeCompatibility } = useFetchableList<Record<string, string[]>>({}, fetchCupTypeCompatibility, 'cup/type compatibility');

	/** Cocktail types plus the compatibility map that filters them by selected glass. */
	async function loadCocktailTypesWithCompatibility() {
		await Promise.all([loadCocktailTypes(), loadGlassTypeCompatibility()]);
	}

	/** Strengths plus the compatibility map that filters them by selected type. */
	async function loadStrengthsWithCompatibility() {
		await Promise.all([loadStrengths(), loadTypeStrengthCompatibility()]);
	}

	/** Base drinks plus the compatibility map that filters them by selected strength. */
	async function loadBaseDrinksWithCompatibility() {
		await Promise.all([loadBaseDrinks(), loadStrengthBaseCompatibility()]);
	}

	/** Coffee types plus the compatibility map that filters them by selected cup. */
	async function loadCoffeeTypesWithCompatibility() {
		await Promise.all([loadCoffeeTypes(), loadCupTypeCompatibility()]);
	}

	return {
		glasses, loadGlasses,
		cups, loadCups, coffeeTypes, loadCoffeeTypes, loadCoffeeTypesWithCompatibility,
		cocktailTypes, loadCocktailTypesWithCompatibility,
		strengths, loadStrengths, loadStrengthsWithCompatibility,
		glassTypeCompatibilityMap,
		typeStrengthCompatibilityMap,
		strengthBaseCompatibilityMap,
		cupTypeCompatibilityMap,
		base, loadBaseDrinksWithCompatibility,
		methods, loadMethods,
		coffeeMethods, loadCoffeeMethods,
		tags, loadTags,
		decorations, loadDecorations,
		ingredients, loadIngredients, createIngredient, updateIngredient,
		recipes, loadRecipes,
	};
});
