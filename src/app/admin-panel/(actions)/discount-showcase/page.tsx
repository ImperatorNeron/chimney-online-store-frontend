'use client';

import { useState, useEffect, useCallback } from "react";
import { productService, type DiscountedAdminItem } from "@/api/services/products.service";
import useFetchData from "@/components/modules/admin/hooks/common/useFetchData";
import { useAuthStore } from "@/store/auth.store";
import { NotificationService } from "@/api/services/notification.service";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function money(v: number) {
    return new Intl.NumberFormat("uk-UA", { maximumFractionDigits: 0 }).format(v);
}

export default function DiscountShowcasePage() {
    const { getValidToken } = useAuthStore();
    const { data, loading } = useFetchData<DiscountedAdminItem[]>(
        (token) => productService.getDiscountedAdmin(token),
    );

    const [items, setItems] = useState<DiscountedAdminItem[]>([]);
    const [saving, setSaving] = useState(false);
    const [dirty, setDirty] = useState(false);

    useEffect(() => {
        if (data) {
            setItems([...data]);
            setDirty(false);
        }
    }, [data]);

    const move = useCallback((index: number, direction: -1 | 1) => {
        const target = index + direction;
        if (target < 0 || target >= items.length) return;
        const next = [...items];
        [next[index], next[target]] = [next[target], next[index]];
        setItems(next);
        setDirty(true);
    }, [items]);

    const handleSaveOrder = async () => {
        try {
            setSaving(true);
            const token = await getValidToken();
            if (!token) return;
            await productService.reorderDiscounted(
                token,
                items.map((item, i) => ({ variation_id: item.variation_id, sort_order: i })),
            );
            setDirty(false);
            NotificationService.success("Порядок збережено");
        } catch {
            NotificationService.error("Не вдалося зберегти порядок");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Вітрина знижок</h1>
                <p className="text-gray-600">
                    Тут автоматично з&apos;являються всі варіації зі знижкою. Змінюйте порядок для головної сторінки.
                </p>
            </div>

            <div className="max-w-3xl">
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
                        <h2 className="text-sm font-semibold">
                            Товари зі знижкою · {items.length}
                        </h2>
                        {dirty && (
                            <button
                                onClick={handleSaveOrder}
                                disabled={saving}
                                className="px-5 py-1.5 bg-black text-white text-sm rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors"
                            >
                                {saving ? "Збереження..." : "Зберегти порядок"}
                            </button>
                        )}
                    </div>

                    {loading ? (
                        <div className="px-5 py-8 text-center text-sm text-gray-500">Завантаження...</div>
                    ) : items.length === 0 ? (
                        <div className="px-5 py-8 text-center">
                            <p className="text-sm text-gray-400">Немає товарів зі знижкою</p>
                            <p className="text-xs text-gray-400 mt-1">Задайте знижку у варіаціях товарів в розділі &quot;Додати товар&quot;</p>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-100">
                            {/* Column headers */}
                            <div className="grid grid-cols-[40px_1fr_100px_80px_80px] gap-3 px-5 py-2 text-xs text-gray-500 font-medium bg-gray-50/50">
                                <span>#</span>
                                <span>Товар</span>
                                <span className="text-right">Ціна</span>
                                <span className="text-center">Знижка</span>
                                <span></span>
                            </div>

                            {items.map((item, index) => (
                                <div
                                    key={item.variation_id}
                                    className="grid grid-cols-[40px_1fr_100px_80px_80px] gap-3 px-5 py-3 items-center hover:bg-gray-50/50 transition-colors"
                                >
                                    <span className="text-xs text-gray-400 font-medium">{index + 1}</span>

                                    <div className="min-w-0">
                                        <Link
                                            href={`/admin-panel/products/update/${item.slug}`}
                                            className="text-sm font-medium text-gray-800 hover:underline truncate block"
                                        >
                                            {item.name}
                                        </Link>
                                        <span className="text-xs text-gray-400">ID: {item.variation_id}</span>
                                    </div>

                                    <span className="text-sm text-right text-gray-700">{money(item.price)} грн</span>

                                    <span className="text-sm text-center">
                                        <span className="inline-block bg-red-50 text-red-600 px-2 py-0.5 rounded-full text-xs font-medium">
                                            -{item.discount_percentage}%
                                        </span>
                                    </span>

                                    <div className="flex items-center justify-end gap-0.5">
                                        <button
                                            onClick={() => move(index, -1)}
                                            disabled={index === 0}
                                            className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-20 transition-colors"
                                            title="Вгору"
                                        >
                                            <ArrowUpIcon className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => move(index, 1)}
                                            disabled={index === items.length - 1}
                                            className="p-1.5 rounded-md hover:bg-gray-200 disabled:opacity-20 transition-colors"
                                            title="Вниз"
                                        >
                                            <ArrowDownIcon className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
