import { get } from '@/utils/http';

export const fetchTypeStrengthCompatibility = () => {
    return get<Record<string, string[]>>('/type-strength-compatibility');
}
