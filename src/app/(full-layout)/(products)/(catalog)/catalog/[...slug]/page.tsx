import { catalogService } from "@/services/catalog.services";
import DesktopFilterBlock from "@/components/modules/catalog/components/DesktopFilterBlock";
import MobileFilterButton from "@/components/modules/catalog/components/MobileFilterButton";
import { productService } from "@/api/services/products.service";
import LimitSelector from "@/components/modules/catalog/components/LimitSelector";
import OrderSelector from "@/components/modules/catalog/components/OrderSelector";
import ProductList from "@/components/modules/products/components/ProductList";
import Pagination from "@/components/modules/catalog/components/Pagination";

export default async function CatalogPage({ params, searchParams }: {
    params: Promise<{ slug: string[] }>;
    searchParams?: Promise<{ page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!,
        (await params).slug.at(-1),
    );

    const filters = await productService.getFilters(searchParams!, (await params).slug.at(-1))

    return (
        <div className="flex gap-4 mt-5">
            <DesktopFilterBlock filters={filters} />
            <MobileFilterButton filters={filters} />
            <div className="w-full lg:w-3/4">
                <div className="flex gap-3 mb-4">
                    <LimitSelector />
                    <OrderSelector />
                </div>
                <ProductList items={items} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3" />
                {totalPages > 1 && <Pagination limit={limit} currentPage={currentPage} totalPages={totalPages} />}
            </div>
        </div>
    );
};