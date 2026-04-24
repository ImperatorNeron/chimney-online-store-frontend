import { useCallback, useRef } from 'react';
import { orderService } from '@/api/services/order.service';
import { ReadCustomerSchema } from '@/api/types/types';
import useInfiniteData from '../common/useInfiniteData';

export default function useCustomers(params?: {
    text?: string; field?: string; ordering?: string;
    is_registered?: string; date_from?: string; date_to?: string;
}) {
    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            orderService.getCustomers(token, limit, offset, params),
        [params],
    );

    const data = useInfiniteData<any, ReadCustomerSchema>(fetchFn, [params]);

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
