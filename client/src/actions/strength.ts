import { get } from '@/utils/http';

export const fetchStrengths = () => {
    return get<{ id: number; slug: string; name: string, hint: string }[]>('/strength');
}
