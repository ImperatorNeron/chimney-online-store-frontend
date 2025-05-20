import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { paths } from '../types/openapi';

type ReadProductByIdsResponse = paths["/api/v1/products/by-ids"]["get"]["responses"]["200"]["content"]["application/json"]
type ReadUniqueResponse = paths["/api/v1/products/unique"]["get"]["responses"]["200"]["content"]["application/json"]
type CreateUniqueProductRequest = paths["/api/v1/products/unique"]["post"]["requestBody"]["content"]["multipart/form-data"]
type CreateUniqueProductResponse = paths["/api/v1/products/unique"]["post"]["responses"]["200"]["content"]["application/json"]

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

    async getProductsByIds(ids: number[]) {
        const params = new URLSearchParams();
        ids.forEach(id => params.append("product_ids", id.toString()));
        const url = `${this.endpoint}/by-ids?${params.toString()}`
        const response = await http.get<ReadProductByIdsResponse>(url);
        return response.data;
    }

    async getUniqueProducts(token: string, limit: number = 20, offset: number = 0) {
        const url = `${this.endpoint}/unique/?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
        const response = await http.get<ReadUniqueResponse>(url, token);
        return response.data
    }

    async createUniqueProduct(token: string, product: FormData) {
        const url = `${this.endpoint}/unique`
        const response = await http.post<CreateUniqueProductResponse>(url, product, token);
        return response.data
    }

    async deleteUniqueProduct(token: string, productId: number) {
        const url = `${this.endpoint}/unique/${encodeURIComponent(productId)}`
        await http.delete(url, token);
    }

}

export const productService = new ProductService();
