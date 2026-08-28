import { get } from '@/utils/http';

export const fetchDecorations = () => {
    return get<{ id: number; slug: string; name: string }[]>('/decorations');
}
