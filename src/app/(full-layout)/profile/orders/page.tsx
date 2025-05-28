'use client';

import ProfileLoading from '@/components/layout/loaders/ProfileLoader';
import OrderList from '@/components/modules/orders/components/OrderList';
import useCurrentOrders from '@/components/modules/orders/hooks/useCurrentOrders';
import EmptyState from '@/components/shared/EmptyState';
import { ShoppingBagIcon } from '@heroicons/react/24/outline';

export default function HistoryPage() {
    const { data, loading, error } = useCurrentOrders();

    const handleExploreProducts = () => {
        // Навігація до каталогу продуктів
        console.log('Navigate to product catalog');
    };

    if (loading) return <ProfileLoading />;
    if (error) return <div className="text-red-600 text-center py-8">{error}</div>;
    if (!history.length) return <div className="text-gray-500 text-center py-8">Історія порожня</div>;

    return (
        <div className="lg:px-8 lg:py-4 min-h-[550px] flex flex-col">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
                Поточні замовленя
            </h1>
            {Array.isArray(data) && data?.length ? (
                <OrderList orders={data} />
            ) : (
                <EmptyState
                    title="У вас немає замовлень"
                    icon={ShoppingBagIcon}
                    description="Тому час це виправити. Переходьте та купуйте найкраще!"
                    buttonText="До покупок"
                    onAction={handleExploreProducts}
                />
            )}
        </div>
    );
}
