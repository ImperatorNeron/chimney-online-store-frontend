import { useRouter, useSearchParams } from 'next/navigation';

export default function useResetFilters(keepKeys: string[] = []) {
    const router = useRouter();
    const searchParams = useSearchParams();

    const resetFilters = () => {
        const params = new URLSearchParams(searchParams);
        const keysToDelete = Array.from(params.keys()).filter(
            key => !keepKeys.includes(key)
        );

        keysToDelete.forEach(key => params.delete(key));
        router.replace(`?${params.toString()}`, { scroll: false });
    };

    const hasRemovableFilters = Array.from(searchParams.keys()).some(
        key => !keepKeys.includes(key)
    );

    return { resetFilters, hasRemovableFilters };
}