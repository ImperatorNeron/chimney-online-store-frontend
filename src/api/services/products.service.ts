import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { AReadFiltersSchema, ALReadPreviewProductSchema, PaginationIn, ProductFiltersSchema, AlistReadPreviewProductSchema, Create_AReadAbsoluteProductSchema, ALReadFullUniqueProductSchema, Get_AReadAbsoluteProductSchema } from '../types/types';

export type DiscountedAdminItem = {
    variation_id: number;
    name: string;
    slug: string;
    price: number;
    discount_percentage: number;
    sort_order: number | null;
};


export class ProductService {
    private endpoint = endpoints.products;

    async getProducts(paginationIn?: PaginationIn, ordering?: { field: string, ordering: string }, filters?: ProductFiltersSchema,) {
        const params = new URLSearchParams();
        if (paginationIn) {
            params.append("offset", String(paginationIn.offset));
            params.append("limit", String(paginationIn.limit));
        }

        if (filters) {
            for (const [key, value] of Object.entries(filters)) {
                if (value !== undefined && value !== null && value !== "") {
                    params.append(key, String(value));
                }
            }
        }

        if (ordering && ordering.field && ordering.ordering) {
            params.append("field", ordering.field);
            params.append("ordering", ordering.ordering);
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}?${params.toString()}`
        const response = await http.get<ALReadPreviewProductSchema>(url);
        return response.data;
    }

    async getFilters(searchParams?: Promise<{ text?: string, [key: string]: any }>, slug?: string) {
        const params = new URLSearchParams();

        const sp = await searchParams;
        if (slug) params.append("slug", String(slug));
        if (!slug && sp?.text) params.append("text", String(sp?.text))

        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/filters?${params.toString()}`
        const response = await http.get<AReadFiltersSchema>(url);
        return response.data;
    }

    async getProductsByIds(ids: number[]) {
        const params = new URLSearchParams();
        ids.forEach(id => params.append("product_ids", id.toString()));
        const url = `${this.endpoint}/by-ids?${params.toString()}`
        const response = await http.get<AlistReadPreviewProductSchema>(url);
        return response.data;
    }

    async getUniqueProducts(
        token: string,
        limit: number = 20,
        offset: number = 0,
        params?: {
            text?: string;
            field?: string;
            category?: string;
            ordering?: string;
        },
    ) {
        const query = new URLSearchParams({ limit: String(limit), offset: String(offset) });
        if (params?.text) query.append("text", params.text);
        if (params?.category) query.append("category_id", params.category);
        if (params?.field && params?.ordering) {
            query.append("field", params.field);
            query.append("ordering", params.ordering);
        }
        const url = `${this.endpoint}/unique?${query.toString()}`
        const response = await http.get<ALReadFullUniqueProductSchema>(url, token);
        return response.data
    }

    async getFullProduct(slug: string, params?: { field?: string; ordering?: string; offset?: number; limit?: number }) {
        // TODO: not sure about params here if they are needed 
        const query = new URLSearchParams();
        if (params?.field) query.append("field", params.field);
        if (params?.ordering) query.append("ordering", params.ordering);
        if (params?.offset !== undefined) query.append("offset", String(params.offset));
        if (params?.limit !== undefined) query.append("limit", String(params.limit));
        const qs = query.toString();
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/${encodeURIComponent(slug)}${qs ? `?${qs}` : ''}`
        const response = await http.get<Get_AReadAbsoluteProductSchema>(url)
        return response.data
    }
    async getProductVariations(slug: string, limit: number, offset: number, params?: { field?: string; ordering?: string }) {
        const query = new URLSearchParams({ limit: String(limit), offset: String(offset) });
        if (params?.field) query.append("field", params.field);
        if (params?.ordering) query.append("ordering", params.ordering);
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/${encodeURIComponent(slug)}/variations?${query.toString()}`
        const dto = (await http.get<Get_AReadAbsoluteProductSchema>(url)).data as any;
        return {
            items: dto?.variations ?? [],
            pagination: { offset, limit, total: dto?.variation_total ?? 0 },
        };
    }

    async getPopularProducts(paginationIn?: PaginationIn) {
        const params = new URLSearchParams();
        if (paginationIn) {
            params.append("offset", String(paginationIn.offset));
            params.append("limit", String(paginationIn.limit));
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/popular?${params.toString()}`
        const response = await http.get<ALReadPreviewProductSchema>(url)
        return response.data
    }

    async getDiscountedProducts(limit: number = 15, offset: number = 0) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/discounted?limit=${limit}&offset=${offset}`;
        const response = await http.get<ALReadPreviewProductSchema>(url);
        return response.data;
    }

    async getDiscountedAdmin(token: string) {
        const url = `${this.endpoint}/discounted/admin`;
        const response = await http.get<{ data: DiscountedAdminItem[] }>(url, token);
        return response.data;
    }

    async reorderDiscounted(token: string, items: { variation_id: number; sort_order: number }[]) {
        await http.patch(`${this.endpoint}/discounted/reorder`, items, token);
    }

    async createProduct(token: string, product: FormData) {
        const response = await http.post<Create_AReadAbsoluteProductSchema>(this.endpoint, product, token)
        return response.data
    }

    async deleteUniqueProduct(token: string, productId: number) {
        const url = `${this.endpoint}/unique/${encodeURIComponent(productId)}`
        await http.delete(url, token);
    }

    async updateProduct(token: string, productId: number, product: FormData) {
        const url = `${this.endpoint}/${encodeURIComponent(productId)}`
        const response = await http.patch<Get_AReadAbsoluteProductSchema>(url, product, token)
        return response.data
    }

}

export const productService = new ProductService();
