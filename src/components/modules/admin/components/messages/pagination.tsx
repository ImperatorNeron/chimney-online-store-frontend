'use client'

interface PaginationControlsProps {
    currentOffset: number;
    currentLimit: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    isLoading: boolean;
}

export default function PaginationControls({
    currentOffset,
    currentLimit,
    total,
    onPrev,
    onNext,
    isLoading
}: PaginationControlsProps) {
    if (total <= currentLimit) return null;

    return (
        <div className="flex justify-center items-center gap-4 mt-8 mb-4">
            <button
                onClick={onPrev}
                disabled={currentOffset === 0 || isLoading}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                Попередня
            </button>

            <span className="text-gray-700">
                Сторінка {Math.floor(currentOffset / currentLimit) + 1} з{' '}
                {Math.ceil(total / currentLimit)}
            </span>

            <button
                onClick={onNext}
                disabled={currentOffset + currentLimit >= total || isLoading}
                className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300"
            >
                Наступна
            </button>
        </div>
    );
}