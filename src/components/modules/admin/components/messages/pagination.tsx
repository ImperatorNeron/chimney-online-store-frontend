'use client'

export default function PaginationControls({
    currentOffset,
    currentLimit,
    total,
    onPrev,
    onNext,
    isLoading
}: {
    currentOffset: number;
    currentLimit: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    isLoading: boolean;
}) {
    const currentPage = Math.floor(currentOffset / currentLimit) + 1;
    const totalPages = Math.ceil(total / currentLimit);

    return (
        <div className="flex items-center justify-between px-4 mt-6 mb-3 sm:px-6">
            <div className="flex flex-col flex-col-reverse gap-2 sm:flex-row flex-1 items-center sm:items-center justify-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Показано <span className="font-medium">{currentOffset + 1}</span> -{' '}
                        <span className="font-medium">
                            {Math.min(currentOffset + currentLimit, total)}
                        </span> з{' '}
                        <span className="font-medium">{total}</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                        <button
                            onClick={onPrev}
                            disabled={currentOffset === 0 || isLoading}
                            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Попередня</span>
                            &larr;
                        </button>
                        <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300">
                            Сторінка {currentPage} з {totalPages}
                        </span>
                        <button
                            onClick={onNext}
                            disabled={currentOffset + currentLimit >= total || isLoading}
                            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                        >
                            <span className="sr-only">Наступна</span>
                            &rarr;
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    );
}