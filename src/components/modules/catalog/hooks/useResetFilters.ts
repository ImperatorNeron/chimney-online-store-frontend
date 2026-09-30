'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCatalogNavigation } from '../providers/CatalogNavigationProvider';

export default function useResetFilters(keepKeys: string[] = []) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isPending, navigate } = useCatalogNavigation();

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams);
        const keysToDelete = Array.from(params.keys()).filter(
            key => !keepKeys.includes(key)
        );

        keysToDelete.forEach(key => params.delete(key));
        navigate(() => router.replace(`?${params.toString()}`, { scroll: false }));
    };

    const hasRemovableFilters = Array.from(searchParams.keys()).some(
        key => !keepKeys.includes(key)
    );

    return { resetFilters, hasRemovableFilters, loading: isPending };
}
