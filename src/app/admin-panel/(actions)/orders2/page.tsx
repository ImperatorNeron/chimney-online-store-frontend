'use client'

import { ReadExtendedOrderSchema } from "@/api/types/types";
import PaginationControls from "@/components/modules/admin/components/messages/pagination";
import useOrders from "@/components/modules/admin/hooks/orders/useOrders";
import usePagination from "@/components/modules/admin/hooks/products/usePagination";
import GenericTable, { Column } from "@/components/shared/AdminTable";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import BackToPageButton from "@/components/ui/BackToPageButton";
import { PAYMENT_METHODS, SHIPPING_METHODS, STATUS_OPTIONS } from "@/constants/orders";
import formatDate from "@/utils/formatDate";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export default function OrdersPage() {
    const { currentOffset, currentLimit, handleNextPage, handlePrevPage } = usePagination();
    const { orders, loading, setOrders } = useOrders(currentLimit, currentOffset);

    const shippingOptions = Object.entries(SHIPPING_METHODS).map(([value, label]) => ({ value, label }));
    const paymentOptions = Object.entries(PAYMENT_METHODS).map(([value, label]) => ({ value, label }));

    const columns: Column<ReadExtendedOrderSchema>[] = [
        { header: "№", render: (m) => <b>{m.id}</b> },
        { header: "Клієнт", render: (m) => <b>{m.last_name} {m.first_name}</b> },
        { header: "Телефон", render: (m) => m.phone_number },
        { header: "Пошта", render: (m) => <div className="break-words break-all">{m.email}</div> },
        {
            header: "Дата",
            render: (m) => formatDate(m.created_at),
            className: "text-gray-500",
        },
        {
            header: "Спосіб доставки", render: (m) => (
                <SelectFilter
                    value={m.shipping_method}
                    onChange={(val) => true}
                    options={shippingOptions}
                />
            ),
        },
        {
            header: "Спосіб оплати", render: (m) => (
                <SelectFilter
                    value={m.payment_method}
                    onChange={(val) => true}
                    options={paymentOptions}
                />
            ),
        },
        { header: "Номер накладної", render: (m) => m.waybill_number },
        { header: "Знижка", render: (m) => m.price_discount },
        { header: "Сума, грн", render: (m) => m.total_price },
        {
            header: "Статус", render: (m) => (
                <SelectFilter
                    value={STATUS_OPTIONS.find(s => s.value === m.status)?.label ?? ""}
                    onChange={(val) => true}
                    options={STATUS_OPTIONS.map(option => ({ ...option }))}
                />
            ),
        },
        {
            header: "Товар",
            render: (m) => (
                <button
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full"
                >
                    <ChevronDownIcon
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ease-in-out ${false ? 'rotate-180' : ''
                            }`}
                    />
                </button>
            ),
        },

    ];
    return (

        <div className="min-h-screen px-4 md:px-8">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
            <div className="max-w-screen-2xl mx-auto">


                {/* Content */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : orders?.items.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
                        Повідомлень не знайдено
                    </div>
                ) : (
                    <>
                        <GenericTable
                            data={orders?.items ?? []}
                            columns={columns}
                            rowKey={(row) => String(row.id)}
                            columnTemplate="25px 90px 80px 1fr 100px 165px 200px 140px 70px 80px 150px auto"
                        />
                        <PaginationControls
                            currentOffset={currentOffset}
                            currentLimit={currentLimit}
                            total={orders?.pagination.total ?? 0}
                            onPrev={handlePrevPage}
                            onNext={handleNextPage}
                            isLoading={loading}
                        />
                    </>
                )}
            </div>
        </div>
    )
}