'use client'
import { FunnelIcon } from "@heroicons/react/24/solid";
import FiltersOverlay from "./FiltersOverlay";
import useMobileFilters from "../hooks/useMobileFilters";

export default function MobileFilterButton({ filters }: { filters: BaseFilters }) {
    const { isOpen, toggleMenu, closeMenu } = useMobileFilters();
    return (
        <>
            <button
                onClick={toggleMenu}
                className="fixed bottom-4 left-4 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-gray-800 text-white shadow-lg transition hover:bg-gray-900 lg:hidden"
                aria-label="Відкрити фільтри"
            >
                <FunnelIcon className="h-6 w-6" />
            </button>

            <FiltersOverlay
                isOpen={isOpen}
                onClose={closeMenu}
                filters={filters}
            />
        </>
    );
};

