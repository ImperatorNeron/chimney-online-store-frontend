'use client';

import { useCallback, useRef } from 'react';
import { likeService } from '@/api/services/likes.service';
import { ReadPreviewProductSchema } from '@/api/types/types';
import useInfiniteData from '@/components/modules/admin/hooks/common/useInfiniteData';

export default function useFavourites() {
    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            likeService.getLikedProducts(token, limit, offset),
        [],
    );

    const data = useInfiniteData<any, ReadPreviewProductSchema>(fetchFn, []);

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
        reload: data.reload,
    };
}
