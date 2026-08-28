import { get, post } from '@/utils/http';
import type { IListItem } from '@/types/ui';

export interface IIngredientCatalogItem extends IListItem {
    kind: 'ingredient' | 'garnish';
    defaultUnit: string;
}

export interface INewIngredient {
    name: string;
    kind?: 'ingredient' | 'garnish';
    defaultUnit?: string;
}

export const fetchIngredients = () => {
    return get<IIngredientCatalogItem[]>('/ingredients');
}

export const createIngredient = (ingredient: INewIngredient) => {
    return post<IIngredientCatalogItem>('/ingredients', ingredient);
}
