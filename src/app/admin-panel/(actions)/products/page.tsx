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
        if (data?.pagination?.total) {
            setTotal(data.pagination.total);
        }
    }, [data?.pagination?.total, setTotal]);

    if (loading || categories.loading && !data) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!data?.items?.length) return <EmptyState />;

    return (
        <div className="px-4 sm:px-6 lg:px-8 min-h-[600px]">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
            <div className="flex justify-end">
                <Link href="/admin-panel/products/create" className="flex items-center gap-2 border-2 border-gray-200 hover:bg-gray-200 text-gray-800 font-medium px-6 py-3 rounded-md transition">
                    <PlusIcon className="w-5 h-5" />
                    Додати продукт
                </Link>
            </div>
            <div className="mt-8">
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
        </div>
    );
}
