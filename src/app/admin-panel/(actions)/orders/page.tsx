"use client";

import Link from 'next/link';
import { PencilIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { STATUS_OPTIONS, SHIPPING_METHODS, PAYMENT_METHODS, styles } from '@/constants/orders';
import useOrders from '@/components/modules/admin/hooks/orders/useOrders';
import { useOrderActions } from '@/components/modules/admin/hooks/orders/useOrderActions';
import OrderHeader from '@/components/modules/admin/components/orders/orderHeader';
import OrderMetaInfo from '@/components/modules/admin/components/orders/orderMetaInfo';
import EditControls from '@/components/modules/admin/components/orders/editControls';
import ProductCharacteristics from '@/components/modules/admin/components/orders/productCharacteristics';
import BackToPageButton from '@/components/ui/BackToPageButton';


export default function OrdersPage() {
    const { orders, loading, error, setOrders } = useOrders();
    const {
        editingOrderId,
        expandedOrderId,
        waybillNumber,
        selectedStatus,
        discount,
        setWaybillNumber,
        setSelectedStatus,
        setDiscount,
        handleEdit,
        handleSave,
        handleCancel,
        toggleExpand
    } = useOrderActions(setOrders);

    if (loading) return <div className="p-4 text-lg text-gray-700">Завантаження...</div>;
    if (error) return <div className="p-4 text-lg text-red-600">{error}</div>;

    return (
        <div className="min-h-screen md:p-6 pt-8 max-w-5xl mx-auto">
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
            <h1 className="text-xl sm:text-4xl font-bold text-center text-gray-900 mb-6">
                Замовлення клієнтів
            </h1>

            <ul className="space-y-4">
                {(orders ?? []).map(order => {
                    const isExpanded = expandedOrderId === order.id;
                    const isEditing = editingOrderId === order.id;

                    return (
                        <li key={order.id} className="bg-white rounded-xl border border-gray-400 overflow-hidden">
                            <div
                                className="flex items-center justify-between p-3 md:p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => toggleExpand(order.id)}
                            >
                                <div className="flex flex-col">
                                    <OrderHeader order={order} />
                                    <OrderMetaInfo order={order} />
                                </div>
                                <ChevronDownIcon
                                    className={`w-6 h-6 text-gray-600 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                                />
                            </div>

                            <div className={`px-4 md:px-6 transition-all ${isExpanded ? 'pb-6' : 'pb-0'}`}>
                                <div className={`overflow-y-auto transition-all duration-500 ${isExpanded ? 'max-h-auto' : 'max-h-0'}`}>
                                    <div className="pt-4 border-t border-gray-100">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Спосіб доставки
                                                </label>
                                                <span className={`${styles.methodBadge}`}>
                                                    {SHIPPING_METHODS[order.shipping_method as keyof typeof SHIPPING_METHODS]}
                                                </span>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Спосіб оплати
                                                </label>
                                                <span className={`${styles.methodBadge}`}>
                                                    {PAYMENT_METHODS[order.payment_method as keyof typeof PAYMENT_METHODS]}
                                                </span>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Статус замовлення
                                                </label>
                                                {isEditing ? (
                                                    <select
                                                        value={selectedStatus}
                                                        onChange={e => setSelectedStatus(e.target.value)}
                                                        className={`${styles.formInput}`}
                                                    >
                                                        {STATUS_OPTIONS.map(opt => (
                                                            <option key={opt.value} value={opt.value}>
                                                                {opt.label}
                                                            </option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <span className={`${styles.methodBadge}`}>
                                                        {STATUS_OPTIONS.find(s => s.value === order.status)?.label}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Номер накладної
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={waybillNumber}
                                                        onChange={e => setWaybillNumber(e.target.value.slice(0, 20))}
                                                        className={`${styles.formInput}`}
                                                        placeholder="Напишіть номер накладної"
                                                        maxLength={20}
                                                    />
                                                ) : (
                                                    <span className={`${styles.methodBadge}`}>
                                                        № {order.waybill_number || 'Не вказано'}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Знижка в гривнях або в %
                                                </label>
                                                {isEditing ? (
                                                    <input
                                                        type="text"
                                                        value={discount}
                                                        onChange={e => setDiscount(e.target.value)}
                                                        className={`${styles.formInput}`}
                                                        placeholder="Напишіть знижку в гривнях"
                                                    />
                                                ) : (
                                                    <span className={`${styles.methodBadge}`}>
                                                        {order.price_discount || 0} грн
                                                    </span>
                                                )}
                                            </div>
                                        </div>

                                        {!isEditing && (
                                            <button
                                                onClick={() => handleEdit(order)}
                                                className={`${styles.editButton}`}
                                            >
                                                <PencilIcon className="w-5 h-5 mr-2" />
                                                Натисніть щоб змінити статус, номер накладної або встановити знижку
                                            </button>
                                        )}

                                        <EditControls
                                            isEditing={isEditing}
                                            onSave={() => handleSave(order.id, order.total_price)}
                                            onCancel={handleCancel}
                                        />
                                        <div className="flex justify-between border-t border-gray-100 pt-4 mb-8">
                                            <div className="flex flex-col text text-gray-700">
                                                <span className="mr-2">Загальна сума зі знижкою:</span>
                                                <span className="font-bold text-gray-900">{(order.total_price - order.price_discount).toFixed(2)} грн</span>
                                            </div>
                                            <div className="flex flex-col text-gray-700">
                                                <span className="mr-2">Загальна сума:</span>
                                                <span className="font-bold text-gray-900">{(order.total_price).toFixed(2)} грн</span>
                                            </div>
                                        </div>
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-gray-900 mb-3">
                                                Товари у замовленні
                                            </h3>
                                            <ul className="space-y-3 h-full">
                                                {order.items.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="border border-gray-200 p-4 rounded-md bg-white shadow-sm"
                                                    >
                                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                                                            <div>
                                                                <Link
                                                                    href={`/products/${item.product.slug}/${item.product.id}`}
                                                                    className="text-gray-900 hover:text-blue-600 font-medium text-base underline"
                                                                >
                                                                    {item.product.name}
                                                                </Link>
                                                                <ProductCharacteristics product={item.product} />
                                                            </div>
                                                            <div className="text-sm text-gray-800 sm:text-right">
                                                                <p>
                                                                    {item.quantity} × {item.product.discount_price} грн
                                                                </p>
                                                                <p className="font-semibold text-gray-900">
                                                                    {(item.price_at_order).toFixed(2)} грн
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    );
                })}
            </ul>

            {(!orders || orders.length === 0) && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">Немає історії замовлень</p>
                </div>
            )}
        </div>
    );
}