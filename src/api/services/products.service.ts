import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { CatalogFiltersSchema, FullProductsSchema, PaginationIn, ProductFiltersSchema, ReadProductByIdsResponse, ReadProductResponse, ReadUniqueResponse, ReadVariationResponse } from '../types/types';


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
        const response = await http.get<FullProductsSchema>(url);
        return response.data;
    }

    async getFilters(searchParams?: Promise<{ text?: string, [key: string]: any }>, slug?: string) {
        const params = new URLSearchParams();

        const sp = await searchParams;
        if (slug) params.append("slug", String(slug));
        if (!slug && sp?.text) params.append("text", String(sp?.text))

        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/filters?${params.toString()}`
        const response = await http.get<CatalogFiltersSchema>(url);
        return response.data;
    }

    async getProductsByIds(ids: number[]) {
        const params = new URLSearchParams();
        ids.forEach(id => params.append("product_ids", id.toString()));
        const url = `${this.endpoint}/by-ids?${params.toString()}`
        const response = await http.get<ReadProductByIdsResponse>(url);
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
        const response = await http.get<ReadUniqueResponse>(url, token);
        return response.data
    }

    async getFullProduct(slug: string) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/${encodeURIComponent(slug)}`
        const response = await http.get<ReadProductResponse>(url)
        return response.data
    }

    async getPopularProducts(paginationIn?: PaginationIn) {
        const params = new URLSearchParams();
        if (paginationIn) {
            params.append("offset", String(paginationIn.offset));
            params.append("limit", String(paginationIn.limit));
        }
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/popular?${params.toString()}`
        const response = await http.get<FullProductsSchema>(url)
        return response.data
    }

    async createProduct(token: string, product: FormData) {
        const response = await http.post<ReadProductResponse>(this.endpoint, product, token)
        return response.data
    }

    async deleteUniqueProduct(token: string, productId: number) {
        const url = `${this.endpoint}/unique/${encodeURIComponent(productId)}`
        await http.delete(url, token);
    }

    async updateProduct(token: string, productId: number, product: FormData) {
        const url = `${this.endpoint}/${encodeURIComponent(productId)}`
        const response = await http.patch<ReadVariationResponse>(url, product, token)
        return response.data
    }

}

export const productService = new ProductService();
