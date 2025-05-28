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

    if (loading || (categories.loading && !data)) return <LoadingState />;
    if (error) return <ErrorState error={error} />;
    if (!data?.items?.length) return <EmptyState />;

    return (
        <div className="mx-auto px-4 sm:px-6 lg:px-8 min-h-[600px] pb-16 pt-4">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />

            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center my-8">
                <h1 className="text-3xl font-semibold text-gray-900 hidden sm:block">Продукти</h1>
                <h1 className="text-2xl sm:text-3xl w-full font-semibold text-gray-900 text-center border-b-2 border-gray-200 pb-2 my-4 block sm:hidden">
                    Продукти
                </h1>
                <Link
                    href="/admin-panel/products/create"
                    className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-5 py-3 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="w-5 h-5" />
                    Додати продукт
                </Link>
            </div>

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
