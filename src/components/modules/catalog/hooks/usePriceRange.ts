'use client'
import { debounce } from "lodash-es";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useCatalogNavigation } from "../providers/CatalogNavigationProvider";

export const usePriceRange = (minPrice: number, maxPrice: number) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [low, setLow] = useState(minPrice);
    const [high, setHigh] = useState(maxPrice);
    const [activeThumb, setActiveThumb] = useState<'low' | 'high' | null>(null);
    const { isPending, navigate } = useCatalogNavigation();

    useEffect(() => {
        const minFromUrl = parseFloat(searchParams.get('min_price') || '');
        const maxFromUrl = parseFloat(searchParams.get('max_price') || '');
        setLow(isNaN(minFromUrl) ? minPrice : Math.max(minFromUrl, minPrice));
        setHigh(isNaN(maxFromUrl) ? maxPrice : Math.min(maxFromUrl, maxPrice));
    }, [minPrice, maxPrice, searchParams]);

    const updateParams = useMemo(
        () =>
            debounce((l: number, h: number) => {
                const params = new URLSearchParams(searchParams.toString());
                params.set('min_price', l.toString());
                params.set('max_price', h.toString());
                params.delete("page");
                navigate(() => router.replace(`?${params.toString()}`, { scroll: false }));
            }, 500),
        [searchParams, router, navigate]
    );

    const handleLowChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Math.min(Number(e.target.value), high);
            setLow(val);
            updateParams(val, high);
        },
        [high, updateParams]
    );

    const handleHighChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Math.max(Number(e.target.value), low);
            setHigh(val);
            updateParams(low, val);
        },
        [low, updateParams]
    );

    const handleLowInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Math.max(minPrice, Math.min(Number(e.target.value), high));
            setLow(val);
            updateParams(val, high);
        },
        [high, minPrice, updateParams]
    );

    const handleHighInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const val = Math.min(maxPrice, Math.max(Number(e.target.value), low));
            setHigh(val);
            updateParams(low, val);
        },
        [low, maxPrice, updateParams]
    );

    const { left, width } = useMemo(() => {
        const range = maxPrice - minPrice || 1;
        return {
            left: ((low - minPrice) / range) * 100,
            width: ((high - low) / range) * 100,
        };
    }, [low, high, minPrice, maxPrice]);

    const handleThumbMouseDown = useCallback((type: 'low' | 'high') => {
        setActiveThumb(type);
    }, []);

    return {
        low,
        high,
        loading: isPending,
        activeThumb,
        handleLowChange,
        handleHighChange,
        handleLowInput,
        handleHighInput,
        handleThumbMouseDown,
        left,
        width,
    };
};
