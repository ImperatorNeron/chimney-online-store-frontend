'use client';

import { useMemo, useState } from "react";

import { MessageStatus } from "@/api/services/message.service";
import useFetchMessages from "@/components/modules/admin/hooks/messages/useMessages";
import useChangeMessageStatus from "@/components/modules/admin/hooks/messages/useChangeMessageStatus";
import useDeleteMessage from "@/components/modules/admin/hooks/messages/useDeleteMessage";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import { MessageSortField, SortOrdering } from "@/constants/orderFields";
import useDebounce from "@/hooks/forms/useDebounce";

import Filters from "./components/Filters";
import MessagesTableWrapper from "./components/MessagesTableWrapper";
import useMessageColumns from "./hooks/useMessageColumns";

export default function MessagesPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<MessageStatus | "all">("all");
    const [sortField, setSortField] = useState<MessageSortField>("created_at");
    const [sortOrdering, setSortOrdering] = useState<SortOrdering>("desc");

    const debouncedSearch = useDebounce(search, 400);
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage, setCurrentOffset } = usePagination();

    const handleSort = (field: MessageSortField) => {
        setCurrentOffset(0);
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
        }),
        [debouncedSearch, status, sortField, sortOrdering]
    );

    const { messages, loading, reload } = useFetchMessages(currentLimit, currentOffset, params);

    const { handleDelete } = useDeleteMessage({
        onReload: reload,
        onAfterDelete: () => {
            if (messages?.items?.length === 1 && currentOffset > 0) handlePrevPage();
        },
    });

    const { changeStatus } = useChangeMessageStatus({ onReload: reload });

    const columns = useMessageColumns(changeStatus, handleDelete, sortField, sortOrdering, handleSort);

    const handleRefresh = () => {
        setSearch("");
        setStatus("all");
        setSortField("created_at");
        setSortOrdering("desc");
        setCurrentOffset(0);
    };

    return (
        <div className="max-w-screen-2xl mx-auto">
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
