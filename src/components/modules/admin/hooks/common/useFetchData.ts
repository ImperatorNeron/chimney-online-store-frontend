/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext } from 'react';
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { ProfileContext } from '@/provider/profile.provider';

type FetchFunction<T> = (token: string) => Promise<T>;

export default function useFetchData<T>(
    fetchFunction: FetchFunction<T>,
    dependencies: any[] = []
) {
    const { getValidToken } = useAuthStore();
    const router = useRouter();
    const [data, setData] = useState<T>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userValue = useContext(ProfileContext);

    const loadData = async () => {
        try {
            setLoading(true);
            const token = await getValidToken();

            if (!token) {
                router.push('/auth/login');
                return;
            }

            const response = await fetchFunction(token);
            setData(response);
            setError(null);
        } catch (err) {
            console.error('Помилка завантаження:', err);
            setError('Не вдалося завантажити дані');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userValue) {
            loadData();
        }
    }, [userValue, ...dependencies]);

    return { data, loading, error, reload: loadData, setData };
}