import type { ReadMessage } from "@/api/types/types";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import LoadingState from "@/components/modules/admin/components/products/LoadingState";
import GenericTable, { type Column } from "@/components/shared/AdminTable";

export default function MessagesTableWrapper({
    loading,
    messages,
    columns,
}: {
    loading: boolean;
    messages: ReadMessage[];
    columns: Column<ReadMessage>[];
}) {
    if (loading && !messages.length) return <LoadingState />;
    if (!messages.length) return <EmptyState />;

    return (
        <GenericTable
            data={messages}
            columns={columns}
            rowKey={(row) => String(row.id)}
            columnTemplate="minmax(150px, 1fr) 130px 150px minmax(250px, 2fr) 180px 50px"
        />
    );
}
