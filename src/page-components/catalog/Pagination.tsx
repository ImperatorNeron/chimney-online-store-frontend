import Link from "next/link";

export default function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
    const getVisiblePages = () => {
        const pages = new Set<number>([1]);
        if (totalPages > 1) pages.add(totalPages);

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) pages.add(i);
        }
        return Array.from(pages).sort((a, b) => a - b);
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex justify-center items-center gap-2 mt-8 mb-4">
            <Link
                href={`?page=${currentPage - 1}`}
                className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
                &lt;
            </Link>

            {visiblePages.map((page, index, arr) => (
                <div key={page} className="flex items-center gap-2">
                    {index > 0 && page - arr[index - 1] > 1 && <span className="mx-1">...</span>}
                    <Link
                        href={`?page=${page}`}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage === page ? 'bg-gray-800 text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                    >
                        {page}
                    </Link>
                </div>
            ))}

            <Link
                href={`?page=${currentPage + 1}`}
                className={`w-8 h-8 rounded-md flex items-center justify-center ${currentPage >= totalPages ? 'bg-gray-300 cursor-not-allowed pointer-events-none' : 'bg-gray-100 hover:bg-gray-200'}`}
            >
                &gt;
            </Link>

        </div>
    );
};