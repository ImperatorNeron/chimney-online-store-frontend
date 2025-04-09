import ProductList from "@/components/modules/products/components/ProductList";
import LimitSelector from "@/components/modules/catalog/components/LimitSelector";
import OrderSelector from "@/components/modules/catalog/components/OrderSelector";
import Pagination from "@/components/modules/catalog/components/Pagination";
import { productService } from "@/services/product.service";

export default async function CatalogPage({ params, searchParams }: {
    params: Promise<{ slug: string }>;
    searchParams?: Promise<{ page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const initialPage = Math.max(1, parseInt((await searchParams)?.page || "1"));
    const limitOptions = [12, 24, 36];
    const initialLimit = parseInt((await searchParams)?.limit || "12");
    const limit = limitOptions.includes(initialLimit) ? initialLimit : 12;

    const paginationIn: PaginationIn = {
        offset: (initialPage - 1) * limit,
        limit: limit,
    }

    const filters: Filters = {
        category_slug: (await params).slug.at(-1),
    };

    const ordering: Ordering = {
        field: (await searchParams)?.field || "created_at",
        ordering: (await searchParams)?.ordering || "asc",
    }

    const { items, pagination } = await productService.fetchProducts(paginationIn, ordering, filters);
    const totalPages = Math.max(1, Math.ceil(pagination.total / limit));
    const currentPage = Math.min(initialPage, totalPages);

    return (
        <div className="w-full lg:w-3/4">
            <div className="flex gap-3 mb-4">
                <LimitSelector />
                <OrderSelector />
            </div>
            <ProductList items={items} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3" />
            {totalPages > 1 && <Pagination limit={limit} currentPage={currentPage} totalPages={totalPages} />}
        </div>
    );
};