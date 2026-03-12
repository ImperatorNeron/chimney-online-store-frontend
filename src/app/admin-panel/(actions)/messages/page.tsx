'use client';

import { useMemo, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import useFetchMessages from "@/components/modules/admin/hooks/messages/useMessages";
import useDeleteMessage from "@/components/modules/admin/hooks/messages/useDeleteMessage";
import useChangeMessageStatus from "@/components/modules/admin/hooks/messages/useChangeMessageStatus";

import { ReadMessage } from "@/api/types/types";
import { MessageStatus } from "@/api/services/message.service";
import useDebounce from "@/hooks/forms/useDebounce";
import formatDate from "@/utils/formatDate";

import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import GenericTable, { Column } from "@/components/shared/AdminTable";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import LoadingState from "@/components/modules/admin/components/products/LoadingState";

function useMessageColumns(
    changeStatus: (id: number, status: MessageStatus) => void,
    handleDelete: (id: number) => void
): Column<ReadMessage>[] {
    return [
        { header: "Клієнт", render: (m) => <b>{m.user_name}</b>, className: "break-words break-all" },
        { header: "Контакти", render: (m) => m.phone_number },
        { header: "Дата", render: (m) => formatDate(m.created_at), className: "text-sm text-gray-500" },
        { header: "Повідомлення", render: (m) => m.message, className: "break-words break-all mr-1" },
        {
            header: "Статус",
            render: (m) => (
                <SelectFilter
                    value={m.status}
                    onChange={(val) => changeStatus(m.id, val as MessageStatus)}
                    options={[
                        { value: "new", label: "Нове" },
                        { value: "progress", label: "Обробляється" },
                        { value: "read", label: "Прочитано" },
                    ]}
                />
            ),
        },
        {
            header: "Дії",
            render: (m) => (
                <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full bg-gray-50"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            ),
        },
    ];
}

function Filters({
    search,
    setSearch,
    status,
    setStatus,
    order,
    setOrder,
    loading,
    onRefresh,
    setOffset,
}: {
    search: string;
    setSearch: (v: string) => void;
    status: MessageStatus | "all";
    setStatus: (v: MessageStatus | "all") => void;
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
                value={status}
                onChange={setStatus}
                setOffset={setOffset}
                options={[
                    { value: "all", label: "Всі" },
                    { value: "new", label: "Нові" },
                    { value: "progress", label: "Обробляється" },
                    { value: "read", label: "Прочитано" },
                ]}
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
        </div>
    );
}

function MessagesTableWrapper({
    loading,
    messages,
    columns,
    paginationProps,
}: {
    loading: boolean;
    messages: ReadMessage[] | undefined;
    columns: Column<ReadMessage>[];
    paginationProps: React.ComponentProps<typeof PaginationControls>;
}) {
    if (loading) return <LoadingState />
    if (!messages?.length) return <EmptyState />

    return (
        <>
            <GenericTable
                data={messages}
                columns={columns}
                rowKey={(row) => String(row.id)}
                columnTemplate="200px 120px 170px auto 200px 40px"
            />
            <PaginationControls {...paginationProps} />
        </>
    );
}

export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<MessageStatus | "all">("all");
    const [order, setOrder] = useState<"newest" | "oldest">("newest");

    const debouncedSearch = useDebounce(search, 400);
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage, setCurrentOffset } = usePagination();

    const params = useMemo(
        () => ({
            text: debouncedSearch || undefined,
            status: status !== "all" ? status : undefined,
            field: "created_at",
            ordering: order === "newest" ? "desc" : "asc",
        }),
        [debouncedSearch, status, order]
    );

    const { messages, loading, reload } = useFetchMessages(currentLimit, currentOffset, params);

    const { handleDelete } = useDeleteMessage({
        onReload: reload,
        onAfterDelete: () => {
            if (messages?.items?.length === 1 && currentOffset > 0) handlePrevPage();
        },
    });

    const { changeStatus } = useChangeMessageStatus({ onReload: reload });

    const columns = useMessageColumns(changeStatus, handleDelete);

    const handleRefresh = () => {
        setSearch("");
        setStatus("all");
        setOrder("newest");
    };

    return (
        <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Повідомлення клієнтів</h1>
                    <p className="text-gray-600">Перегляд повідомлень з форми зворотнього зв'язку</p>
                </div>
                <Filters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    order={order}
                    setOrder={setOrder}
                    loading={loading}
                    onRefresh={handleRefresh}
                    setOffset={setCurrentOffset}
                />
            </div>

            <MessagesTableWrapper
                loading={loading}
                messages={messages?.items}
                columns={columns}
                paginationProps={{
                    currentOffset,
                    currentLimit,
                    total: messages?.pagination.total ?? 0,
                    onPrev: handlePrevPage,
                    onNext: handleNextPage,
                    isLoading: loading,
                }}
            />
        </div>
    );
}
