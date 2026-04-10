"use client";

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from "next/navigation";

import useOrders from '@/components/modules/admin/hooks/orders/useOrders';
import type { ReadExtendedOrderSchema, UpdateOrderSchema } from "@/api/types/types";
import { orderService } from "@/api/services/order.service";
import { NotificationService } from "@/api/services/notification.service";
import { useAuthStore } from "@/store/auth.store";
import useDebounce from "@/hooks/forms/useDebounce";
import type { OrderSortField, SortOrdering } from "@/constants/orderFields";
import InfiniteScrollSentinel from "@/components/modules/admin/components/InfiniteScrollSentinel";

import Filters from "./components/Filters";
import OrdersTableWrapper from "./components/OrdersTableWrapper";
import OrderDetails, { type OrderEditDraft } from "./components/OrderDetails";
import useOrderColumns from "./hooks/useOrderColumns";

// Orders table UI with search/sort/edit and infinite scroll.

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
  setItems: React.Dispatch<React.SetStateAction<ReadExtendedOrderSchema[]>>,
  orderId: number,
  patch: Partial<ReadExtendedOrderSchema>,
) {
  setItems((prev) => prev.map((o) => (o.id === orderId ? { ...o, ...patch } : o)));
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

  const handleSort = (field: OrderSortField) => {
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

  const { items, setItems, total, loading, loadingMore, hasMore, loadMore, reload } = useOrders(params);

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
    const order = items.find((o) => o.id === editingOrderId);
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
      updateOrderInState(setItems, editingOrderId, payload);

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
      const order = items.find(o => o.id === id);
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
      updateOrderInState(setItems, id, processedPatch);
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
  };

  return (
    <div className="max-w-[1920px] mx-auto px-4">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Замовлення клієнтів</h1>
          <p className="text-gray-600">Пошук, сортування та редагування</p>
        </div>
        <Filters
          search={search}
          setSearch={setSearch}
          loading={loading}
          onRefresh={handleRefresh}
          setOffset={() => {}}
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
        orders={items}
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
      />

      <InfiniteScrollSentinel
        hasMore={hasMore}
        loading={loadingMore}
        onLoadMore={loadMore}
        total={total}
        loaded={items.length}
      />
    </div>
  );
}
