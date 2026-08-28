import { get } from '@/utils/http';

export const fetchCocktailTypes = () => {
    return get<{ id: number; slug: string; name: string }[]>('/cocktail-types');
}
