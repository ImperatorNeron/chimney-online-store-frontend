'use client'

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import LoadingState from "@/components/modules/admin/components/products/LoadingState";
import ErrorState from "@/components/modules/admin/components/products/ErrorState";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import GenericTable, { Column } from "@/components/shared/AdminTable";

import useProductsData from "@/components/modules/admin/hooks/products/useProducts";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import useDeleteProduct from "@/components/modules/admin/hooks/products/useDeleteProduct";
import useCategories from "@/components/modules/admin/hooks/products/useCategories";

import { AlistReadCategorySchema, Create_ReadAbsoluteProductSchema } from "@/api/types/types";
import formatDate from "@/utils/formatDate";
import AddProductButton from "@/components/modules/admin/components/products/AddProductButton";
import useDebounce from "@/hooks/forms/useDebounce";

function useCategoryMap(categories: any) {
    return useMemo(() => {
        if (!Array.isArray(categories)) return {};
        return categories.reduce((map: Record<number, string>, c: any) => {
            map[c.id] = c.name;
            return map;
        }, {});
    }, [categories]);
}

function buildCategoryOptions(categories: AlistReadCategorySchema): { value: string; label: string }[] {
    const options = [{ value: "all", label: "Всі" }];

    if (Array.isArray(categories.data)) {
        options.push(
            ...categories.data
                .filter((cat) => cat.parent_id !== null && cat.parent_id !== undefined)
                .map((cat) => ({
                    value: cat.id.toString(),
                    label: cat.name,
                }))
        );
    }

    return options;
}

function useProductColumns(categoryMap: Record<number, string>, handleDelete: (id: number) => void): Column<Create_ReadAbsoluteProductSchema>[] {
    return [
        { header: "Назва товару", render: (m) => <b>{m.name}</b>, className: "break-words break-all" },
        { header: "Slug", render: (m) => m.slug },
        {
            header: "Категорія",
            render: (m) => categoryMap[m.category_id] || 'Невідома',
            className: "break-words break-all mr-1",
        },
        { header: "Дата створення", render: (m) => formatDate(m.created_at), className: "text-sm text-gray-500" },
        { header: "Зображень", render: (m) => m.images?.length || 0 },
        {
            header: "Дії",
            render: (m) => (
                <div className="flex items-center space-x-1">
                    <Link
                        href={`/admin-panel/products/update/${m.slug}`}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full bg-gray-50"
                        title="Редагувати"
                    >
                        <PencilIcon className="h-5 w-5" />
                    </Link>
                    <button
                        onClick={() => handleDelete(m.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full bg-gray-50"
                    >
                        <TrashIcon className="h-5 w-5" />
                    </button>
                </div>
            ),
        },
    ];
}

function Filters({
    search,
    setSearch,
    category,
    categories,
    setCategory,
    order,
    setOrder,
    loading,
    onRefresh,
    setOffset,
}: {
    search: string;
    setSearch: (v: string) => void;
    category: string;
    categories: AlistReadCategorySchema;
    setCategory: (v: string) => void;
    order: "newest" | "oldest";
    setOrder: (v: "newest" | "oldest") => void;
    loading: boolean;
    onRefresh: () => void;
    setOffset: (offset: number) => void;
}) {
    return (
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-end">
            <SearchFilter value={search} onChange={setSearch} setOffset={setOffset} />
            <SelectFilter
                value={category}
                onChange={setCategory}
                setOffset={setOffset}
                options={buildCategoryOptions(categories)}
            />
            <SelectFilter
                value={order}
                onChange={setOrder}
                setOffset={setOffset}
                options={[
                    { value: "newest", label: "Новіші" },
                    { value: "oldest", label: "Старіші" },
                ]}
            />
            <RefreshButton onClick={onRefresh} loading={loading} />
            <AddProductButton />
        </div>
    );
}

export default function ProductPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [order, setOrder] = useState<"newest" | "oldest">("newest");

    const debouncedSearch = useDebounce(search, 400);
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage, setTotal, setCurrentOffset } = usePagination();

    const params = useMemo(
        () => ({
            text: debouncedSearch || undefined,
            field: "created_at",
            category: category !== "all" ? category : undefined,
            ordering: order === "newest" ? "desc" : "asc",
        }),
        [debouncedSearch, category, order]
    );

    const categories = useCategories();
    const { products, loading, error, reload } = useProductsData(currentLimit, currentOffset, params);

    const { handleDelete } = useDeleteProduct({
        onReload: reload,
        onAfterDelete: () => {
            if (products?.items?.length === 1 && currentOffset > 0) {
                handlePrevPage();
            }
        }
    });

    const categoryMap = useCategoryMap(categories.data);
    const columns = useProductColumns(categoryMap, handleDelete);

    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setOrder("newest");
    };

    useEffect(() => { document.title = "Продукти на сайті"; }, []);
    useEffect(() => { if (products?.pagination?.total) setTotal(products.pagination.total); }, [products?.pagination?.total]);

    // 🔹 Підготуємо дані для таблиці
    const preparedData = products?.items?.map(item => ({
        ...item,
        variations: item.variations ?? []
    })) ?? [];

    return (
        <>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Товар на сайті</h1>
                    <p className="text-gray-600">Перегляд товарів з каталогу</p>
                </div>
                <Filters
                    search={search}
                    setSearch={setSearch}
                    category={category}
                    categories={categories}
                    setCategory={setCategory}
                    order={order}
                    setOrder={setOrder}
                    loading={loading}
                    onRefresh={handleRefresh}
                    setOffset={setCurrentOffset}
                />
            </div>

            {loading || (categories.loading && !products) ? (
                <LoadingState />
            ) : error ? (
                <div className="p-4 text-red-600 text-center">Помилка завантаження</div>
            ) : !preparedData.length ? (
                <EmptyState/>
            ) : (
                <GenericTable
                    data={preparedData}
                    columns={columns}
                    rowKey={(row) => String(row.id)}
                    columnTemplate="1fr 1fr 1fr 1fr 1fr 80px"
                />
            )}

            {products?.pagination && preparedData.length > 0 && (
                <PaginationControls
                    currentOffset={currentOffset}
                    currentLimit={currentLimit}
                    total={products.pagination.total}
                    onPrev={handlePrevPage}
                    onNext={handleNextPage}
                    isLoading={loading}
                />
            )}
        </>
    );
}
