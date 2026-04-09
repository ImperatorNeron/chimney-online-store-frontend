import type { ComponentProps, ReactNode } from "react";

import type { ReadExtendedOrderSchema } from "@/api/types/types";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
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
    paginationProps,
}: {
    loading: boolean;
    orders: ReadExtendedOrderSchema[] | undefined;
    columns: Column<ReadExtendedOrderSchema>[];
    expandedOrderId: number | null;
    renderExpandedRow: (order: ReadExtendedOrderSchema) => ReactNode;
    paginationProps: ComponentProps<typeof PaginationControls>;
}) {
    if (loading) return <LoadingState />;
    if (!orders?.length) return <EmptyState />;

    // Гнучкі ширини: пошта та накладна отримують fr, щоб займати вільний простір
    const columnTemplate =
        "40px 130px 90px minmax(150px, 1fr) 100px 110px 100px 70px 120px 100px 80px 110px 40px";
    // Пояснення:
    // 1. № (40)
    // 2. Клієнт (130)
    // 3. Телефон (90)
    // 4. Пошта (min 150, може рости)
    // 5. Дата (100)
    // 6. Доставка (110)
    // 7. Оплата метод (100)
    // 8. Оплачено (70)
    // 9. Накладна (min 90, росте сильніше)
    // 10. Знижка (70)
    // 11. Сума (80)
    // 12. Статус (110)
    // 13. Розгорнути (40)

    return (
        <>
            <OrdersTable
                data={orders}
                columns={columns}
                rowKey={(row) => String(row.id)}
                columnTemplate={columnTemplate}
                expandedRowKey={expandedOrderId ? String(expandedOrderId) : null}
                renderExpandedRow={renderExpandedRow}
            />
            <PaginationControls {...paginationProps} />
        </>
    );
}