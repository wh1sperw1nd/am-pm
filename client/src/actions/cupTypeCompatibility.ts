import { get } from '@/utils/http';

export const fetchCupTypeCompatibility = () => {
    return get<Record<string, string[]>>('/cup-type-compatibility');
}
