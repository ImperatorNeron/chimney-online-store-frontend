"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MinusIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { ReadExtendedOrderSchema, ReadOrderItemSchema } from "@/api/types/types";
import { orderService } from "@/api/services/order.service";
import { NotificationService } from "@/api/services/notification.service";
import { useAuthStore } from "@/store/auth.store";

const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-300";

function money(v: number) {
    return new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);
}

function discountToPercent(total: number, discount: number) {
    if (!total) return 0;
    return Math.round((discount / total) * 1000) / 10;
}

function OrderItems({ items, editable, onUpdate }: { items: ReadOrderItemSchema[]; editable?: boolean; onUpdate?: (items: ReadOrderItemSchema[]) => void }) {
    const handleQuantityChange = (itemId: number, delta: number) => {
        if (!onUpdate) return;
        onUpdate(items.map(item => {
            if (item.id !== itemId) return item;
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty, price_at_order: Math.round(item.product_price * newQty) };
        }));
    };

    const handleDelete = (itemId: number) => {
        if (!onUpdate || items.length <= 1) return;
        onUpdate(items.filter(item => item.id !== itemId));
    };

    return (
        <div className="space-y-2">
            {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 bg-gray-50 rounded-lg border p-3">
                    <div className="min-w-0 flex-1">
                        {item.product_slug && item.product_id ? (
                            <Link
                                href={`/products/${item.product_slug}/${item.product_id}`}
                                className="font-medium text-sm text-gray-700 hover:text-gray-900 underline break-words"
                            >
                                {item.product_name || "Товар"}
                            </Link>
                        ) : (
                            <span className="font-medium text-sm text-gray-700 break-words">
                                {item.product_name || "Товар (видалено)"}
                            </span>
                        )}
                        <div className="text-xs text-gray-500 mt-1">
                            {editable ? (
                                <span className="inline-flex items-center gap-1.5">
                                    К-сть:
                                    <button type="button" onClick={() => handleQuantityChange(item.id, -1)} disabled={item.quantity <= 1} className="p-0.5 rounded hover:bg-gray-200 disabled:opacity-30">
                                        <MinusIcon className="h-3.5 w-3.5" />
                                    </button>
                                    <b className="min-w-[1.2rem] text-center">{item.quantity}</b>
                                    <button type="button" onClick={() => handleQuantityChange(item.id, 1)} className="p-0.5 rounded hover:bg-gray-200">
                                        <PlusIcon className="h-3.5 w-3.5" />
                                    </button>
                                    × {money(item.product_price)} грн
                                </span>
                            ) : (
                                <>К-сть: <b>{item.quantity}</b> × {money(item.product_price)} грн</>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right">
                            <div className="text-xs text-gray-500">Сума</div>
                            <div className="font-semibold">{money(item.price_at_order)} грн</div>
                        </div>
                        {editable && (
                            <button
                                type="button"
                                onClick={() => handleDelete(item.id)}
                                disabled={items.length <= 1}
                                className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                                title="Видалити позицію"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

export type OrderEditDraft = {
    first_name: string;
    last_name: string;
    patronymic: string;
    email: string;
    phone_number: string;
    address: string;
    comment?: string;
    internal_comment?: string;
};

export default function OrderDetails({
    order,
    isEditing,
    draft,
    onChange,
    onStartEdit,
    onCancel,
    onSave,
    saving,
    onDelete,
    deleting,
    onOrderUpdate,
}: {
    order: ReadExtendedOrderSchema;
    isEditing: boolean;
    draft: OrderEditDraft;
    onChange: (patch: Partial<OrderEditDraft>) => void;
    onStartEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    saving: boolean;
    onDelete?: () => void;
    deleting?: boolean;
    onOrderUpdate?: (updated: ReadExtendedOrderSchema) => void;
}) {
    const router = useRouter();
    const { getValidToken } = useAuthStore();
    const [editedItems, setEditedItems] = useState<ReadOrderItemSchema[] | null>(null);
    const [savingItems, setSavingItems] = useState(false);

    const isEditingItems = editedItems !== null;
    const [savedItems, setSavedItems] = useState<ReadOrderItemSchema[] | null>(null);
    const displayItems = editedItems ?? savedItems ?? order.items ?? [];

    const startEditItems = () => setEditedItems([...displayItems]);
    const cancelEditItems = () => setEditedItems(null);

    const saveItems = async () => {
        if (!editedItems) return;
        const original = savedItems ?? order.items ?? [];
        const actions: { item_id: number; action: string; quantity?: number }[] = [];

        // Deleted items
        for (const orig of original) {
            if (!editedItems.find(e => e.id === orig.id)) {
                actions.push({ item_id: orig.id, action: "delete" });
            }
        }
        // Changed quantity
        for (const edited of editedItems) {
            const orig = original.find(o => o.id === edited.id);
            if (orig && orig.quantity !== edited.quantity) {
                actions.push({ item_id: edited.id, action: "update_quantity", quantity: edited.quantity });
            }
        }

        if (actions.length === 0) {
            setEditedItems(null);
            return;
        }

        try {
            setSavingItems(true);
            const token = await getValidToken();
            if (!token) return router.push("/auth/login");
            const updated = await orderService.updateOrderItems(token, order.id, actions);
            NotificationService.success("Позиції оновлено");
            setSavedItems(editedItems);
            setEditedItems(null);
            if (onOrderUpdate && updated) onOrderUpdate(updated);
        } catch (err) {
            console.error(err);
            NotificationService.error("Не вдалося оновити позиції");
        } finally {
            setSavingItems(false);
        }
    };

    const total = displayItems.reduce((sum, item) => sum + Number(item.price_at_order || 0), 0);
    const discount = Number(order.price_discount || 0);
    const finalTotal = Math.max(0, Math.round(total - discount));
    const discountPercent = discountToPercent(total, discount);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-sm">
            {/* Ліва частина: товари + підсумки */}
            <div className="lg:col-span-2 space-y-4">
                <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                        <div>
                            <div className="text-gray-600 text-xs">Товари замовлення</div>
                            <div className="font-bold">#{order.id}</div>
                        </div>
                        <div className="flex gap-2">
                            {!isEditingItems ? (
                                <button
                                    type="button"
                                    onClick={startEditItems}
                                    className="px-3 py-1.5 rounded bg-blue-50 text-blue-600 text-xs font-medium hover:bg-blue-100"
                                >
                                    Редагувати позиції
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={cancelEditItems}
                                        disabled={savingItems}
                                        className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 disabled:opacity-60"
                                    >
                                        Скасувати
                                    </button>
                                    <button
                                        type="button"
                                        onClick={saveItems}
                                        disabled={savingItems}
                                        className="px-3 py-1.5 rounded bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-60"
                                    >
                                        {savingItems ? "Збереження..." : "Зберегти позиції"}
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                        <OrderItems items={displayItems} editable={isEditingItems} onUpdate={setEditedItems} />
                    </div>
                </div>

                {/* Підсумки */}
                <div className="bg-white border rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-2">Підсумки</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="bg-gray-50 rounded p-2 border">
                            <div className="text-xs text-gray-500">Сума</div>
                            <div className="font-semibold">{money(total)} грн</div>
                        </div>
                        <div className="bg-gray-50 rounded p-2 border">
                            <div className="text-xs text-gray-500">Знижка</div>
                            <div className="font-semibold">
                                {money(discount)} <span className="text-xs text-gray-400">({discountPercent}%)</span>
                            </div>
                        </div>
                        <div className="bg-gray-50 rounded p-2 border">
                            <div className="text-xs text-gray-500">До сплати</div>
                            <div className="font-semibold text-green-700">{money(finalTotal)} грн</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Права частина: дані клієнта (вертикально) */}
            <div className="space-y-3">
                <div className="bg-white border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                        <div className="text-xs text-gray-600">Дані клієнта</div>
                        {!isEditing ? (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={onStartEdit}
                                    className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200"
                                >
                                    Редагувати
                                </button>
                                {onDelete && (
                                    <button
                                        type="button"
                                        onClick={onDelete}
                                        disabled={deleting}
                                        className="px-2.5 py-1 rounded bg-red-50 text-red-600 text-xs font-medium hover:bg-red-100 disabled:opacity-60"
                                    >
                                        {deleting ? "..." : "Видалити"}
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    disabled={saving}
                                    className="px-2.5 py-1 rounded bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 disabled:opacity-60"
                                >
                                    Скасувати
                                </button>
                                <button
                                    type="button"
                                    onClick={onSave}
                                    disabled={saving}
                                    className="px-2.5 py-1 rounded bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-60"
                                >
                                    Зберегти
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Прізвище</div>
                            {isEditing ? (
                                <input
                                    className={inputClass}
                                    value={draft.last_name}
                                    maxLength={50}
                                    placeholder="Обовʼязкове поле"
                                    onChange={(e) => onChange({ last_name: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium">{order.last_name}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Імʼя</div>
                            {isEditing ? (
                                <input
                                    className={inputClass}
                                    value={draft.first_name}
                                    maxLength={50}
                                    placeholder="Обовʼязкове поле"
                                    onChange={(e) => onChange({ first_name: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium">{order.first_name}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">По батькові</div>
                            {isEditing ? (
                                <input
                                    className={inputClass}
                                    value={draft.patronymic}
                                    maxLength={50}
                                    onChange={(e) => onChange({ patronymic: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium">{order.patronymic || "—"}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Телефон</div>
                            {isEditing ? (
                                <input
                                    className={inputClass}
                                    value={draft.phone_number}
                                    maxLength={13}
                                    placeholder="+380XXXXXXXXX"
                                    onChange={(e) => onChange({ phone_number: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium">{order.phone_number}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Пошта</div>
                            {isEditing ? (
                                <input
                                    type="email"
                                    className={inputClass}
                                    value={draft.email}
                                    maxLength={320}
                                    placeholder="email@example.com"
                                    onChange={(e) => onChange({ email: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium break-all">{order.email}</div>
                            )}
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Адреса доставки</div>
                            {isEditing ? (
                                <textarea
                                    className={`${inputClass} min-h-[70px]`}
                                    value={draft.address}
                                    maxLength={200}
                                    placeholder="Обовʼязкове поле"
                                    onChange={(e) => onChange({ address: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium break-words">{order.address}</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Коментарі */}
                <div className="bg-white border rounded-lg p-4">
                    <div className="text-xs text-gray-600 mb-3">Коментарі</div>
                    <div className="space-y-3">
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Коментар клієнта</div>
                            <div className="font-medium break-words text-sm text-gray-700">
                                {order.comment || <span className="text-gray-400 italic">Немає</span>}
                            </div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 mb-0.5">Внутрішній коментар</div>
                            {isEditing ? (
                                <textarea
                                    className={`${inputClass} min-h-[60px] bg-amber-50 border-amber-200`}
                                    value={draft.internal_comment || ""}
                                    maxLength={500}
                                    placeholder="Нотатка для адміністратора"
                                    onChange={(e) => onChange({ internal_comment: e.target.value })}
                                />
                            ) : (
                                <div className="font-medium break-words text-sm text-gray-700">
                                    {order.internal_comment || <span className="text-gray-400 italic">Немає</span>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}