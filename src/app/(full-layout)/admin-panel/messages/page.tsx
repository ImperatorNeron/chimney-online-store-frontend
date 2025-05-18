'use client'

import EmptyMessages from "@/components/modules/admin/components/emptyMessages";
import MessageCard from "@/components/modules/admin/components/messageCard";
import PaginationControls from "@/components/modules/admin/components/pagination";
import useMessages from "@/components/modules/admin/hooks/useMessages";


export default function AdminMessagesPage() {
    const {
        messages,
        loading,
        deletingId,
        currentLimit,
        currentOffset,
        handleDelete,
        handleNextPage,
        handlePrevPage
    } = useMessages();

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-700 text-2xl">
                Завантаження повідомлень...
            </div>
        );
    }

    return (
        <div className="lg:p-8 max-w-4xl mx-auto min-h-screen">
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