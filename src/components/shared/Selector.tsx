'use client';

import { ChevronDownIcon } from '@heroicons/react/24/solid';

export default function Selector({
    label,
    name,
    options,
    currentValue,
    handleChange,
    width,
    emptyValue = false
}: {
    label: string;
    name: string;
    options: (string | number)[];
    currentValue: string;
    handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    width: string;
    emptyValue?: boolean;
}) {
    const totalOptions = options.length + (emptyValue ? 1 : 0);
    
    if (options.length === 0 || totalOptions < 2) {
        return null;
    }

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor={name} className="text-sm font-medium text-gray-700 ml-1">
                {label}:
            </label>
            <div className={`relative ${width}`}>
                <select
                    id={name}
                    value={currentValue}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all"
                >
                    {emptyValue && <option value="">Всі опції</option>}
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
}