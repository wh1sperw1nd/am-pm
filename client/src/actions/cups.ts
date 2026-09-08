import { get } from '@/utils/http';

export const fetchCups = () => {
    return get<{ id: number; slug: string; name: string }[]>('/cups');
}
