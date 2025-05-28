import { catalogService } from "@/api/services/catalog.services";
import DesktopFilterBlock from "@/components/modules/catalog/components/DesktopFilterBlock";
import MobileFilterButton from "@/components/modules/catalog/components/MobileFilterButton";
import { productService } from "@/api/services/products.service";
import LimitSelector from "@/components/modules/catalog/components/LimitSelector";
import OrderSelector from "@/components/modules/catalog/components/OrderSelector";
import ProductList from "@/components/modules/products/components/ProductList";
import Pagination from "@/components/modules/catalog/components/Pagination";
import EmptySearch from "@/components/shared/EmptySearch";
import { categoryService } from "@/api/services/category.service";
import Breadcrumbs from "@/components/layout/Breadcrumbs";

export default async function CatalogPage({ params, searchParams }: {
    params: Promise<{ slug: string[] }>;
    searchParams?: Promise<{ page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!,
        (await params).slug.at(-1),
    );

    const rawFilters = await productService.getFilters(searchParams!, (await params).slug.at(-1))
    const filters = rawFilters
        ? {
            ...rawFilters,
            min_price: rawFilters.min_price !== null && rawFilters.min_price !== undefined
                ? Number(rawFilters.min_price)
                : null,
            max_price: rawFilters.max_price !== null && rawFilters.max_price !== undefined
                ? Number(rawFilters.max_price)
                : null,
        }
        : undefined;
    const rawCategoryNames = await categoryService.getCategoriesBySlugs((await params).slug);
    const categoryNames: [string, string][] = Array.isArray(rawCategoryNames) ? rawCategoryNames as [string, string][] : [];
    const breadcrumbsFromCategories = categoryNames.slice(0, -1).map(([name, slug]: [string, string]) => ({
        title: name,
        href: `/catalog/${slug}`
    }));

    const lastCategory = categoryNames[categoryNames.length - 1];
    if (lastCategory) {
        breadcrumbsFromCategories.push({
            title: lastCategory[0],
            href: ""
        });
    }

    const breadcrumbItems = [
        { title: "Головна", href: "/" },
        ...breadcrumbsFromCategories
    ];

    return (
        <>
            <Breadcrumbs items={breadcrumbItems} />
            <div className="flex gap-4 mt-5">
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