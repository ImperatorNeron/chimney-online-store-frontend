'use client';

import { useMemo, useState } from "react";

import { MessageStatus } from "@/api/services/message.service";
import useFetchMessages from "@/components/modules/admin/hooks/messages/useMessages";
import useChangeMessageStatus from "@/components/modules/admin/hooks/messages/useChangeMessageStatus";
import useDeleteMessage from "@/components/modules/admin/hooks/messages/useDeleteMessage";
import { MessageSortField, SortOrdering } from "@/constants/orderFields";
import useDebounce from "@/hooks/forms/useDebounce";
import InfiniteScrollSentinel from "@/components/modules/admin/components/InfiniteScrollSentinel";

import Filters from "./components/Filters";
import MessagesTableWrapper from "./components/MessagesTableWrapper";
import useMessageColumns from "./hooks/useMessageColumns";

export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<MessageStatus | "all">("all");
    const [sortField, setSortField] = useState<MessageSortField>("created_at");
    const [sortOrdering, setSortOrdering] = useState<SortOrdering>("desc");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");

    const debouncedSearch = useDebounce(search, 400);

    const handleSort = (field: MessageSortField) => {
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
            status: status !== "all" ? status : undefined,
            field: sortField,
            ordering: sortOrdering,
            date_from: dateFrom || undefined,
            date_to: dateTo || undefined,
        }),
        [debouncedSearch, status, sortField, sortOrdering, dateFrom, dateTo]
    );

    const { items, total, loading, loadingMore, hasMore, loadMore, reload } = useFetchMessages(params);

    const { handleDelete } = useDeleteMessage({ onReload: reload });
    const { changeStatus } = useChangeMessageStatus({ onReload: reload });

    const columns = useMessageColumns(changeStatus, handleDelete, sortField, sortOrdering, handleSort);

    const handleRefresh = () => {
        setSearch("");
        setStatus("all");
        setSortField("created_at");
        setSortOrdering("desc");
        setDateFrom("");
        setDateTo("");
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">Повідомлення клієнтів</h1>
                    <p className="text-gray-600">Перегляд повідомлень з форми зворотнього зв&apos;язку</p>
                </div>
                <Filters
                    search={search}
                    setSearch={setSearch}
                    status={status}
                    setStatus={setStatus}
                    loading={loading}
                    onRefresh={handleRefresh}
                    setOffset={() => {}}
                    dateFrom={dateFrom}
                    setDateFrom={setDateFrom}
                    dateTo={dateTo}
                    setDateTo={setDateTo}
                />
            </div>

            <MessagesTableWrapper
                loading={loading}
                messages={items}
                columns={columns}
            />

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
