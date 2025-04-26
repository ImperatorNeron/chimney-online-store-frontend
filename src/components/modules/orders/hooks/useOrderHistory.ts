'use client';

import { useContext, useEffect, useState } from 'react';
import { orderService } from '@/api/services/order.service';
import { ProfileContext } from '@/provider/profile.provider';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

export default function useOrderHistory() {
    // TODO: use mutual hook for this and for currentOrders
    const router = useRouter();
    const user = useContext(ProfileContext);
    const [data, setData] = useState<ReadExtendedOrderSchema[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { getValidToken } = useAuthStore.getState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await getValidToken();
                if (!token) {
                    router.push('/auth/login');
                    return;
                }
                const data = await orderService.getUserHistory(token);
                setData(data);
            } catch {
                setError('Не вдалося завантажити історію');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchData();
        }
    }, [user, getValidToken]);

    return { data, loading, error };
};