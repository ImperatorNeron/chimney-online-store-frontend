'use client'
import { FunnelIcon } from "@heroicons/react/24/solid";
import FiltersOverlay from "./FiltersOverlay";
import useMobileFilters from "../hooks/useMobileFilters";
import { ProductFiltersSchema } from "@/api/types/types";

export default function MobileFilterButton({ filters }: { filters: ProductFiltersSchema }) {
    const { isOpen, toggleMenu, closeMenu } = useMobileFilters();
    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-800 p-3 shadow-lg transition-colors duration-200 hover:bg-gray-600 z-50 lg:hidden"
                aria-label="Відкрити фільтри"
            >
                <FunnelIcon className="h-6 w-6 text-white" />
            </button>

            <FiltersOverlay
                isOpen={isOpen}
                onClose={closeMenu}
                filters={filters}
            />
        </>
    );
};

