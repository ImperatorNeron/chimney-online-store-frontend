'use client'

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";

import LoadingState from "@/components/modules/admin/components/products/LoadingState";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import SortableHeader from "@/components/shared/AdminTableSortableHeader";
import GenericTable, { Column } from "@/components/shared/AdminTable";
import InfiniteScrollSentinel from "@/components/modules/admin/components/InfiniteScrollSentinel";

import useProductsData from "@/components/modules/admin/hooks/products/useProducts";
import useDeleteProduct from "@/components/modules/admin/hooks/products/useDeleteProduct";
import useCategories from "@/components/modules/admin/hooks/products/useCategories";

import { AlistReadCategorySchema, Create_ReadAbsoluteProductSchema } from "@/api/types/types";
import formatDate from "@/utils/formatDate";
import AddProductButton from "@/components/modules/admin/components/products/AddProductButton";
import useDebounce from "@/hooks/forms/useDebounce";
import type { ProductSortField, SortOrdering } from "@/constants/orderFields";

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
    const options = [{ value: "all", label: "Всі категорії" }];
    if (Array.isArray(categories.data)) {
        options.push(
            ...categories.data
                .filter((cat) => cat.parent_id !== null && cat.parent_id !== undefined)
                .map((cat) => ({ value: cat.id.toString(), label: cat.name }))
        );
    }
    return options;
}

function useProductColumns(
    categoryMap: Record<number, string>,
    handleDelete: (id: number) => void,
    sortField: ProductSortField,
    sortOrdering: SortOrdering,
    onSort: (field: ProductSortField) => void,
): Column<Create_ReadAbsoluteProductSchema>[] {
    return [
        {
            header: <SortableHeader label="Назва" sortField="name" activeField={sortField} ordering={sortOrdering} onSort={onSort} />,
            render: (m) => <b className="text-xs">{m?.name}</b>,
            className: "break-words [overflow-wrap:anywhere]",
        },
        {
            header: <SortableHeader label="Slug" sortField="slug" activeField={sortField} ordering={sortOrdering} onSort={onSort} />,
            render: (m) => <span className="text-xs text-gray-600">{m?.slug}</span>,
            className: "break-words [overflow-wrap:anywhere]",
        },
        {
            header: <SortableHeader label="Категорія" sortField="category_id" activeField={sortField} ordering={sortOrdering} onSort={onSort} />,
            render: (m) => <span className="text-xs">{categoryMap[m?.category_id || 0] || 'Невідома'}</span>,
            className: "break-words [overflow-wrap:anywhere]",
        },
        {
            header: <SortableHeader label="Дата" sortField="created_at" activeField={sortField} ordering={sortOrdering} onSort={onSort} />,
            render: (m) => <span className="text-xs text-gray-500">{m?.created_at ? formatDate(m.created_at) : '-'}</span>,
        },
        {
            header: "Зображень",
            render: (m) => <span className="text-xs">{m?.images?.length || 0}</span>,
        },
        {
            header: "Дії",
            render: (m) => (
                <div className="flex items-center space-x-1">
                    <Link
                        href={`/admin-panel/products/update/${m?.slug}`}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full bg-gray-50"
                        title="Редагувати"
                    >
                        <PencilIcon className="h-4 w-4" />
                    </Link>
                    <button
                        onClick={() => handleDelete(m?.id ?? 0)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full bg-gray-50"
                    >
                        <TrashIcon className="h-4 w-4" />
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
    loading,
    onRefresh,
}: {
    search: string;
    setSearch: (v: string) => void;
    category: string;
    categories: AlistReadCategorySchema;
    setCategory: (v: string) => void;
    loading: boolean;
    onRefresh: () => void;
}) {
    return (
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-end">
            <SearchFilter value={search} onChange={setSearch} />
            <SelectFilter
                value={category}
                onChange={setCategory}
                options={buildCategoryOptions(categories)}
            />
            <RefreshButton onClick={onRefresh} loading={loading} />
            <AddProductButton />
        </div>
    );
}

export default function ProductPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sortField, setSortField] = useState<ProductSortField>("created_at");
    const [sortOrdering, setSortOrdering] = useState<SortOrdering>("desc");

    const debouncedSearch = useDebounce(search, 400);

    const handleSort = (field: ProductSortField) => {
        if (field === sortField) {
            setSortOrdering((prev) => (prev === "asc" ? "desc" : "asc"));
            return;
        }
        setSortField(field);
        setSortOrdering(field === "created_at" ? "desc" : "asc");
    };

    const params = useMemo(
        () => ({
            text: debouncedSearch || undefined,
            field: sortField,
            category: category !== "all" ? category : undefined,
            ordering: sortOrdering,
        }),
        [debouncedSearch, category, sortField, sortOrdering]
    );

    const categories = useCategories();
    const { items, total, loading, loadingMore, error, hasMore, loadMore, reload } = useProductsData(params);

    const { handleDelete } = useDeleteProduct({
        onReload: reload,
    });

    const categoryMap = useCategoryMap(categories.data);
    const columns = useProductColumns(categoryMap, handleDelete, sortField, sortOrdering, handleSort);

    const handleRefresh = () => {
        setSearch("");
        setCategory("all");
        setSortField("created_at");
        setSortOrdering("desc");
    };

    useEffect(() => { document.title = "Продукти на сайті"; }, []);

    const preparedData = items.map(item => ({
        ...item,
        variations: item.variations ?? []
    }));

    return (
        <div className="max-w-[1920px] mx-auto px-4">
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
                    loading={loading}
                    onRefresh={handleRefresh}
                />
            </div>

            {loading && !items.length ? (
                <LoadingState />
            ) : error ? (
                <div className="p-4 text-red-600 text-center">Помилка завантаження</div>
            ) : !preparedData.length ? (
                <EmptyState />
            ) : (
                <GenericTable
                    data={preparedData}
                    columns={columns}
                    rowKey={(row) => String(row.id)}
                    columnTemplate="minmax(180px, 2fr) minmax(140px, 1.5fr) minmax(130px, 1fr) 120px 90px 80px"
                />
            )}

            <InfiniteScrollSentinel
                hasMore={hasMore}
                loading={loadingMore}
                onLoadMore={loadMore}
                total={total}
                loaded={items.length}
            />
        </div>
    );
}
