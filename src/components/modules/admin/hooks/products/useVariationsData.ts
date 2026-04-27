import { useCallback, useRef } from 'react';
import { productService } from "@/api/services/products.service";
import useInfiniteData from "../common/useInfiniteData";

export default function useVariationsData(
    slug: string,
    params?: { field?: string; ordering?: string; diameter?: string; length?: string; thickness?: string; angle?: string; metal_type?: string },
) {
    const paramsRef = useRef(params);
    paramsRef.current = params;

    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            productService.getProductVariations(slug, token, limit, offset, paramsRef.current),
        [slug],
    );

    const sortKey = `${params?.field}-${params?.ordering}`;
    const filterKey = [params?.diameter, params?.length, params?.thickness, params?.angle, params?.metal_type].join('|');

    const data = useInfiniteData(fetchFn, [sortKey, filterKey]);

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
