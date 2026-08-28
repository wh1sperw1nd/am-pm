import { get } from '@/utils/http';

export const fetchStrengthBaseCompatibility = () => {
    return get<Record<string, string[]>>('/strength-base-compatibility');
}
