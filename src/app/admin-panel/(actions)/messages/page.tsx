'use client'

import EmptyMessages from "@/components/modules/admin/components/messages/emptyMessages";
import MessageCard from "@/components/modules/admin/components/messages/messageCard";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import useDeleteMessage from "@/components/modules/admin/hooks/messages/useDeleteMessage";
import useMessages from "@/components/modules/admin/hooks/messages/useMessages";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import BackToPageButton from "@/components/ui/BackToPageButton";


export default function AdminMessagesPage() {
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage } = usePagination();
    const { messages, loading, reload } = useMessages(currentLimit, currentOffset);
    const { handleDelete, deletingId } = useDeleteMessage({
        onReload: reload,
        onAfterDelete: () => {
            if (messages?.items?.length === 1 && currentOffset > 0) {
                handlePrevPage();
            }
        }
    });

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-700 text-2xl">
                Завантаження повідомлень...
            </div>
        );
    }

    return (
        <div className="lg:p-8 max-w-4xl mx-auto min-h-screen">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />

            <h1 className="text-4xl font-semibold text-gray-900 mb-8 text-center border-b-2 border-gray-200 pb-6">
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

                    {messages.items.length === 0 ? (
                        <EmptyMessages />
                    ) : (
                        <div className="space-y-6">
                            {messages.items.map((message) => (
                                <MessageCard
                                    key={message.id}
                                    message={{
                                        ...message,
                                        created_at: new Date(message.created_at),
                                    }}
                                    onDelete={handleDelete}
                                    isDeleting={deletingId === message.id}
                                />
                            ))}
                        </div>
                    )}

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
    );
}