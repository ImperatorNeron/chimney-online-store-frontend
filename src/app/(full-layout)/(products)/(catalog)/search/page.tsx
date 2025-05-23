import { catalogService } from "@/services/catalog.services";
import { productService } from "@/api/services/products.service";
import MobileFilterButton from "@/components/modules/catalog/components/MobileFilterButton";
import DesktopFilterBlock from "@/components/modules/catalog/components/DesktopFilterBlock";
import LimitSelector from "@/components/modules/catalog/components/LimitSelector";
import OrderSelector from "@/components/modules/catalog/components/OrderSelector";
import ProductList from "@/components/modules/products/components/ProductList";
import Pagination from "@/components/modules/catalog/components/Pagination";
import EmptySearch from "@/components/shared/EmptySearch";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default async function SearchPage({ searchParams }: {
    searchParams?: Promise<{ text: string, page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!
    );

    const filters = await productService.getFilters(searchParams!)
    const breadcrumbItems = [
        { title: "Головна", href: "/" },
        { title: "Пошук" },
    ];
    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex gap-4 mt-5 min-h-[500px]">
                <DesktopFilterBlock filters={filters} />
                <MobileFilterButton filters={filters} />
                <div className="w-full lg:w-3/4">
                    <div className="flex gap-3 mb-4">
                        <LimitSelector />
                        <OrderSelector />
                    </div>

                    {items.length > 0 ? (
                        <>
                            <ProductList
                                items={items}
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3"
                            />
                            {totalPages > 1 && (
                                <Pagination limit={limit} currentPage={currentPage} totalPages={totalPages} />
                            )}
                        </>
                    ) : (
                        <EmptySearch />
                    )}
                </div>
            </div>
        </>
    );
};