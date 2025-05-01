import { http } from '@/api/http';
import { endpoints } from '../endpoints';

export class ProductService {
    private endpoint = endpoints.products;

    async getProduct(id: number, slug: string) {
        const url = `${this.endpoint}/${encodeURIComponent(slug)}/${encodeURIComponent(id)}`;
        const response = await http.get<ApiResponseOne<ReadFullProductSchema>>(url);
        return response.data;
    }

    async getProducts(paginationIn: PaginationIn, ordering?: Ordering, filters?: Filters,) {
        const params = new URLSearchParams();
        params.append("offset", String(paginationIn.offset));
        params.append("limit", String(paginationIn.limit));

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
        const url = `${this.endpoint}?${params.toString()}`
        const response = await http.get<ApiResponseListWithPagination<ReadFullProductSchema>>(url);
        return response.data;
    }

    async getFilters(searchParams?: Promise<{ text?: string, [key: string]: any }>, slug?: string) {
        const params = new URLSearchParams();

        const sp = await searchParams;
        if (slug) params.append("slug", String(slug));
        if (!slug && sp?.text) params.append("text", String(sp?.text))

        const url = `${this.endpoint}/filters?${params.toString()}`
        const response = await http.get<ApiResponseOne<BaseFilters>>(url);
        return response.data;
    }

}

export const productService = new ProductService();
