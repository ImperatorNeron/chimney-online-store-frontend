'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function useResetFilters(keepKeys: string[] = []) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams);
        const keysToDelete = Array.from(params.keys()).filter(
            key => !keepKeys.includes(key)
        );

        keysToDelete.forEach(key => params.delete(key));
        setLoading(true);

        router.replace(`?${params.toString()}`, { scroll: false });

        setTimeout(() => {
            setLoading(false);
        }, 1000);
    };

    const hasRemovableFilters = Array.from(searchParams.keys()).some(
        key => !keepKeys.includes(key)
    );

    return { resetFilters, hasRemovableFilters, loading };
}
