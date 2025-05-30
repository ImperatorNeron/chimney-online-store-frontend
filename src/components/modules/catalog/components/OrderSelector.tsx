"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useOrderSelector from "../hooks/useOrderSelector";

export default function OrderSelector() {
    const { currentValue, handleChange } = useOrderSelector();

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="ordering" className="text-sm font-medium text-gray-700 ml-1">
                Сортувати:
            </label>
            <div className="relative w-44">
                <select
                    id="ordering"
                    value={currentValue}
                    onChange={handleChange}
                    className="peer w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all"
                >
                    <option value="final_price:asc">Від дешевих</option>
                    <option value="final_price:desc">Від дорогих</option>
                    <option value="created_at:desc">Спочатку старі</option>
                    <option value="created_at:asc">Спочатку нові</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
}
