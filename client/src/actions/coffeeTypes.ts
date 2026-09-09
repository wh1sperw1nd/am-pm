import { get } from '@/utils/http';

export const fetchCoffeeTypes = () => {
    return get<{ id: number; slug: string; name: string }[]>('/coffee-types');
}
