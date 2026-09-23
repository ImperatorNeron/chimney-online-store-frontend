import { apiBase } from './config';

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

    const isFullUrl = /^https?:\/\//.test(url) || url.includes('//');
    const finalUrl = isFullUrl ? url : apiBase() + url;

    const method = (options.method || 'GET').toUpperCase();
    const requestId = Math.random().toString(36).slice(2, 10);

    let response: Response;
    try {
        response = await fetch(finalUrl, {
            ...options,
            headers,
            credentials: 'include',
        });
    } catch (err) {
        // Network-level failure (DNS, connection refused, CORS, offline...).
        console.error(
            `[api] ${method} ${finalUrl} | id=${requestId} | network error:`,
            err instanceof Error ? err.message : err,
        );
        throw new Error('Не вдалося зʼєднатися з сервером. Перевірте підключення.');
    }

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        const serverMessage = errorBody?.errors?.length
            ? errorBody.errors[0].message
            : undefined;
        // Correlate with the backend log via the X-Request-ID header it returns.
        const backendId = response.headers.get('X-Request-ID');
        console.error(
            `[api] ${method} ${finalUrl} | id=${requestId}`
            + (backendId ? ` | backend=${backendId}` : '')
            + ` | status=${response.status} | ${serverMessage ?? 'unknown error'}`,
        );
        throw new Error(serverMessage ?? 'Не вдалося виконати операцію!');
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
