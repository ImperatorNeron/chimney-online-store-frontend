import { useCallback, useRef } from 'react';
import { productService } from "@/api/services/products.service";
import useInfiniteData from "../common/useInfiniteData";

export default function useVariationsData(
    slug: string,
    params?: { field?: string; ordering?: string },
) {
    const fetchFn = useCallback(
        (_token: string, limit: number, offset: number) =>
            productService.getProductVariations(slug, limit, offset, params),
        [slug, params],
    );

    const data = useInfiniteData(fetchFn, [params]);

    // Stable loadMore that won't cause InfiniteScrollSentinel to re-create observer
    const dataRef = useRef(data);
    dataRef.current = data;

    const loadMore = useCallback(() => {
        const d = dataRef.current;
        if (d.items.length >= d.total) return;
        d.loadMore();
    }, []);

    const hasMore = data.items.length < data.total;

    return { ...data, loadMore, hasMore };
}
