"use client";

import { useEffect, useRef } from "react";

export default function InfiniteScrollSentinel({
    hasMore,
    loading,
    onLoadMore,
    total,
    loaded,
}: {
    hasMore: boolean;
    loading: boolean;
    onLoadMore: () => void;
    total: number;
    loaded: number;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || !hasMore || loading) return;

        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) onLoadMore(); },
            { rootMargin: "200px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [hasMore, loading, onLoadMore]);

    return (
        <div className="flex flex-col items-center gap-2 py-4">
            <div ref={ref} />
            {loading && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                    <div className="h-4 w-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
                    Завантаження...
                </div>
            )}
            {!loading && !hasMore && total > 0 && (
                <p className="text-xs text-gray-400">
                    Показано {loaded} з {total}
                </p>
            )}
        </div>
    );
}
