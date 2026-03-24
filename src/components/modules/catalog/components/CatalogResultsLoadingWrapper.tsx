'use client';

import LoadingProductList from '@/components/shared/LoadingProductList';
import { useCatalogNavigation } from '../providers/CatalogNavigationProvider';

export default function CatalogResultsLoadingWrapper({
    children,
    totalCards,
    className,
}: {
    children: React.ReactNode;
    totalCards: number;
    className: string;
}) {
    const { isPending } = useCatalogNavigation();

    if (!isPending) return <>{children}</>;

    return (
        <div aria-busy="true" aria-live="polite">
            <LoadingProductList totalCards={totalCards} className={className} />
        </div>
    );
}

