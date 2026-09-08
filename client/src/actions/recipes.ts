import { get, post } from '@/utils/http';

export interface IRecipe {
    id: number;
    name: string;
    payload: Record<string, unknown>;
    createdAt: string;
}

export const fetchRecipes = () => get<IRecipe[]>('/recipes');
export const createRecipe = (payload: Record<string, unknown>) => post<IRecipe>('/recipes', payload);
