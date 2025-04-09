"use client";

import Link from "next/link";
import usePagination from "../hooks/usePagination";

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

    return (
        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
            <Link
                href={createPageUrl(currentPage - 1)}
                className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === 1 ? 'hidden cursor-not-allowed pointer-events-none' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
                &lt;
            </Link>

            {visiblePages.map((page, index, arr) => (
                <div key={page} className="flex items-center gap-2">
                    {index > 0 && page - arr[index - 1] > 1 && <span className="mx-1">...</span>}
                    <Link
                        href={createPageUrl(page)}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        {page}
                    </Link>
                </div>
            ))}

            <Link
                href={createPageUrl(currentPage + 1)}
                className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage >= totalPages ? 'hidden bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
                &gt;
            </Link>
        </div>
    );
};
