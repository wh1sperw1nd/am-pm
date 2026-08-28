import { get } from '@/utils/http';

export const fetchTypes = () => {
    return get<{ id: number; slug: string; name: string }[]>('/types');
}
