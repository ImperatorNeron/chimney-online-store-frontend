import { useCallback } from 'react';
import { orderService } from '@/api/services/order.service';
import { LReadExtendedOrderSchema, ReadExtendedOrderSchema } from '@/api/types/types';
import useInfiniteData from '../common/useInfiniteData';

export default function useOrders(
    params?: {
        text?: string;
        field?: string;
        ordering?: string;
        status?: string;
        shipping_method?: string;
        payment_method?: string;
    },
) {
    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            orderService.getOrders(token, limit, offset, params),
        [params],
    );

    const { items, setItems, total, loading, loadingMore, error, hasMore, loadMore, reload } =
        useInfiniteData<LReadExtendedOrderSchema, ReadExtendedOrderSchema>(fetchFn, [params]);

    return { items, setItems, total, loading, loadingMore, error, hasMore, loadMore, reload };
}
