'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useAuthStore } from '@/store/auth.store';

export default function useUserData(redirectIfUnauthorized: boolean = true) {
    const router = useRouter();
    const { isInitialized, isTokenValid, checkAuthentication } = useAuthStore();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const hasFetched = useRef(false);

    useEffect(() => {
        if (!isInitialized || hasFetched.current) return;
        hasFetched.current = true;

        const fetchUserData = async () => {
            try {
                let tokenToUse = useAuthStore.getState().accessToken;

                if (tokenToUse && !isTokenValid()) {
                    try {
                        const isAuth = await checkAuthentication();
                        tokenToUse = isAuth ? useAuthStore.getState().accessToken : null;

                        if (!isAuth) {
                            if (redirectIfUnauthorized) router.push('/auth/login');
                            return;
                        }
                    } catch {
                        if (redirectIfUnauthorized) router.push('/auth/login');
                        return;
                    }
                }

                if (!tokenToUse) {
                    if (redirectIfUnauthorized) router.push('/auth/login');
                    return;
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                    headers: {
                        'Authorization': `Bearer ${tokenToUse}`,
                    },
                });

                if (!response.ok) throw new Error('Не вдалося отримати дані');
                setUser(await response.json());

            } catch {
                setError('Помилка завантаження');
                if (redirectIfUnauthorized) router.push('/auth/login');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [isInitialized, isTokenValid, checkAuthentication, router, redirectIfUnauthorized]);

    return { user, loading, error };
}

export function useUserDataWithRedirect() {
    return useUserData(true);
}

export function useUserDataWithoutRedirect() {
    return useUserData(false);
}