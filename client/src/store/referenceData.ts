import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ListItem } from '@/types/ui';
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
import { fetchIngredients, createIngredient as createIngredientRequest, type IngredientCatalogItem, type NewIngredient } from "@/actions/Ingredients.ts";

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
	const { data: glasses, load: loadGlasses } = useFetchableList<ListItem[]>(GLASS_TYPES, fetchGlasses, 'glasses');

	const { data: cocktailTypes, load: loadCocktailTypes } = useFetchableList<ListItem[]>(COCKTAIL_TYPES, fetchCocktailTypes, 'cocktail types');

	const { data: strengths, load: loadStrengths } = useFetchableList<ListItem[]>(STRENGTHS, fetchStrengths, 'strengths');

	const { data: base, load: loadBaseDrinks } = useFetchableList<ListItem[]>([], fetchBaseDrinks, 'base drinks');

	const { data: methods, load: loadMethods } = useFetchableList<ListItem[]>([], fetchMethods, 'methods');

	const { data: tags, load: loadTags } = useFetchableList<ListItem[]>([], fetchTags, 'tags');

	const { data: decorations, load: loadDecorations } = useFetchableList<ListItem[]>([], fetchDecorations, 'decorations');

	const { data: ingredients, load: loadIngredients } = useFetchableList<IngredientCatalogItem[]>([], fetchIngredients, 'ingredients');

	/** Creates a new catalog ingredient on the server and appends it to the loaded list. */
	async function createIngredient(ingredient: NewIngredient) {
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
	};
});
