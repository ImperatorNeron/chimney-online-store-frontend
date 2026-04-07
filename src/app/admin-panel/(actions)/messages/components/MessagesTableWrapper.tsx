import type { ComponentProps } from "react";

import type { ReadMessage } from "@/api/types/types";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import LoadingState from "@/components/modules/admin/components/products/LoadingState";
import GenericTable, { type Column } from "@/components/shared/AdminTable";

export default function MessagesTableWrapper({
    loading,
    messages,
    columns,
    paginationProps,
}: {
    loading: boolean;
    messages: ReadMessage[] | undefined;
    columns: Column<ReadMessage>[];
    paginationProps: ComponentProps<typeof PaginationControls>;
}) {
    if (loading) return <LoadingState />;
    if (!messages?.length) return <EmptyState />;

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

