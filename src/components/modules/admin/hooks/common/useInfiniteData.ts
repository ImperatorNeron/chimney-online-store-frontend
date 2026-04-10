import { useState, useEffect, useCallback, useRef, useContext } from "react";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ProfileContext } from "@/provider/profile.provider";

const PAGE_SIZE = 30;

interface PaginatedResponse<T> {
    items: T[];
    pagination: { offset: number; limit: number; total: number };
}

export default function useInfiniteData<T, TItem>(
    fetchFn: (token: string, limit: number, offset: number) => Promise<PaginatedResponse<TItem>>,
    deps: any[] = [],
) {
    const { getValidToken } = useAuthStore();
    const router = useRouter();
    const userValue = useContext(ProfileContext);
    const [items, setItems] = useState<TItem[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const offsetRef = useRef(0);

    const load = useCallback(async (offset: number, append: boolean) => {
        try {
            if (append) setLoadingMore(true); else setLoading(true);
            const token = await getValidToken();
            if (!token) { router.push("/auth/login"); return; }

            const res = await fetchFn(token, PAGE_SIZE, offset);
            setItems(prev => append ? [...prev, ...res.items] : res.items);
            setTotal(res.pagination.total);
            offsetRef.current = offset + res.items.length;
            setError(null);
        } catch (err) {
            console.error(err);
            setError("Не вдалося завантажити дані");
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchFn, getValidToken, router]);

    useEffect(() => {
        if (userValue) {
            offsetRef.current = 0;
            load(0, false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userValue, ...deps]);

    const loadMore = useCallback(() => {
        if (loadingMore || loading || offsetRef.current >= total) return;
        load(offsetRef.current, true);
    }, [loadingMore, loading, total, load]);

    const hasMore = offsetRef.current < total;

    const reload = useCallback(() => {
        offsetRef.current = 0;
        load(0, false);
    }, [load]);

    return { items, setItems, total, loading, loadingMore, error, hasMore, loadMore, reload };
}
