import type { ReactNode } from "react";

import type { ReadExtendedOrderSchema } from "@/api/types/types";
import EmptyState from "@/components/modules/admin/components/products/EmptyState";
import LoadingState from "@/components/modules/admin/components/products/LoadingState";
import type { Column } from "@/components/shared/AdminTable";

import OrdersTable from "./OrdersTable";

export default function OrdersTableWrapper({
    loading,
    orders,
    columns,
    expandedOrderId,
    renderExpandedRow,
}: {
    loading: boolean;
    orders: ReadExtendedOrderSchema[] | undefined;
    columns: Column<ReadExtendedOrderSchema>[];
    expandedOrderId: number | null;
    renderExpandedRow: (order: ReadExtendedOrderSchema) => ReactNode;
}) {
    if (loading && !orders?.length) return <LoadingState />;
    if (!orders?.length) return <EmptyState />;

    const columnTemplate =
        "40px 130px 100px minmax(130px, 1fr) 95px 110px 100px 85px minmax(100px, 1fr) 90px 80px 110px 40px";

    return (
        <OrdersTable
            data={orders}
            columns={columns}
            rowKey={(row) => String(row.id)}
            columnTemplate={columnTemplate}
            expandedRowKey={expandedOrderId ? String(expandedOrderId) : null}
            renderExpandedRow={renderExpandedRow}
        />
    );
}
