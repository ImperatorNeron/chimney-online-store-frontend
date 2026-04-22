'use client';

import ProfileLoading from '@/components/layout/loaders/ProfileLoader';
import OrderList from '@/components/modules/orders/components/OrderList';
import useCurrentOrders from '@/components/modules/orders/hooks/useCurrentOrders';
import EmptyState from '@/components/shared/EmptyState';
import InfiniteScrollSentinel from '@/components/modules/admin/components/InfiniteScrollSentinel';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';


export default function OrdersPage() {
    const { items, total, loading, loadingMore, error, hasMore, loadMore } = useCurrentOrders();
    const router = useRouter();

    useEffect(() => {
        document.title = "Поточні замовлення";
    }, []);

    if (loading) return <ProfileLoading />;
    if (error) return <div className="text-red-600 text-center py-8">{error}</div>;

    return (
        <div className="lg:px-8 lg:py-4 min-h-[550px] flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
                Поточні замовлення
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
                    title="У вас немає замовлень"
                    icon={ShoppingBagIcon}
                    description="Тому час це виправити. Переходьте та купуйте найкраще!"
                    buttonText="До покупок"
                    onAction={() => router.push("/")}
                />
            )}
        </div>
    );
}
