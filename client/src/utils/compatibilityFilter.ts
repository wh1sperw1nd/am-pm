import { computed, type ComputedRef } from 'vue';
import type { IListItem } from '@/types/ui';

/**
 * Filters `allItems` down to the ones listed for `key` in `compatibilityMap`; returns
 * `allItems` unchanged when there's no key selected or no compatibility entry for it.
 */
export const useCompatibilityFilter = <T extends IListItem>(
	allItems: () => T[],
	key: () => string | null,
	compatibilityMap: () => Record<string, string[]>,
): ComputedRef<T[]> => {
	return computed(() => {
		const all = allItems();
		const selectedKey = key();
		if (selectedKey === null) return all;
		const allowed = compatibilityMap()[selectedKey];
		if (!allowed) return all;
		return all.filter((item) => allowed.includes(item.slug));
	});
};
