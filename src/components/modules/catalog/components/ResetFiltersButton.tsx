'use client';

import useResetFilters from "../hooks/useResetFilters";

export default function ResetFiltersButton() {
    const { resetFilters, hasRemovableFilters, loading } = useResetFilters(['text', 'limit', 'field', 'ordering']);

    if (!hasRemovableFilters) return null;

    return (
        <button
            onClick={resetFilters}
            disabled={loading}
            className={`w-full p-2 border-2 rounded-lg mt-3 transition-colors duration-200
                ${loading ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'border-gray-800 hover:bg-gray-50'}`}
        >
            {loading ? <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" /> : 'Скинути фільтри'}
        </button>
    );
}
