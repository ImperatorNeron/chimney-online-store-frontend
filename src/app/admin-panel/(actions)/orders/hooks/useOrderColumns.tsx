import { ChevronDownIcon } from "@heroicons/react/24/outline";

import type { UpdateOrderSchema, ReadExtendedOrderSchema } from "@/api/types/types";
import type { Column } from "@/components/shared/AdminTable";
import SortableHeader from "@/components/shared/AdminTableSortableHeader";
import type { OrderSortField, SortOrdering } from "@/constants/orderFields";
import { PAYMENT_METHODS, SHIPPING_METHODS, STATUS_OPTIONS } from "@/constants/orders";
import formatDate from "@/utils/formatDate";
import EditableCell from "@/components/modules/admin/components/orders/EditableCell";

const compactSelectClass =
    "h-7 w-full min-w-[90px] text-xs border border-gray-300 rounded bg-white px-1 py-0 focus:outline-none focus:ring-1 focus:ring-blue-200";

export default function useOrderColumns({
    sortField,
    sortOrdering,
    onSort,
    expandedOrderId,
    onToggleExpand,
    onQuickUpdate,
    isUpdating,
}: {
    sortField: OrderSortField;
    sortOrdering: SortOrdering;
    onSort: (field: OrderSortField) => void;
    expandedOrderId: number | null;
    onToggleExpand: (id: number) => void;
    onQuickUpdate: (id: number, patch: Partial<UpdateOrderSchema>) => void;
    isUpdating: (id: number) => boolean;
}): Column<ReadExtendedOrderSchema>[] {
    const shippingOptions = Object.entries(SHIPPING_METHODS).map(([value, label]) => ({ value, label }));
    const paymentOptions = Object.entries(PAYMENT_METHODS).map(([value, label]) => ({ value, label }));
    const statusOptions = STATUS_OPTIONS.map(({ value, label }) => ({ value, label }));

    return [
        {
            header: (
                <SortableHeader
                    label="№"
                    sortField="id"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => <b className="text-xs">{o.id}</b>,
            className: "text-center",
        },
        {
            header: (
                <SortableHeader
                    label="Клієнт"
                    sortField="last_name"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => (
                <div className="flex flex-col text-xs leading-tight">
                    <span className="font-semibold truncate">{o.last_name}</span>
                    <span className="truncate">{o.first_name}</span>
                    {o.patronymic && <span className="text-gray-500 truncate">{o.patronymic}</span>}
                </div>
            ),
            className: "min-w-[130px]",
        },
        {
            header: (
                <SortableHeader
                    label="Телефон"
                    sortField="phone_number"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => <span className="text-xs">{o.phone_number}</span>,
        },
        {
            header: (
                <SortableHeader
                    label="Пошта"
                    sortField="email"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => <div className="text-xs break-all">{o.email}</div>,
            className: "min-w-[150px]",
        },
        {
            header: (
                <SortableHeader
                    label="Дата"
                    sortField="created_at"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => <span className="text-xs text-gray-600 whitespace-nowrap">{formatDate(o.created_at)}</span>,
            className: "min-w-[100px]",
        },
        {
            header: "Доставка",
            render: (o) => (
                <div className={isUpdating(o.id) ? "pointer-events-none opacity-60" : ""}>
                    <select
                        className={compactSelectClass}
                        value={o.shipping_method}
                        onChange={(e) => onQuickUpdate(o.id, { shipping_method: e.target.value })}
                    >
                        {shippingOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ),
            className: "min-w-[110px]",
        },
        {
            header: "Оплата",
            render: (o) => (
                <div className={isUpdating(o.id) ? "pointer-events-none opacity-60" : ""}>
                    <select
                        className={compactSelectClass}
                        value={o.payment_method}
                        onChange={(e) => onQuickUpdate(o.id, { payment_method: e.target.value })}
                    >
                        {paymentOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ),
            className: "min-w-[100px]",
        },
        {
            header: (
                <SortableHeader
                    label="Оплачено"
                    sortField="is_paid"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => (
                <label className="inline-flex items-center gap-1">
                    <input
                        type="checkbox"
                        className="h-3.5 w-3.5"
                        checked={Boolean(o.is_paid)}
                        disabled={isUpdating(o.id)}
                        onChange={(e) => onQuickUpdate(o.id, { is_paid: e.target.checked })}
                    />
                    <span className={`text-xs font-semibold ${o.is_paid ? "text-green-700" : "text-gray-600"}`}>
                        {o.is_paid ? "Так" : "Ні"}
                    </span>
                </label>
            ),
            className: "min-w-[70px]",
        },
        {
            header: "Накладна",
            render: (o) => (
                <EditableCell
                    value={o.waybill_number || ""}
                    onSave={(val) => onQuickUpdate(o.id, { waybill_number: val })}
                    disabled={isUpdating(o.id)}
                    placeholder="№ ТТН"
                />
            ),
            className: "min-w-[110px]",
        },
        {
            header: (
                <SortableHeader
                    label="Знижка"
                    sortField="price_discount"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => (
                <EditableCell
                    value={o.price_discount ?? "0"}
                    onSave={(val) => {
                        // quickUpdate всередині перетворить рядок через calcPriceDiscount
                        onQuickUpdate(o.id, { price_discount: val });
                    }}
                    disabled={isUpdating(o.id)}
                    placeholder="0"
                />
            ),
            className: "min-w-[90px]",
        },
        {
            header: "Сума",
            render: (o) => <span className="text-xs">{Number(o.total_price || 0)} грн</span>,
            className: "min-w-[80px]",
        },
        {
            header: (
                <SortableHeader
                    label="Статус"
                    sortField="status"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (o) => (
                <div className={isUpdating(o.id) ? "pointer-events-none opacity-60" : ""}>
                    <select
                        className={compactSelectClass}
                        value={o.status}
                        onChange={(e) => onQuickUpdate(o.id, { status: e.target.value })}
                    >
                        {statusOptions.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            ),
            className: "min-w-[110px]",
        },
        {
            header: " ",
            render: (o) => (
                <button
                    type="button"
                    onClick={() => onToggleExpand(o.id)}
                    className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-full"
                    aria-label="Розгорнути"
                    disabled={isUpdating(o.id)}
                >
                    <ChevronDownIcon
                        className={`w-4 h-4 transition-transform duration-200 ${
                            expandedOrderId === o.id ? "rotate-180" : ""
                        }`}
                    />
                </button>
            ),
            className: "w-10",
        },
    ];
}