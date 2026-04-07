import type { MessageStatus } from "@/api/services/message.service";
import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";

export default function Filters({
    search,
    setSearch,
    status,
    setStatus,
    loading,
    onRefresh,
    setOffset,
}: {
    search: string;
    setSearch: (v: string) => void;
    status: MessageStatus | "all";
    setStatus: (v: MessageStatus | "all") => void;
    loading: boolean;
    onRefresh: () => void;
    setOffset: (offset: number) => void;
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
            <RefreshButton onClick={onRefresh} loading={loading} />
        </div>
    );
}
