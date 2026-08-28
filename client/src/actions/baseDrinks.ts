import { get } from '@/utils/http';

export const fetchBaseDrinks = () => {
    return get<{ id: number; slug: string; name: string }[]>('/base-drinks');
}
