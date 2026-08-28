import axios, {isAxiosError} from 'axios';

export const http = axios.create({
	baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000',
});

function handleError(error: unknown): never {
	if (isAxiosError(error)) {
		throw new Error(error.response?.data?.message ?? error.message);
	}
	throw error;
}

export async function get<T>(url: string, params?: Record<string, unknown>): Promise<T> {
	try {
		const response = await http.get<T>(url, {params});
		return response.data;
	} catch (error) {
		handleError(error);
	}
}

export async function post<T>(url: string, body?: unknown): Promise<T> {
	try {
		const response = await http.post<T>(url, body);
		return response.data;
	} catch (error) {
		handleError(error);
	}
}

export async function del<T>(url: string): Promise<T> {
	try {
		const response = await http.delete<T>(url);
		return response.data;
	} catch (error) {
		handleError(error);
	}
}
