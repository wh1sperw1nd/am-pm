import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { IListItem } from '@/types/ui';
import { GLASS_TYPES, COCKTAIL_TYPES, STRENGTHS, GLASS_TYPE_COMPATIBILITY } from '@/data/options';
import { fetchGlasses } from '@/actions/glasses';
import { fetchCocktailTypes } from '@/actions/cocktailTypes';
import { fetchStrengths } from '@/actions/strength';
import { fetchGlassTypeCompatibility } from '@/actions/glassTypeCompatibility';
import { fetchTypeStrengthCompatibility } from '@/actions/typeStrengthCompatibility';
import { fetchStrengthBaseCompatibility } from '@/actions/strengthBaseCompatibility';
import { fetchBaseDrinks } from "@/actions/baseDrinks.ts";
import { fetchMethods } from "@/actions/methods.ts";
import { fetchTags } from "@/actions/tags.ts";
import { fetchDecorations } from "@/actions/decorations.ts";
import { fetchIngredients, createIngredient as createIngredientRequest, type IIngredientCatalogItem, type INewIngredient } from "@/actions/Ingredients.ts";
import { fetchRecipes, type IRecipe } from "@/actions/recipes";

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

	const { data: cocktailTypes, load: loadCocktailTypes } = useFetchableList<IListItem[]>(COCKTAIL_TYPES, fetchCocktailTypes, 'cocktail types');

	const { data: strengths, load: loadStrengths } = useFetchableList<IListItem[]>(STRENGTHS, fetchStrengths, 'strengths');

	const { data: base, load: loadBaseDrinks } = useFetchableList<IListItem[]>([], fetchBaseDrinks, 'base drinks');

	const { data: methods, load: loadMethods } = useFetchableList<IListItem[]>([], fetchMethods, 'methods');

	const { data: tags, load: loadTags } = useFetchableList<IListItem[]>([], fetchTags, 'tags');

	const { data: decorations, load: loadDecorations } = useFetchableList<IListItem[]>([], fetchDecorations, 'decorations');

	const { data: ingredients, load: loadIngredients } = useFetchableList<IIngredientCatalogItem[]>([], fetchIngredients, 'ingredients');

	const { data: recipes, load: loadRecipes } = useFetchableList<IRecipe[]>([], fetchRecipes, 'recipes');

	/** Creates a new catalog ingredient on the server and appends it to the loaded list. */
	async function createIngredient(ingredient: INewIngredient) {
		const created = await createIngredientRequest(ingredient);
		ingredients.value.push(created);
		return created;
	}

	const { data: glassTypeCompatibilityMap, load: loadGlassTypeCompatibility } = useFetchableList<Record<string, string[]>>(GLASS_TYPE_COMPATIBILITY, fetchGlassTypeCompatibility, 'glass/type compatibility');

	const { data: typeStrengthCompatibilityMap, load: loadTypeStrengthCompatibility } =	useFetchableList<Record<string, string[]>>({}, fetchTypeStrengthCompatibility, 'type/strength compatibility');

	const { data: strengthBaseCompatibilityMap, load: loadStrengthBaseCompatibility } =	useFetchableList<Record<string, string[]>>({}, fetchStrengthBaseCompatibility, 'strength/base compatibility');

	return {
		glasses, loadGlasses,
		cocktailTypes, loadCocktailTypes,
		strengths, loadStrengths,
		glassTypeCompatibilityMap, loadGlassTypeCompatibility,
		typeStrengthCompatibilityMap, loadTypeStrengthCompatibility,
		strengthBaseCompatibilityMap, loadStrengthBaseCompatibility,
		base, loadBaseDrinks,
		methods, loadMethods,
		tags, loadTags,
		decorations, loadDecorations,
		ingredients, loadIngredients, createIngredient,
		recipes, loadRecipes,
	};
});
