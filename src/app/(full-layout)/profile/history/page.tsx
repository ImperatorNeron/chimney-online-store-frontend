'use client';

import ProfileLoading from '@/components/layout/loaders/ProfileLoader';
import OrderList from '@/components/modules/orders/components/OrderList';
import useOrderHistory from '@/components/modules/orders/hooks/useOrderHistory';
import EmptyState from '@/components/shared/EmptyState';
import InfiniteScrollSentinel from '@/components/modules/admin/components/InfiniteScrollSentinel';
import { ClockIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function HistoryPage() {
    const { items, total, loading, loadingMore, hasMore, loadMore } = useOrderHistory();
    const router = useRouter();

    useEffect(() => {
        document.title = "Історія покупок";
    }, []);

    if (loading) return <ProfileLoading />;

    return (
        <div className="lg:px-8 lg:py-4 min-h-[550px] flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
                Історія замовлень
            </h1>
            {items.length ? (
                <>
                    <OrderList orders={items} />
                    <InfiniteScrollSentinel
                        hasMore={hasMore}
                        loading={loadingMore}
                        onLoadMore={loadMore}
                        total={total}
                        loaded={items.length}
                    />
                </>
            ) : (
                <EmptyState
                    title="Історія відсутня"
                    icon={ClockIcon}
                    description="Купуйте у нашому магазині та знаходьте найкраще!"
                    buttonText="До покупок"
                    onAction={() => router.push("/")}
                />
            )}
        </div>
    );
}
