'use client';

import { useContext, useEffect, useState } from 'react';
import { orderService } from '@/api/services/order.service';
import { ProfileContext } from '@/provider/profile.provider';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';
import { ReadExtendedOrderDataSchema } from '@/api/types/types';

export default function useCurrentOrders() {
    const router = useRouter();
    const user = useContext(ProfileContext);
    const [data, setData] = useState<ReadExtendedOrderDataSchema>([]);
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
                const data = await orderService.getUserOrders(token);
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
    }, [user, getValidToken, router]);

    return { data, loading, error };
};