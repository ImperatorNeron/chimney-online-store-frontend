import { useCallback } from 'react';
import { messageService } from "@/api/services/message.service";
import { LReadMessageSchema, ReadMessage } from "@/api/types/types";
import useInfiniteData from "../common/useInfiniteData";

export default function useFetchMessages(
    params?: {
        text?: string;
        status?: string;
        field?: string;
        ordering?: string;
        date_from?: string;
        date_to?: string;
    },
) {
    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            messageService.getMessages(token, limit, offset, params),
        [params],
    );

    const { items, total, loading, loadingMore, error, hasMore, loadMore, reload } =
        useInfiniteData<LReadMessageSchema, ReadMessage>(fetchFn, [params]);

    return { items, total, loading, loadingMore, error, hasMore, loadMore, reload };
}
