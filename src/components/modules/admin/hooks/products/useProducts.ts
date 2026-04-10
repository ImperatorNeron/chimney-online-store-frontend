import { useCallback } from 'react';
import { productService } from "@/api/services/products.service";
import { LReadFullUniqueProductSchema } from '@/api/types/types';
import useInfiniteData from "../common/useInfiniteData";

// Infer item type from the paginated response
type UniqueProductItem = NonNullable<LReadFullUniqueProductSchema>["items"] extends (infer U)[] ? U : never;

export default function useProductsData(
    params?: {
        text?: string;
        field?: string;
        category?: string;
        ordering?: string;
    },
) {
    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            productService.getUniqueProducts(token, limit, offset, params),
        [params],
    );

    const { items, total, loading, loadingMore, error, hasMore, loadMore, reload } =
        useInfiniteData<LReadFullUniqueProductSchema, UniqueProductItem>(fetchFn, [params]);

    return { items, total, loading, loadingMore, error, hasMore, loadMore, reload };
}
