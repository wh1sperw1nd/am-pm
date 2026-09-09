import { get } from '@/utils/http';

export const fetchCoffeeMethods = () => {
    return get<{ id: number; slug: string; name: string }[]>('/coffee-methods');
}
