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
import MessageSkeleton from '@/components/layout/loaders/MessageSkeleton';
import usePagination from '@/components/modules/admin/hooks/products/usePagination';
import PaginationControls from '@/components/modules/admin/components/messages/pagination';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/navigation";

import type { ReadExtendedOrderSchema, UpdateOrderSchema } from "@/api/types/types";
import { orderService } from "@/api/services/order.service";
import { NotificationService } from "@/api/services/notification.service";
import { useAuthStore } from "@/store/auth.store";
import useDebounce from "@/hooks/forms/useDebounce";
import type { OrderSortField, SortOrdering } from "@/constants/orderFields";

import Filters from "./components/Filters";
import OrdersTableWrapper from "./components/OrdersTableWrapper";
import OrderDetails, { type OrderEditDraft } from "./components/OrderDetails";
import useOrderColumns from "./hooks/useOrderColumns";

function LegacyOrdersPage() {
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

// New Orders table UI (search/sort/edit). LegacyOrdersPage is kept above for reference.

function normalizeDiscountInput(input: string) {
  let value = input.replace(/[^0-9.,%\\s]/g, "");
  value = value.replace(",", ".");
  if (value.includes("%")) {
    value = value.replace(/%/g, "") + "%";
  }
  value = value.replace(/^0+([1-9])/, "$1");
  return value.trim();
}

function calcPriceDiscount(discountInput: string, total: number) {
  const normalized = normalizeDiscountInput(discountInput);
  if (!normalized) return 0;

  if (normalized.includes("%")) {
    const percent = parseFloat(normalized.replace("%", ""));
    if (Number.isNaN(percent)) return 0;
    return Math.round((percent / 100) * total * 100) / 100;
  }

  const value = parseFloat(normalized);
  if (Number.isNaN(value)) return 0;
  return Math.round(value * 100) / 100;
}

function updateOrderInState(
  setOrders: any,
  orderId: number,
  patch: Partial<ReadExtendedOrderSchema>,
) {
  setOrders((prev: any) => {
    if (!prev || !("items" in prev) || !Array.isArray(prev.items)) return prev;
    return {
      ...prev,
      items: prev.items.map((o: ReadExtendedOrderSchema) => (o.id === orderId ? { ...o, ...patch } : o)),
    };
  });
}

export default function OrdersPage() {
  const router = useRouter();
  const { getValidToken } = useAuthStore();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<OrderSortField>("created_at");
  const [sortOrdering, setSortOrdering] = useState<SortOrdering>("desc");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterShipping, setFilterShipping] = useState("");
  const [filterPayment, setFilterPayment] = useState("");

  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);
  const [editingOrderId, setEditingOrderId] = useState<number | null>(null);
  const [draft, setDraft] = useState<OrderEditDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [updatingIds, setUpdatingIds] = useState<Set<number>>(new Set());

  const debouncedSearch = useDebounce(search, 400);
  const { currentOffset, currentLimit, handleNextPage, handlePrevPage, setCurrentOffset } = usePagination();

  const handleSort = (field: OrderSortField) => {
    setCurrentOffset(0);
    if (field === sortField) {
      setSortOrdering((prev) => (prev === "asc" ? "desc" : "asc"));
      return;
    }
    setSortField(field);
    setSortOrdering(field === "created_at" ? "desc" : "asc");
  };

  const params = useMemo(
    () => ({
      text: debouncedSearch || undefined,
      field: sortField,
      ordering: sortOrdering,
      status: filterStatus || undefined,
      shipping_method: filterShipping || undefined,
      payment_method: filterPayment || undefined,
    }),
    [debouncedSearch, sortField, sortOrdering, filterStatus, filterShipping, filterPayment],
  );

  const { orders, loading, reload, setOrders } = useOrders(currentLimit, currentOffset, params);

  useEffect(() => {
    document.title = "Замовлення клієнтів";
  }, []);

  const isUpdating = (id: number) => updatingIds.has(id);

  const toggleExpand = (id: number) => {
    setExpandedOrderId((prev) => {
      const next = prev === id ? null : id;
      if (prev === id) {
        setEditingOrderId(null);
        setDraft(null);
      }
      return next;
    });
  };

  const startEdit = (order: ReadExtendedOrderSchema) => {
    setExpandedOrderId(order.id);
    setEditingOrderId(order.id);
    setDraft({
      first_name: order.first_name || "",
      last_name: order.last_name || "",
      patronymic: order.patronymic || "",
      email: order.email || "",
      phone_number: order.phone_number || "",
      address: order.address || "",
    });
  };

  const cancelEdit = () => {
    setEditingOrderId(null);
    setDraft(null);
  };

  const handleDraftChange = (patch: Partial<OrderEditDraft>) => {
    setDraft((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      if (patch.discount_input !== undefined) next.discount_input = normalizeDiscountInput(patch.discount_input);
      if (patch.phone_number !== undefined) next.phone_number = patch.phone_number.replace(/[^\d+]/g, "").slice(0, 13);
      if (patch.waybill_number !== undefined) next.waybill_number = patch.waybill_number.trim().slice(0, 30);
      if (patch.first_name !== undefined) next.first_name = patch.first_name.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\- ]/g, "").slice(0, 50);
      if (patch.last_name !== undefined) next.last_name = patch.last_name.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\- ]/g, "").slice(0, 50);
      if (patch.patronymic !== undefined) next.patronymic = patch.patronymic.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄґҐʼ'\- ]/g, "").slice(0, 50);
      if (patch.email !== undefined) next.email = patch.email.slice(0, 320);
      if (patch.address !== undefined) next.address = patch.address.slice(0, 200);
      return next;
    });
  };

  const saveEdit = async () => {
    if (!draft || editingOrderId == null) return;
    const order = orders?.items?.find((o) => o.id === editingOrderId);
    if (!order) return;

    if (!draft.first_name.trim() || !draft.last_name.trim() || !draft.phone_number.trim() || !draft.address.trim()) {
      NotificationService.error("Заповніть обовʼязкові поля: імʼя, прізвище, телефон, адреса");
      return;
    }
    if (draft.phone_number.replace(/\D/g, "").length < 10) {
      NotificationService.error("Номер телефону має містити щонайменше 10 цифр");
      return;
    }
    if (draft.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email)) {
      NotificationService.error("Невірний формат електронної пошти");
      return;
    }

    try {
      setSaving(true);
      const token = await getValidToken();
      if (!token) return router.push("/auth/login");

      const payload: Partial<UpdateOrderSchema> = {
        first_name: draft.first_name,
        last_name: draft.last_name,
        patronymic: draft.patronymic || undefined,
        email: draft.email || undefined,
        phone_number: draft.phone_number,
        address: draft.address,
      };

      await orderService.updateOrderInfo(token, payload as UpdateOrderSchema, editingOrderId);
      updateOrderInState(setOrders, editingOrderId, payload);

      NotificationService.success("Дані клієнта оновлено");
      setEditingOrderId(null);
      setDraft(null);
    } catch (err) {
      console.error(err);
      NotificationService.error(err instanceof Error ? err.message : "Не вдалося оновити");
    } finally {
      setSaving(false);
    }
  };

  const quickUpdate = async (id: number, patch: Partial<UpdateOrderSchema>) => {
    if (isUpdating(id)) return;

    let processedPatch = { ...patch };

    if (typeof processedPatch.price_discount === 'string') {
      const order = orders?.items?.find(o => o.id === id);
      const total = order ? Number(order.total_price) : 0;
      const discount = calcPriceDiscount(processedPatch.price_discount, total);
      if (discount < 0) {
        NotificationService.error("Знижка не може бути відʼємною");
        return;
      }
      if (total > 0 && discount > total) {
        NotificationService.error("Знижка не може перевищувати суму замовлення");
        return;
      }
      processedPatch.price_discount = discount;
    }

    if (processedPatch.waybill_number !== undefined) {
      const trimmed = String(processedPatch.waybill_number).trim();
      if (trimmed && !/^\d+$/.test(trimmed)) {
        NotificationService.error("Номер накладної має містити тільки цифри");
        return;
      }
      processedPatch.waybill_number = trimmed || null;
    }

    try {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.add(id);
        return next;
      });
      const token = await getValidToken();
      if (!token) return router.push("/auth/login");

      await orderService.updateOrderInfo(token, processedPatch as UpdateOrderSchema, id);
      updateOrderInState(setOrders, id, processedPatch);
    } catch (err) {
      console.error(err);
      NotificationService.error(err instanceof Error ? err.message : "Не вдалося оновити замовлення");
    } finally {
      setUpdatingIds((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }
  };

  const columns = useOrderColumns({
    sortField,
    sortOrdering,
    onSort: handleSort,
    expandedOrderId,
    onToggleExpand: toggleExpand,
    onQuickUpdate: quickUpdate,
    isUpdating,
  });

  const handleRefresh = () => {
    setSearch("");
    setSortField("created_at");
    setSortOrdering("desc");
    setFilterStatus("");
    setFilterShipping("");
    setFilterPayment("");
    setCurrentOffset(0);
    reload();
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Замовлення клієнтів</h1>
          <p className="text-gray-600">Пошук, сортування, пагінація та редагування</p>
        </div>
        <Filters
          search={search}
          setSearch={setSearch}
          loading={loading}
          onRefresh={handleRefresh}
          setOffset={setCurrentOffset}
          status={filterStatus}
          setStatus={setFilterStatus}
          shippingMethod={filterShipping}
          setShippingMethod={setFilterShipping}
          paymentMethod={filterPayment}
          setPaymentMethod={setFilterPayment}
        />
      </div>

      <OrdersTableWrapper
        loading={loading}
        orders={orders?.items}
        columns={columns}
        expandedOrderId={expandedOrderId}
        renderExpandedRow={(order) => (
          <OrderDetails
            order={order}
            isEditing={editingOrderId === order.id}
            draft={
              editingOrderId === order.id && draft
                ? draft
                : {
                  first_name: order.first_name || "",
                  last_name: order.last_name || "",
                  patronymic: order.patronymic || "",
                  email: order.email || "",
                  phone_number: order.phone_number || "",
                  address: order.address || "",
                  shipping_method: order.shipping_method || "nova_poshta",
                  payment_method: order.payment_method || "cash",
                  status: order.status || "pending",
                  is_paid: Boolean(order.is_paid),
                  waybill_number: order.waybill_number || "",
                  discount_input: String(order.price_discount ?? 0),
                }
            }
            onChange={handleDraftChange}
            onStartEdit={() => startEdit(order)}
            onCancel={cancelEdit}
            onSave={saveEdit}
            saving={saving}
          />
        )}
        paginationProps={{
          currentOffset,
          currentLimit,
          total: orders?.pagination.total ?? 0,
          onPrev: handlePrevPage,
          onNext: handleNextPage,
          isLoading: loading,
        }}
      />
    </div>
  );
}
