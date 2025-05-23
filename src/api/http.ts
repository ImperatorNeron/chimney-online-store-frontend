const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

async function request<T>(
    url: string,
    options: RequestInit = {},
    bearerToken?: string
): Promise<T> {
    const headers: Record<string, string> = {
        ...(options.headers as Record<string, string>),
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    if (bearerToken) {
        (headers as Record<string, string>)['Authorization'] = `Bearer ${bearerToken}`;
    }

    const response = await fetch(BASE_URL + url, {
        ...options,
        headers,
        credentials: 'include',
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        if (errorBody?.errors?.length) {
            throw new Error(errorBody.errors[0].message);
        }
        throw new Error("Не вдалося виконати операцію!");
    }

    return response.json();
}

export const http = {
    get: <T>(url: string, token?: string) => request<T>(url, {}, token),
    post: <T>(url: string, body?: unknown | FormData, token?: string) =>
        request<T>(url, { method: 'POST', body: body instanceof FormData ? body : JSON.stringify(body) }, token),
    patch: <T>(url: string, body: unknown, token?: string) =>
        request<T>(url, { method: 'PATCH', body: body instanceof FormData ? body : JSON.stringify(body) }, token),
    delete: <T>(url: string, token?: string) =>
        request<T>(url, { method: 'DELETE' }, token),
};
