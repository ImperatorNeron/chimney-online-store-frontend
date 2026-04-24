import type { MessageStatus } from "@/api/services/message.service";
import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";

const dateClass =
    "h-[35px] rounded-lg border border-gray-300 text-sm px-1.5 py-1 bg-white";

export default function Filters({
    search,
    setSearch,
    status,
    setStatus,
    loading,
    onRefresh,
    setOffset,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
}: {
    search: string;
    setSearch: (v: string) => void;
    status: MessageStatus | "all";
    setStatus: (v: MessageStatus | "all") => void;
    loading: boolean;
    onRefresh: () => void;
    setOffset: (offset: number) => void;
    dateFrom: string;
    setDateFrom: (v: string) => void;
    dateTo: string;
    setDateTo: (v: string) => void;
}) {
    return (
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-end">
            <SearchFilter value={search} onChange={setSearch} setOffset={setOffset} />
            <SelectFilter
                value={status}
                onChange={setStatus}
                setOffset={setOffset}
                options={[
                    { value: "all", label: "Всі" },
                    { value: "new", label: "Нові" },
                    { value: "progress", label: "Обробляється" },
                    { value: "read", label: "Прочитано" },
                ]}
            />
            <input type="date" className={dateClass} value={dateFrom} onChange={(e) => { setDateFrom(e.target.value); setOffset(0); }} title="Дата від" />
            <input type="date" className={dateClass} value={dateTo} onChange={(e) => { setDateTo(e.target.value); setOffset(0); }} title="Дата до" />
            <RefreshButton onClick={onRefresh} loading={loading} />
        </div>
    );
}
