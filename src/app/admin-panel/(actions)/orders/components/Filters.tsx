import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import { STATUS_OPTIONS, SHIPPING_METHODS, PAYMENT_METHODS } from "@/constants/orders";

const selectClass =
    "h-[35px] rounded-lg border border-gray-300 text-sm pl-1.5 pr-5 py-1 bg-white w-full appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:14px] bg-[right_2px_center] bg-no-repeat";

const dateClass =
    "h-[35px] rounded-lg border border-gray-300 text-sm px-1.5 py-1 bg-white w-full";

export default function Filters({
    search,
    setSearch,
    loading,
    onRefresh,
    setOffset,
    status,
    setStatus,
    shippingMethod,
    setShippingMethod,
    paymentMethod,
    setPaymentMethod,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
}: {
    search: string;
    setSearch: (v: string) => void;
    loading: boolean;
    onRefresh: () => void;
    setOffset: (offset: number) => void;
    status: string;
    setStatus: (v: string) => void;
    shippingMethod: string;
    setShippingMethod: (v: string) => void;
    paymentMethod: string;
    setPaymentMethod: (v: string) => void;
    dateFrom: string;
    setDateFrom: (v: string) => void;
    dateTo: string;
    setDateTo: (v: string) => void;
}) {
    const handleFilter = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setter(e.target.value);
        setOffset(0);
    };

    return (
        <div className="flex items-center gap-2 w-full">
            <div className="flex-[2] min-w-0">
                <SearchFilter
                    value={search}
                    onChange={setSearch}
                    setOffset={setOffset}
                    placeholder="Пошук по ПІБ або телефону..."
                />
            </div>
            <div className="flex-1 min-w-0">
                <select className={selectClass} value={status} onChange={handleFilter(setStatus)}>
                    <option value="">Всі статуси</option>
                    {STATUS_OPTIONS.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1 min-w-0">
                <select className={selectClass} value={shippingMethod} onChange={handleFilter(setShippingMethod)}>
                    <option value="">Доставка</option>
                    {Object.entries(SHIPPING_METHODS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1 min-w-0">
                <select className={selectClass} value={paymentMethod} onChange={handleFilter(setPaymentMethod)}>
                    <option value="">Оплата</option>
                    {Object.entries(PAYMENT_METHODS).map(([v, l]) => (
                        <option key={v} value={v}>{l}</option>
                    ))}
                </select>
            </div>
            <div className="flex-1 min-w-0">
                <input
                    type="date"
                    className={dateClass}
                    value={dateFrom ?? ""}
                    onChange={handleFilter(setDateFrom)}
                    title="Дата від"
                />
            </div>
            <div className="flex-1 min-w-0">
                <input
                    type="date"
                    className={dateClass}
                    value={dateTo ?? ""}
                    onChange={handleFilter(setDateTo)}
                    title="Дата до"
                />
            </div>
            <RefreshButton onClick={onRefresh} loading={loading} />
        </div>
    );
}
