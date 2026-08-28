import { get, post } from '@/utils/http';
import type { ListItem } from '@/types/ui';

export interface IngredientCatalogItem extends ListItem {
    kind: 'ingredient' | 'garnish';
    defaultUnit: string;
}

export interface NewIngredient {
    name: string;
    kind?: 'ingredient' | 'garnish';
    defaultUnit?: string;
}

export const fetchIngredients = () => {
    return get<IngredientCatalogItem[]>('/ingredients');
}

export const createIngredient = (ingredient: NewIngredient) => {
    return post<IngredientCatalogItem>('/ingredients', ingredient);
}
