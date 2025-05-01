import Filters from "./Filters";

export default function DesktopFilterBlock({ filters }: { filters: BaseFilters }) {
    return (
        <div className="hidden lg:flex flex-col p-4 rounded-xl shadow-sm bg-white border border-gray-200 self-start w-80">
            <div className="pb-4 border-b border-gray-200 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Фільтри</h2>
            </div>

            <Filters filters={filters} />
        </div>
    );
}
