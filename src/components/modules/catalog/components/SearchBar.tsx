'use client';

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function SearchBar({ onClose }: { onClose?: () => void; }) {
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState("");
    const [isPending, startTransition] = useTransition();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isPending) return;

        if (searchTerm.trim()) {
            const encodedQuery = encodeURIComponent(searchTerm.trim());
            startTransition(() => {
                router.push(`/search?text=${encodedQuery}`);
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex-1 flex items-center"
            role="search"
        >
            <input
                type="text"
                name="q"
                placeholder="Пошук товарів..."
                className="w-full border border-gray-300 rounded-l-lg rounded-r-none px-4 py-2 focus:outline-none focus:border-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Введіть пошуковий запит"
                disabled={isPending}
            />
            <button
                type="submit"
                className="bg-gray-800 text-white px-3 lg:px-6 py-2 rounded-r-lg hover:bg-gray-700 border-t border-b border-r border-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                aria-label="Виконати пошук"
                disabled={isPending}
                onClick={onClose}
            >
                {isPending ? (
                    <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                ) : (
                    <>
                        <div className="hidden lg:block">Пошук</div>
                        <MagnifyingGlassIcon className="h-6 lg:hidden" />
                    </>
                )}
            </button>
        </form>
    );
}
