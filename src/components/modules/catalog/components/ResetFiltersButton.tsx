'use client';

import useResetFilters from "../hooks/useResetFilters";


export default function ResetFiltersButton() {
    const { resetFilters, hasRemovableFilters } = useResetFilters(['text', 'limit', 'field', 'ordering']);

    if (!hasRemovableFilters) return null;

    return (
        <button onClick={resetFilters} className="w-full p-2 border-2 rounded-lg border-gray-800 mt-3 hover:bg-gray-50 transition-colors duration-200">
            Скинути фільтри
        </button>
    );
}
