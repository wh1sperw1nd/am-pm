import { get } from '@/utils/http';

export const fetchMethods = () => {
    return get<{ id: number; slug: string; name: string }[]>('/methods');
}
