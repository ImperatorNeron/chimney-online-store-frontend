'use client'

import { FunnelIcon } from "@heroicons/react/24/solid";
import { useSearchParams } from "next/navigation";
import { ProductFiltersSchema } from "@/api/types/types";
import FiltersOverlay from "./FiltersOverlay";
import useMobileFilters from "../hooks/useMobileFilters";

const IGNORED_KEYS = ['text', 'limit', 'field', 'ordering', 'page'];

export default function MobileFilterButton({ filters }: { filters: ProductFiltersSchema }) {
    const { isOpen, toggleMenu, closeMenu } = useMobileFilters();
    const searchParams = useSearchParams();

    const activeCount = Array.from(searchParams.keys()).filter(k => !IGNORED_KEYS.includes(k)).length;

    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 p-3 shadow-lg transition-colors duration-200 hover:bg-gray-600 z-50 lg:hidden"
                aria-label="Відкрити фільтри"
            >
                <FunnelIcon className="h-6 w-6 text-white" />
                {activeCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-gray-500 text-white text-[10px] font-bold">
                        {activeCount}
                    </span>
                )}
            </button>

            <FiltersOverlay isOpen={isOpen} onClose={closeMenu} filters={filters} />
        </>
    );
}
