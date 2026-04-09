import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import { STATUS_OPTIONS, SHIPPING_METHODS, PAYMENT_METHODS } from "@/constants/orders";

const selectClass =
    "h-[35px] rounded-lg border border-gray-300 text-sm pl-2 pr-6 py-1 bg-white min-w-[140px] appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%236b7280%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20d%3D%22M5.23%207.21a.75.75%200%20011.06.02L10%2011.168l3.71-3.938a.75.75%200%20111.08%201.04l-4.25%204.5a.75.75%200%2001-1.08%200l-4.25-4.5a.75.75%200%2001.02-1.06z%22%20clip-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E')] bg-[length:16px] bg-[right_4px_center] bg-no-repeat";

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
}) {
    const handleFilter = (setter: (v: string) => void) => (e: React.ChangeEvent<HTMLSelectElement>) => {
        setter(e.target.value);
        setOffset(0);
    };

    return (
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-end">
            <SearchFilter
                value={search}
                onChange={setSearch}
                setOffset={setOffset}
                placeholder="Пошук по ПІБ або телефону..."
            />
            <select className={selectClass} value={status} onChange={handleFilter(setStatus)}>
                <option value="">Всі статуси</option>
                {STATUS_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                ))}
            </select>
            <select className={selectClass} value={shippingMethod} onChange={handleFilter(setShippingMethod)}>
                <option value="">Всі доставки</option>
                {Object.entries(SHIPPING_METHODS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                ))}
            </select>
            <select className={selectClass} value={paymentMethod} onChange={handleFilter(setPaymentMethod)}>
                <option value="">Всі оплати</option>
                {Object.entries(PAYMENT_METHODS).map(([v, l]) => (
                    <option key={v} value={v}>{l}</option>
                ))}
            </select>
            <RefreshButton onClick={onRefresh} loading={loading} />
        </div>
    );
}
