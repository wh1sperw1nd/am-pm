import { get } from '@/utils/http';

export const fetchTags = () => {
    return get<{ id: number; slug: string; name: string }[]>('/tags');
}
