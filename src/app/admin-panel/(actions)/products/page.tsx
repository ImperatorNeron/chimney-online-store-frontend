'use client'

import { useEffect } from "react";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import useProductsData from "@/components/modules/admin/hooks/products/useProducts";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import ProductsTable from "@/components/modules/admin/components/products/ProductsTable";
import useDeleteProduct from "@/components/modules/admin/hooks/products/useDeleteProduct";
import LoadingState from "@/components/modules/admin/components/products/LoadingState";
import ErrorState from "@/components/modules/admin/components/products/ErrorState";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import useCategories from "@/components/modules/admin/hooks/products/useCategories";
import BackToPageButton from "@/components/ui/BackToPageButton";
import ProductNavigation from "@/components/modules/admin/components/products/ProductNavigation";

export default function ProductPage() {
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage, setTotal } = usePagination();
    const { data, loading, error, reload } = useProductsData(currentLimit, currentOffset);
    const categories = useCategories();
    const { handleDelete, deletingId } = useDeleteProduct({
        onReload: reload,
        onAfterDelete: () => {
            if (data?.items?.length === 1 && currentOffset > 0) {
                handlePrevPage();
            }
        }
    });

    useEffect(() => {
        document.title = "Продукти на сайті";
    }, []);

    useEffect(() => {
        if (data?.pagination?.total) {
            setTotal(data.pagination.total);
        }
    }, [data?.pagination?.total, setTotal]);

    if (loading || (categories.loading && !data)) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!data?.items?.length) return <EmptyState />;

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-16 pt-4">
            <ProductNavigation/>
            <ProductsTable
                items={data.items}
                onDelete={handleDelete}
                categories={categories.data ?? undefined}
                deletingId={deletingId}
            />

            {data.pagination && (
                <PaginationControls
                    currentOffset={currentOffset}
                    currentLimit={currentLimit}
                    total={data.pagination.total}
                    onPrev={handlePrevPage}
                    onNext={handleNextPage}
                    isLoading={loading}
                />
            )}
        </div>
    );
}
