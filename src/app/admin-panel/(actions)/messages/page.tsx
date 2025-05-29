'use client'

import MessageSkeleton from "@/components/layout/loaders/MessageSkeleton";
import MessageCard from "@/components/modules/admin/components/messages/messageCard";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import useDeleteMessage from "@/components/modules/admin/hooks/messages/useDeleteMessage";
import useFetchMessages from "@/components/modules/admin/hooks/messages/useMessages";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import BackToPageButton from "@/components/ui/BackToPageButton";
import { useEffect } from "react";


export default function AdminMessagesPage() {
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage } = usePagination();
    const { messages, loading, reload } = useFetchMessages(currentLimit, currentOffset);
    const { handleDelete, deletingId } = useDeleteMessage({
        onReload: reload,
        onAfterDelete: () => {
            if (messages?.items?.length === 1 && currentOffset > 0) {
                handlePrevPage();
            }
        }
    });

    useEffect(() => {
        document.title = "Повідомлення користувачів";
    }, []);

    if (loading) {
        return <MessageSkeleton />;
    }

    return (
        <div className="px-4 pt-8">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
            <div className="lg:p-8 max-w-6xl mx-auto min-h-screen mb-16">

                <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-8 text-center border-b-2 border-gray-200 pb-6">
                    Повідомлення від клієнтів
                </h1>

                {messages && (
                    <>
                        <PaginationControls
                            currentOffset={currentOffset}
                            currentLimit={currentLimit}
                            total={messages.pagination.total}
                            onPrev={handlePrevPage}
                            onNext={handleNextPage}
                            isLoading={loading}
                        />

                        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                            {messages.items.map((message) => (
                                <MessageCard
                                    key={message.id}
                                    message={{
                                        ...message,
                                        created_at: message.created_at,
                                    }}
                                    onDelete={handleDelete}
                                    isDeleting={deletingId === message.id}
                                />
                            ))}
                        </div>

                        <PaginationControls
                            currentOffset={currentOffset}
                            currentLimit={currentLimit}
                            total={messages.pagination.total}
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