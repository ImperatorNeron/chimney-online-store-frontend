import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { AlistReadCategorySchema, Child_AlistReadCategorySchema, ReadCategoriesBySlug } from "../types/types";


export interface ReadCategory {
    id: number;
    name: string;
    slug: string;
    file_path: string | null;
    parent_id: number | null;
}

interface ApiError {
    code: string;
    message: string;
    meta: Record<string, string>;
}

async function categoryRequest<T>(url: string, options: RequestInit, token?: string): Promise<T> {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch('/backend' + url, { ...options, headers, credentials: 'include' });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const errors: ApiError[] = body?.errors ?? [];
        if (errors.length) {
            const metaMessages = errors
                .map(e => Object.values(e.meta || {}))
                .flat()
                .filter(Boolean);
            throw new Error(metaMessages.length ? metaMessages.join('. ') : errors[0].message);
        }
        throw new Error("Не вдалося виконати операцію");
    }

    return response.json();
}

class CategoryService {
    private endpoint = endpoints.categories;

    async getCategories() {
        const response = await http.get<AlistReadCategorySchema>(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}`);
        return response.data;
    }

    async getCategoriesBySlugs(slugs: string[]) {
        const params = new URLSearchParams();
        slugs.forEach(slug => params.append('slugs', slug));
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/by-slugs?${params.toString()}`
        const response = await http.get<ReadCategoriesBySlug>(url);
        return response.data;
    }

    async getChildCategories(parentIds: number[]) {
        const params = new URLSearchParams();
        parentIds.forEach((id) => params.append('parent_ids', String(id)));
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/children?${params.toString()}`
        const response = await http.get<Child_AlistReadCategorySchema>(url);
        return response.data;
    }

    async createCategory(token: string, data: { name: string; slug: string; parent_id?: number | null; image?: File }) {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('slug', data.slug);
        if (data.parent_id) formData.append('parent_id', String(data.parent_id));
        if (data.image) formData.append('image', data.image);
        const response = await categoryRequest<{ data: ReadCategory }>(`${this.endpoint}`, { method: 'POST', body: formData }, token);
        return response.data;
    }

    async updateCategory(token: string, categoryId: number, data: { name?: string; slug?: string; parent_id?: number | null; parent_slug?: string | null; image?: File }) {
        const formData = new FormData();
        if (data.name) formData.append('name', data.name);
        if (data.slug) formData.append('slug', data.slug);
        if (data.parent_id) formData.append('parent_id', String(data.parent_id));
        if (data.parent_slug) formData.append('parent_slug', data.parent_slug);
        if (data.image) formData.append('image', data.image);
        const response = await categoryRequest<{ data: ReadCategory }>(`${this.endpoint}/${categoryId}`, { method: 'PATCH', body: formData }, token);
        return response.data;
    }

    async deleteCategory(token: string, categoryId: number) {
        await categoryRequest(`${this.endpoint}/${categoryId}`, { method: 'DELETE' }, token);
    }
}

export const categoryService = new CategoryService();
