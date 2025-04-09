"use client";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import useLimitSelector from "../hooks/useLimitSelector";


export default function LimitSelector() {
    const { currentLimit, handleChange } = useLimitSelector();

    return (
        <div className="flex flex-col space-y-2">
            <label htmlFor="limit" className="text-sm font-medium text-gray-700 ml-1">
                Показати:
            </label>
            <div className="relative w-20">
                <select
                    id="limit"
                    value={currentLimit}
                    onChange={handleChange}
                    className="peer w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-700 shadow-sm transition-all"
                >
                    <option value="12">12</option>
                    <option value="24">24</option>
                    <option value="36">36</option>
                </select>
                <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
        </div>
    );
}
