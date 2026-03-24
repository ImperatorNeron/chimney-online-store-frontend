"use client";

import usePagination from "../hooks/usePagination";
import { useRouter } from "next/navigation";
import { useCatalogNavigation } from "../providers/CatalogNavigationProvider";

export default function Pagination({
    currentPage,
    totalPages,
    limit
}: {
    currentPage: number;
    totalPages: number;
    limit: number;
}) {
    const { createPageUrl, getVisiblePages } = usePagination(currentPage, totalPages, limit);
    const visiblePages = getVisiblePages();
    const router = useRouter();
    const { navigate, isPending } = useCatalogNavigation();

    const goTo = (page: number) => {
        const href = createPageUrl(page);
        navigate(() => router.push(href, { scroll: false }));
    };

    return (
        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
            <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={isPending}
                className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === 1 ? 'hidden cursor-not-allowed pointer-events-none' : 'bg-gray-100 hover:bg-gray-200'} ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
                aria-label="Попередня сторінка"
            >
                &lt;
            </button>

            {visiblePages.map((page, index, arr) => (
                <div key={page} className="flex items-center gap-2">
                    {index > 0 && page - arr[index - 1] > 1 && <span className="mx-1">...</span>}
                    <button
                        type="button"
                        onClick={() => goTo(page)}
                        disabled={isPending}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'} ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                        aria-label={`Сторінка ${page}`}
                    >
                        {page}
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={isPending}
                className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage >= totalPages ? 'hidden bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-gray-100 hover:bg-gray-200'} ${isPending ? 'opacity-60 cursor-not-allowed' : ''}`}
                aria-label="Наступна сторінка"
            >
                &gt;
            </button>
        </div>
    );
};
