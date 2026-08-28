import { get } from '@/utils/http';

export const fetchGlasses = () => {
    return get<{ id: number; slug: string; name: string }[]>('/glasses');
}
