'use client'

import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useCatalogNavigation } from "../providers/CatalogNavigationProvider";

const IGNORED_KEYS = ['text', 'limit', 'field', 'ordering', 'page'];

const LABELS: Record<string, string> = {
    diameter: 'Діаметр',
    length: 'Довжина',
    thickness: 'Товщина',
    angle: 'Кут',
    metal_type: 'Метал',
    min_price: 'Від',
    max_price: 'До',
};

export default function ActiveFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { navigate } = useCatalogNavigation();

    const activeFilters = Array.from(searchParams.entries()).filter(
        ([key]) => !IGNORED_KEYS.includes(key)
    );

    if (activeFilters.length === 0) return null;

    const removeFilter = (key: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        params.delete("page");
        navigate(() => router.replace(`?${params.toString()}`, { scroll: false }));
    };

    const clearAll = () => {
        const params = new URLSearchParams(searchParams);
        activeFilters.forEach(([key]) => params.delete(key));
        params.delete("page");
        navigate(() => router.replace(`?${params.toString()}`, { scroll: false }));
    };

    return (
        <div className="flex flex-wrap items-center gap-2 mb-4">
            {activeFilters.map(([key, value]) => (
                <span
                    key={key}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg border border-gray-200"
                >
                    <span className="text-gray-500">{LABELS[key] || key}:</span>
                    <span className="font-medium">{key.includes('price') ? `${value} ₴` : value}</span>
                    <button
                        onClick={() => removeFilter(key)}
                        className="ml-0.5 p-0.5 rounded hover:bg-gray-200 transition-colors"
                    >
                        <XMarkIcon className="h-3 w-3" />
                    </button>
                </span>
            ))}
            {activeFilters.length > 1 && (
                <button
                    onClick={clearAll}
                    className="text-xs text-gray-500 hover:text-gray-900 underline transition-colors"
                >
                    Очистити все
                </button>
            )}
        </div>
    );
}
