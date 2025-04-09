import { useSearchParams } from "next/navigation";

export default function usePagination(currentPage: number, totalPages: number, limit: number) {
    const searchParams = useSearchParams();

    const createPageUrl = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", page.toString());
        params.set("limit", limit.toString());
        return `?${params.toString()}`;
    };

    const getVisiblePages = () => {
        const pages = new Set<number>([1]);
        if (totalPages > 1) pages.add(totalPages);

        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            if (i > 1 && i < totalPages) pages.add(i);
        }
        return Array.from(pages).sort((a, b) => a - b);
    };

    return {
        createPageUrl,
        getVisiblePages
    };
}
