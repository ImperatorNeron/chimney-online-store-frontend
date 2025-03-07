import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import type { FC } from "react";

export const MobileSearchBar: FC = () => (
    <div className="flex items-center gap-1 mb-2">
        <input
            type="text"
            placeholder="Пошук товарів..."
            className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500 bg-white"
        />
        <button className="bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition-colors duration-200">
            <MagnifyingGlassIcon className="h-6" />
        </button>
    </div>
);