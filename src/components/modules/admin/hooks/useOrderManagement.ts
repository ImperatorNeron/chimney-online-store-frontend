"use client";

import { useEffect, useMemo, useState } from 'react';
import { orderService } from '@/api/services/order.service';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth.store';
import useUserData from '@/components/modules/profile/hooks/useUserData';
import { OrderWithItemsResponse } from '@/api/types/types';

export default function useOrderManagement() {
    const router = useRouter();
    const { getValidToken } = useAuthStore();
    const [orders, setOrders] = useState<OrderWithItemsResponse>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user } = useUserData();
    const userValue = useMemo(() => user, [user]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const token = await getValidToken();
                if (!token) return router.push('/auth/login');

                const data = await orderService.getOrders(token);
                setOrders(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Помилка завантаження');
            } finally {
                setLoading(false);
            }
        };

        if (userValue) fetchOrders();
    }, [userValue, getValidToken, router]);

    return { orders, loading, error, userValue, setOrders };
}