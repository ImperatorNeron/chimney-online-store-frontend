'use client';

import { useCallback, useRef } from 'react';
import { orderService } from '@/api/services/order.service';
import { ReadExtendedOrderSchema } from '@/api/types/types';
import useInfiniteData from '@/components/modules/admin/hooks/common/useInfiniteData';


// TODO: almost same as useOrderHistory
export default function useCurrentOrders() {
    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            orderService.getUserOrders(token, limit, offset),
        [],
    );

    const data = useInfiniteData<any, ReadExtendedOrderSchema>(fetchFn, []);

    const dataRef = useRef(data);
    dataRef.current = data;

    const loadMore = useCallback(() => {
        const d = dataRef.current;
        if (d.items.length >= d.total) return;
        d.loadMore();
    }, []);

    const hasMore = data.items.length < data.total;

    return {
        items: data.items,
        total: data.total,
        loading: data.loading,
        loadingMore: data.loadingMore,
        error: data.error,
        hasMore,
        loadMore,
    };
}
