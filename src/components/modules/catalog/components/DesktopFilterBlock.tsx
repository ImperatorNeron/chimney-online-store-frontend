import { ProductFiltersSchema } from "@/api/types/types";
import Filters from "./Filters";

export default function DesktopFilterBlock({ filters }: { filters: ProductFiltersSchema }) {
    return (
        <div className="hidden lg:flex flex-col rounded-xl shadow-sm bg-white border border-gray-200 sticky top-24 w-[360px] pb-2.5 max-h-[calc(100vh-7rem)]">
            <div className="p-4 pb-3 border-b border-gray-200 shrink-0">
                <h2 className="text-xl font-bold text-gray-900">Фільтри</h2>
            </div>

            <div className="overflow-y-auto p-4 pt-3">
                <Filters filters={filters} />
            </div>
        </div>
    );
}
