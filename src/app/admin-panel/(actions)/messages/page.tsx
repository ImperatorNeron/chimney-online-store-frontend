'use client'

import { useMemo, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import useFetchMessages from "@/components/modules/admin/hooks/messages/useMessages";
import useDeleteMessage from "@/components/modules/admin/hooks/messages/useDeleteMessage";
import useChangeMessageStatus from "@/components/modules/admin/hooks/messages/useChangeMessageStatus";
import { ReadMessage } from "@/api/types/types";
import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import GenericTable, { Column } from "@/components/shared/AdminTable";
import formatDate from "@/utils/formatDate";
import useDebounce from "@/hooks/forms/useDebounce";
import { MessageStatus } from "@/api/services/message.service";
import BackToPageButton from "@/components/ui/BackToPageButton";


export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<MessageStatus | "all">("all");
    const [order, setOrder] = useState<"newest" | "oldest">("newest");
    const debouncedSearch = useDebounce(search, 400);
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage } = usePagination();
    const params = useMemo(
        () => ({
            text: debouncedSearch || undefined,
            status: status !== "all" ? status : undefined,
            field: "created_at",
            ordering: order === "newest" ? "desc" : "asc",
        }),
        [debouncedSearch, status, order]
    );

    const { messages, loading, reload } = useFetchMessages(
        currentLimit,
        currentOffset,
        params
    );

    // Rewatch solution due to additional query
    const handleRefresh = () => {
        setSearch("");
        setStatus("all");
        setOrder("newest");
    };

    const { handleDelete } = useDeleteMessage({
        onReload: reload,
        onAfterDelete: () => {
            if (messages?.items?.length === 1 && currentOffset > 0) handlePrevPage();
        },
    });

    const { changeStatus } = useChangeMessageStatus({ onReload: reload });

    const columns: Column<ReadMessage>[] = [
        { header: "Клієнт", render: (m) => <b>{m.user_name}</b> },
        { header: "Контакти", render: (m) => m.phone_number },
        {
            header: "Дата",
            render: (m) => formatDate(m.created_at),
            className: "text-sm text-gray-500",
        },
        { header: "Повідомлення", render: (m) => m.message },
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
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            ),
        },
    ];

    return (
        <div className="min-h-screen px-4 md:px-8">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
            <div className="max-w-screen-2xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold">Повідомлення клієнтів</h1>
                        <p className="text-gray-600">
                            Перегляд повідомлень з форми зворотнього зв'язку
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-3 w-full md:w-auto items-center">
                        <SearchFilter value={search} onChange={setSearch} />
                        <SelectFilter
                            value={status}
                            onChange={setStatus}
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
                            options={[
                                { value: "newest", label: "Новіші" },
                                { value: "oldest", label: "Старіші" },
                            ]}
                        />
                        <RefreshButton onClick={handleRefresh} loading={loading} />
                    </div>
                </div>

                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : messages?.items.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                        Повідомлень не знайдено
                    </div>
                ) : (
                    <>
                        <GenericTable
                            data={messages?.items ?? []}
                            columns={columns}
                            rowKey={(row) => String(row.id)}
                        />
                        <PaginationControls
                            currentOffset={currentOffset}
                            currentLimit={currentLimit}
                            total={messages?.pagination.total ?? 0}
                            onPrev={handlePrevPage}
                            onNext={handleNextPage}
                            isLoading={loading}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
