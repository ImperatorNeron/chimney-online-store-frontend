"use client";

import Link from "next/link";
import type { ReadExtendedOrderSchema, ReadOrderItemSchema } from "@/api/types/types";

const inputClass =
    "w-full border border-gray-300 rounded-md px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-300";

function money(v: number) {
    return new Intl.NumberFormat("uk-UA", { minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(v);
}

function discountToPercent(total: number, discount: number) {
    if (!total) return 0;
    return Math.round((discount / total) * 1000) / 10;
}

function OrderItems({ items }: { items: ReadOrderItemSchema[] }) {
    return (
        <div className="space-y-2">
            {items.map((item) => (
                <div key={item.id} className="flex items-start justify-between gap-3 bg-gray-50 rounded-lg border p-3">
                    <div className="min-w-0">
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
                            К-сть: <b>{item.quantity}</b> × {money(item.product_price)} грн
                        </div>
                    </div>
                    <div className="text-right shrink-0">
                        <div className="text-xs text-gray-500">Сума</div>
                        <div className="font-semibold">{money(item.price_at_order)} грн</div>
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
}: {
    order: ReadExtendedOrderSchema;
    isEditing: boolean;
    draft: OrderEditDraft;
    onChange: (patch: Partial<OrderEditDraft>) => void;
    onStartEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    saving: boolean;
}) {
    const total = Number(order.total_price || 0);
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
                        {!isEditing ? (
                            <button
                                type="button"
                                onClick={onStartEdit}
                                className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200"
                            >
                                Редагувати дані
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    disabled={saving}
                                    className="px-3 py-1.5 rounded bg-gray-100 text-gray-700 text-xs font-medium hover:bg-gray-200 disabled:opacity-60"
                                >
                                    Скасувати
                                </button>
                                <button
                                    type="button"
                                    onClick={onSave}
                                    disabled={saving}
                                    className="px-3 py-1.5 rounded bg-green-600 text-white text-xs font-medium hover:bg-green-700 disabled:opacity-60"
                                >
                                    Зберегти
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="max-h-80 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                        <OrderItems items={order.items ?? []} />
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
                    <div className="text-xs text-gray-600 mb-3">Дані клієнта</div>
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