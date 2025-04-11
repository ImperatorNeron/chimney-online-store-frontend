import { productService } from "@/services/product.service";

class CatalogService {
    private limitOptions = [12, 24, 36];

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

    async getOrdering(searchParams: Promise<{ field?: string; ordering?: string }>): Promise<Ordering> {
        const sp = await searchParams;
        return {
            field: sp?.field || "created_at",
            ordering: sp?.ordering || "desc",
        };
    }

    async getFilters(searchParams: Promise<{ text?: string; }>, slug?: string,): Promise<Filters> {
        const sp = await searchParams;
        let filters: Filters = {}
        if (slug) filters.category_slug = slug;
        if (!slug && sp.text) filters.text = sp.text
        return filters;
    }

    async getCatalogData(
        searchParams: Promise<{ text?: string, page?: string; limit?: string; field?: string; ordering?: string }>,
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
        const { items, pagination } = await productService.fetchProducts(paginationIn, ordering, filters);
        const totalPages = Math.max(1, Math.ceil(pagination.total / limit));
        const currentPage = Math.min(page, totalPages);

        return { items, currentPage, totalPages, limit };
    }
}

export const catalogService = new CatalogService();
