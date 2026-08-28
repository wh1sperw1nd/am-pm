import { get } from '@/utils/http';

export const fetchGlassTypeCompatibility = () => {
    return get<Record<string, string[]>>('/glass-type-compatibility');
}
