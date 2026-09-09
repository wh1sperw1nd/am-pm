import { get, post, patch } from '@/utils/http';
import type { IListItem } from '@/types/ui';

export interface IIngredientCatalogItem extends IListItem {
    kind: 'ingredient' | 'garnish';
    defaultUnit: string;
    defaultAmount: string | null;
}

export interface INewIngredient {
    name: string;
    kind?: 'ingredient' | 'garnish';
    defaultUnit?: string;
    defaultAmount?: string;
}

export interface IIngredientUpdate {
    name?: string;
    kind?: 'ingredient' | 'garnish';
    defaultUnit?: string;
    defaultAmount?: string;
}

export const fetchIngredients = () => {
    return get<IIngredientCatalogItem[]>('/ingredients');
}

export const createIngredient = (ingredient: INewIngredient) => {
    return post<IIngredientCatalogItem>('/ingredients', ingredient);
}

export const updateIngredient = (id: number, update: IIngredientUpdate) => {
    return patch<IIngredientCatalogItem>(`/ingredients/${id}`, update);
}
