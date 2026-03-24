import CatalogResultsLoadingWrapper from "@/components/modules/catalog/components/CatalogResultsLoadingWrapper";
import Pagination from "@/components/modules/catalog/components/Pagination";
import ProductList from "@/components/modules/products/components/ProductList";
import EmptySearch from "@/components/shared/EmptySearch";

export default function CatalogResults({
    items,
    currentPage,
    totalPages,
    limit,
    className = "w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3",
}: {
    items: any[];
    currentPage: number;
    totalPages: number;
    limit: number | string | undefined;
    className?: string;
}) {
    return (
        <CatalogResultsLoadingWrapper totalCards={Number(limit) || 12} className={className}>
            {items.length > 0 ? (
                <>
                    <ProductList items={items} className={className} />
                    {totalPages > 1 && (
                        <Pagination limit={Number(limit) || 12} currentPage={currentPage} totalPages={totalPages} />
                    )}
                </>
            ) : (
                <EmptySearch />
            )}
        </CatalogResultsLoadingWrapper>
    );
}

