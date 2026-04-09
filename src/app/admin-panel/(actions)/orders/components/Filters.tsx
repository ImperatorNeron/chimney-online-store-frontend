import SearchFilter from "@/components/shared/AdminTableSearctFilter";
import RefreshButton from "@/components/shared/AdminTableRefreshButton";

export default function Filters({
    search,
    setSearch,
    loading,
    onRefresh,
    setOffset,
}: {
    search: string;
    setSearch: (v: string) => void;
    loading: boolean;
    onRefresh: () => void;
    setOffset: (offset: number) => void;
}) {
    return (
        <div className="flex flex-wrap gap-3 w-full md:w-auto items-end">
            <SearchFilter
                value={search}
                onChange={setSearch}
                setOffset={setOffset}
                placeholder="Пошук по ПІБ або телефону..."
            />
            <RefreshButton onClick={onRefresh} loading={loading} />
        </div>
    );
}

