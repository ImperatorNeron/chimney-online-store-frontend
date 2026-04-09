"use client";

// Deprecated: kept for reference. Use `page.tsx` for the new Orders table UI.

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
import MessageSkeleton from '@/components/layout/loaders/MessageSkeleton';
import usePagination from '@/components/modules/admin/hooks/products/usePagination';
import PaginationControls from '@/components/modules/admin/components/messages/pagination';
import { useEffect } from 'react';

export default function OrdersPage() {
  const { currentOffset, currentLimit, handleNextPage, handlePrevPage } = usePagination();
  const { orders, loading, setOrders } = useOrders(currentLimit, currentOffset);
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

  useEffect(() => {
    document.title = "Замовлення користувачів";
  }, []);

  if (loading) return <MessageSkeleton />;

  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-8 py-16 max-w-6xl mx-auto">
      <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
      <h1 className="text-2xl sm:text-4xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        Замовлення клієнтів
      </h1>

      {orders?.pagination && (
        <PaginationControls
          currentOffset={currentOffset}
          currentLimit={currentLimit}
          total={orders.pagination.total}
          onPrev={handlePrevPage}
          onNext={handleNextPage}
          isLoading={loading}
        />)}
      <ul className="space-y-6">
        {(orders?.items ?? []).map(order => {
          const isExpanded = expandedOrderId === order.id;
          const isEditing = editingOrderId === order.id;

          return (
            <li
              key={order.id}
              className="bg-white rounded-2xl border border-gray-300 shadow-md overflow-hidden
                         transition-shadow hover:shadow-lg"
            >
              <div
                className="flex items-center justify-between p-4 md:p-6 cursor-pointer hover:bg-gray-50
                           transition-colors select-none"
                onClick={() => toggleExpand(order.id)}
                aria-expanded={isExpanded}
              >
                <div className="flex flex-col space-y-1 md:space-y-2">
                  <OrderHeader order={order} />
                  <OrderMetaInfo order={order} />
                </div>
                <ChevronDownIcon
                  className={`w-6 h-6 text-gray-500 transition-transform duration-300 ease-in-out ${isExpanded ? 'rotate-180' : ''
                    }`}
                />
              </div>

              <div
                className={`px-5 md:px-8 transition-all duration-500 ease-in-out ${isExpanded ? 'pb-8 max-h-[2000px]' : 'pb-0 max-h-0'
                  } overflow-hidden`}
              >
                <div className="pt-5 border-t border-gray-200">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Спосіб доставки
                      </label>
                      <span className={`${styles.methodBadge} bg-blue-100 text-blue-800`}>
                        {SHIPPING_METHODS[order.shipping_method as keyof typeof SHIPPING_METHODS]}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Спосіб оплати
                      </label>
                      <span className={`${styles.methodBadge} bg-green-100 text-green-800`}>
                        {PAYMENT_METHODS[order.payment_method as keyof typeof PAYMENT_METHODS]}
                      </span>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Статус замовлення
                      </label>
                      {isEditing ? (
                        <select
                          value={selectedStatus}
                          onChange={e => setSelectedStatus(e.target.value)}
                          className={`${styles.formInput} bg-white border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                        >
                          {STATUS_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span
                          className={`${styles.methodBadge} ${order.status === 'delivered' ? 'bg-green-100 text-green-700' :
                            order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-700'
                            }`}
                        >
                          {STATUS_OPTIONS.find(s => s.value === order.status)?.label}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Номер накладної
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={waybillNumber}
                          onChange={e => setWaybillNumber(e.target.value.slice(0, 20))}
                          className={`${styles.formInput} bg-white border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                          placeholder="Напишіть номер накладної"
                          maxLength={20}
                        />
                      ) : (
                        <span className={`${styles.methodBadge} bg-gray-50 text-gray-700`}>
                          № {order.waybill_number || 'Не вказано'}
                        </span>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Знижка в гривнях або в %
                      </label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={discount}
                          onChange={e => setDiscount(e.target.value)}
                          className={`${styles.formInput} bg-white border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-200`}
                          placeholder="Напишіть знижку в гривнях"
                        />
                      ) : (
                        <span className={`${styles.methodBadge} bg-gray-50 text-gray-700`}>
                          {order.price_discount || 0} грн
                        </span>
                      )}
                    </div>
                  </div>

                  {!isEditing && (
                    <button
                      onClick={() => handleEdit(order)}
                      className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium
                                 text-blue-700 bg-blue-100 rounded-lg hover:bg-blue-200
                                 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
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

                  <div className="flex flex-col sm:flex-row justify-between border-t border-gray-200 pt-6 mb-8 gap-6">
                    <div className="flex flex-col text-gray-700">
                      <span className="text-sm">Загальна сума зі знижкою:</span>
                      <span className="font-bold text-lg text-gray-900">
                        {(order.total_price - order.price_discount).toFixed(2)} грн
                      </span>
                    </div>
                    <div className="flex flex-col text-gray-700">
                      <span className="text-sm">Загальна сума:</span>
                      <span className="font-bold text-lg text-gray-900">
                        {order.total_price.toFixed(2)} грн
                      </span>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Товари у замовленні</h3>
                    <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="border border-gray-300 p-4 rounded-lg bg-white shadow-sm hover:shadow-md
                                     transition-shadow duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <div>
                              <Link
                                href={`/products/${item.product.slug}/${item.product.id}`}
                                className="text-blue-700 hover:text-blue-900 font-semibold text-lg underline"
                              >
                                {item.product.name}
                              </Link>
                              <ProductCharacteristics product={item.product} />
                            </div>
                            <div className="text-gray-800 sm:text-right">
                              <p className="text-sm">{item.quantity} × {item.product.discount_price} грн</p>
                              <p className="font-semibold text-lg text-gray-900">
                                {item.price_at_order.toFixed(2)} грн
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

    </div>
  );
}
