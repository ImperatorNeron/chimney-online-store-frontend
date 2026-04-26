'use client';

import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useParams } from 'next/navigation';

import { orderService } from '@/api/services/order.service';
import { ReadExtendedOrderSchema, ReadOrderItemSchema } from '@/api/types/types';
import useInfiniteData from '@/components/modules/admin/hooks/common/useInfiniteData';
import InfiniteScrollSentinel from '@/components/modules/admin/components/InfiniteScrollSentinel';
import LoadingState from '@/components/modules/admin/components/products/LoadingState';
import EmptyState from '@/components/modules/admin/components/products/EmptyState';
import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

function formatDate(iso: string) {
    return new Date(iso).toLocaleDateString('uk-UA', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });
}

const STATUS_LABELS: Record<string, string> = {
    pending: 'Очікує',
    processing: 'Обробляється',
    shipped: 'Відправлено',
    delivered: 'Доставлено',
    cancelled: 'Скасовано',
};

function InfoItem({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex flex-col items-center px-4 py-3">
            <span className="text-xs text-gray-400 uppercase tracking-wide">{label}</span>
            <span className="text-base font-semibold mt-0.5">{value}</span>
        </div>
    );
}

export default function CustomerDetailPage() {
    const { phone } = useParams<{ phone: string }>();
    const decodedPhone = decodeURIComponent(phone);

    const params = useMemo(() => ({ text: decodedPhone }), [decodedPhone]);

    const fetchFn = useCallback(
        (token: string, limit: number, offset: number) =>
            orderService.getOrders(token, limit, offset, params),
        [params],
    );

    const data = useInfiniteData<any, ReadExtendedOrderSchema>(fetchFn, [params]);

    const dataRef = useRef(data);
    dataRef.current = data;

    const loadMore = useCallback(() => {
        const d = dataRef.current;
        if (d.items.length >= d.total) return;
        d.loadMore();
    }, []);

    const hasMore = data.items.length < data.total;
    const orders = data.items;
    const firstOrder = orders[0];
    const totalSpent = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
    const avgCheck = orders.length ? Math.round(totalSpent / orders.length) : 0;

    useEffect(() => {
        document.title = `Клієнт ${decodedPhone}`;
    }, [decodedPhone]);

    if (data.loading && !orders.length) return <LoadingState />;

    return (
        <div className="max-w-[1920px] mx-auto px-4">
            <Link
                href="/admin-panel/customers"
                className="group inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium shadow-sm hover:bg-gray-200 hover:shadow transition-all duration-200 mb-4"
            >
                <ArrowLeftIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                Назад до бази клієнтів
            </Link>
            {firstOrder && (
                <div className="bg-white rounded-lg border border-gray-200 mb-6 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h1 className="text-2xl md:text-3xl font-bold">
                            {firstOrder.last_name} {firstOrder.first_name} {firstOrder.patronymic || ''}
                        </h1>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-6 divide-x divide-gray-200">
                        <InfoItem label="Телефон" value={decodedPhone} />
                        <InfoItem label="Email" value={firstOrder.email || '—'} />
                        <InfoItem label="Замовлень" value={data.total} />
                        <InfoItem label="Загальна сума" value={`${totalSpent.toFixed(0)} ₴`} />
                        <InfoItem label="Середній чек" value={`${avgCheck} ₴`} />
                        <InfoItem label="Останнє" value={formatDate(firstOrder.created_at)} />
                    </div>
                </div>
            )}

            <h2 className="text-xl font-bold mb-4">Замовлення</h2>

            {!orders.length ? (
                <EmptyState />
            ) : (
                <div className="space-y-3">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-lg border border-gray-200">
                            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
                                <div className="flex items-center gap-3 text-sm">
                                    <span className="font-bold text-base">#{order.id}</span>
                                    <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 text-xs font-medium">
                                        {STATUS_LABELS[order.status] || order.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-4 text-sm">
                                    <span className="text-gray-500">{formatDate(order.created_at)}</span>
                                    <span className="font-bold text-base">{order.total_price?.toFixed(0)} ₴</span>
                                </div>
                            </div>

                            <div className="px-5 py-3 space-y-2">
                                {order.items?.map((item: ReadOrderItemSchema) => (
                                    <div key={item.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 min-w-0">
                                            {item.product_slug && item.product_id ? (
                                                <Link
                                                    href={`/products/${item.product_slug}/${item.product_id}`}
                                                    className="text-gray-800 hover:underline truncate"
                                                >
                                                    {item.product_name || 'Товар'}
                                                </Link>
                                            ) : (
                                                <span className="text-gray-800 truncate">
                                                    {item.product_name || 'Товар (видалено)'}
                                                </span>
                                            )}
                                            <span className="text-gray-400 shrink-0">×{item.quantity}</span>
                                        </div>
                                        <span className="font-medium shrink-0 ml-3">{item.price_at_order?.toFixed(0)} ₴</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <InfiniteScrollSentinel
                hasMore={hasMore}
                loading={data.loadingMore}
                onLoadMore={loadMore}
                total={data.total}
                loaded={orders.length}
            />
        </div>
    );
}
