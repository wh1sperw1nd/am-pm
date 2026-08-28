import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { ListItem } from '@/types/ui';
import { GLASS_TYPES, COCKTAIL_TYPES, STRENGTHS, GLASS_TYPE_COMPATIBILITY } from '@/data/options';
import { fetchGlasses } from '@/actions/glasses';
import { fetchCocktailTypes } from '@/actions/cocktailTypes';
import { fetchStrengths } from '@/actions/strength';
import { fetchGlassTypeCompatibility } from '@/actions/glassTypeCompatibility';

/**
 * A picklist that starts out as a static fallback and gets replaced once the
 * matching /endpoint responds. Every reference list below follows this same shape.
 */
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
	const { data: glasses, load: loadGlasses } =
		useFetchableList<ListItem[]>(GLASS_TYPES, fetchGlasses, 'glasses');

	const { data: cocktailTypes, load: loadCocktailTypes } =
		useFetchableList<ListItem[]>(COCKTAIL_TYPES, fetchCocktailTypes, 'cocktail types');

	const { data: strengths, load: loadStrengths } =
		useFetchableList<ListItem[]>(STRENGTHS, fetchStrengths, 'strengths');

	const { data: glassTypeCompatibilityMap, load: loadGlassTypeCompatibility } =
		useFetchableList<Record<string, string[]>>(GLASS_TYPE_COMPATIBILITY, fetchGlassTypeCompatibility, 'glass/type compatibility');

	return {
		glasses, loadGlasses,
		cocktailTypes, loadCocktailTypes,
		strengths, loadStrengths,
		glassTypeCompatibilityMap, loadGlassTypeCompatibility,
	};
});
