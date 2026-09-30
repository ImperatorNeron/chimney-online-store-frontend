import { productService } from "@/api/services/products.service";
import { PaginationIn, ProductFiltersSchema } from "../types/types";

class CatalogService {
    private limitOptions = [12, 24, 36];
    private allowedFilters = ['diameter', 'length', 'thickness', 'angle', 'metal_type', 'min_price', 'max_price'];

    async getPage(searchParams: Promise<{ page?: string }>): Promise<number> {
        const page = parseInt((await searchParams)?.page || "1");
        return Math.max(1, page);
    }

    async getLimit(searchParams: Promise<{ limit?: string }>): Promise<number> {
        const limit = parseInt((await searchParams)?.limit || "12");
        return this.limitOptions.includes(limit) ? limit : 12;
    }

    getPaginationIn(page: number, limit: number): PaginationIn {
        return {
            offset: (page - 1) * limit,
            limit,
        };
    }

    async getOrdering(searchParams: Promise<{ field?: string; ordering?: string }>) {
        const sp = await searchParams;
        return {
            field: sp?.field || "created_at",
            ordering: sp?.ordering || "desc",
        };
    }

    async getFilters(searchParams: Promise<{ text?: string, [key: string]: any }>, slug?: string) {
        const sp = await searchParams;
        const filters: ProductFiltersSchema = {}
        if (slug) filters.category_slug = slug;
        if (!slug && sp.text) filters.text = sp.text

        if (sp.min_price) filters.min_price = Number(sp.min_price);
        if (sp.max_price) filters.max_price = Number(sp.max_price);

        for (const key in sp) {
            if (
                !['page', 'limit', 'field', 'ordering', 'text', 'price_min', 'price_max'].includes(key) &&
                sp[key] !== undefined
            ) {
                if (this.allowedFilters.includes(key)) {
                    (filters as Record<string, any>)[key] = sp[key];
                }
            }
        }

        return filters;
    }

    async getCatalogData(
        searchParams: Promise<{ text?: string, page?: string, limit?: string, field?: string, ordering?: string }>,
        slug?: string,
    ) {
        const page = await this.getPage(searchParams);
        const limit = await this.getLimit(searchParams);
        const paginationIn = this.getPaginationIn(page, limit);
        const ordering = await this.getOrdering(searchParams);
        const filters = await this.getFilters(searchParams, slug);
        if (!filters.category_slug && !filters.text) {
            return { items: [], currentPage: 0, totalPages: 0, limit };
        }
        const data = await productService.getProducts(paginationIn, ordering, filters);
        if (!data || !data.pagination) {
            return { items: [], currentPage: 0, totalPages: 0, limit };
        }
        const totalPages = Math.max(1, Math.ceil(data.pagination.total / limit));
        const currentPage = Math.min(page, totalPages);

        return { items: data.items, currentPage, totalPages, limit };
    }
}

export const catalogService = new CatalogService();
