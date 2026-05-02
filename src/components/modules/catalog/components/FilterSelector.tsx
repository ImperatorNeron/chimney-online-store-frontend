'use client'
import { useFilterSelect } from "../hooks/useFilterSelect";
import { useCatalogNavigation } from "../providers/CatalogNavigationProvider";

export default function FilterSelect({ label, name, options }: { label: string, name: string, options: (string | null)[] }) {
    const { currentValue, sortedOptions, handleChipToggle } = useFilterSelect(name, options);
    const { isPending } = useCatalogNavigation();

    if (sortedOptions.length === 0) return null;

    return (
        <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-900 ml-0.5">{label}</span>
            <div className={`flex flex-wrap gap-1 ${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
                {sortedOptions.map(option => (
                    <button
                        key={option}
                        onClick={() => handleChipToggle(option)}
                        disabled={isPending}
                        className={`px-2 py-1 text-xs rounded-md border transition-colors duration-150
                            ${currentValue === option
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-900'
                            }`}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}
