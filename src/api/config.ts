export const BROWSER_API_BASE = '/backend';

export const SSR_API_BASE =
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

export function apiBase(): string {
    return typeof window === 'undefined' ? SSR_API_BASE : BROWSER_API_BASE;
}
