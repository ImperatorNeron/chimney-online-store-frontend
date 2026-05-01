import { ProductFiltersSchema } from "@/api/types/types";
import Filters from "./Filters";

export default function DesktopFilterBlock({ filters }: { filters: ProductFiltersSchema }) {
    return (
        <div className="hidden lg:block p-4 rounded-xl shadow-sm bg-white border border-gray-200 sticky top-24 w-80 max-h-[calc(100vh-7rem)] overflow-y-auto">
            <div className="pb-4 border-b border-gray-200 mb-4">
                <h2 className="text-xl font-bold text-gray-900">Фільтри</h2>
            </div>

            <Filters filters={filters} />
        </div>
    );
}
