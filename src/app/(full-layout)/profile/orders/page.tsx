'use client';

import OrderList from '@/components/modules/orders/components/OrderList';
import useCurrentOrders from '@/components/modules/orders/hooks/useCurrentOrders';

export default function HistoryPage() {
    const { data, loading, error } = useCurrentOrders();

    if (loading) return <div className="flex justify-center py-8">Завантаження...</div>;
    if (error) return <div className="text-red-600 text-center py-8">{error}</div>;
    if (!history.length) return <div className="text-gray-500 text-center py-8">Історія порожня</div>;

    return (
        <div className="lg:px-8 lg:py-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
                Історія замовлень
            </h1>
            <OrderList orders={data} />
        </div>
    );
}
