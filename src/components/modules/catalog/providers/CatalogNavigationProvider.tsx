'use client';

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    useTransition,
} from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type CatalogNavigationContextValue = {
    isPending: boolean;
    navigate: (fn: () => void) => void;
};

const CatalogNavigationContext = createContext<CatalogNavigationContextValue | null>(null);

export function CatalogNavigationProvider({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isTransitionPending, startTransition] = useTransition();
    const [isNavigating, setIsNavigating] = useState(false);
    const resetTimerRef = useRef<number | null>(null);

    useEffect(() => {
        if (!isNavigating) return;
        setIsNavigating(false);
    }, [pathname, searchParams, isNavigating]);

    useEffect(() => {
        if (!isNavigating && resetTimerRef.current !== null) {
            window.clearTimeout(resetTimerRef.current);
            resetTimerRef.current = null;
        }
    }, [isNavigating]);

    const navigate = useCallback(
        (fn: () => void) => {
            setIsNavigating(true);
            if (resetTimerRef.current !== null) window.clearTimeout(resetTimerRef.current);
            resetTimerRef.current = window.setTimeout(() => setIsNavigating(false), 15000);
            startTransition(fn);
        },
        [startTransition],
    );

    const value = useMemo(
        () => ({
            isPending: isTransitionPending || isNavigating,
            navigate,
        }),
        [isTransitionPending, isNavigating, navigate],
    );

    return <CatalogNavigationContext.Provider value={value}>{children}</CatalogNavigationContext.Provider>;
}

export function useCatalogNavigation() {
    const ctx = useContext(CatalogNavigationContext);
    if (!ctx) {
        throw new Error('useCatalogNavigation must be used within CatalogNavigationProvider');
    }
    return ctx;
}
