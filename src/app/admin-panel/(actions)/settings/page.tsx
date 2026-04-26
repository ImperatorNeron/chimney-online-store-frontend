'use client';

import { useState, useEffect } from "react";
import { websiteSettingsService } from "@/api/services/websiteSettings.service";
import useFetchData from "@/components/modules/admin/hooks/common/useFetchData";
import { ReadWebSiteSettingsSchema } from "@/api/types/types";
import { useAuthStore } from "@/store/auth.store";
import { NotificationService } from "@/api/services/notification.service";

export default function SettingsPage() {
    const { data, loading } = useFetchData<ReadWebSiteSettingsSchema>(
        (token) => websiteSettingsService.getSettings(token),
    );

    const { getValidToken } = useAuthStore();
    const [manufacturerDiscount, setManufacturerDiscount] = useState("");
    const [sellerMarkup, setSellerMarkup] = useState("");
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) {
            setManufacturerDiscount(String(data.manufacturer_discount));
            setSellerMarkup(String(data.seller_markup));
        }
    }, [data]);

    const handleSave = async () => {
        const discount = parseFloat(manufacturerDiscount);
        const markup = parseFloat(sellerMarkup);
        if (isNaN(discount) || isNaN(markup) || discount < 0 || discount > 100 || markup < 0 || markup > 100) {
            NotificationService.error("Значення повинні бути від 0 до 100");
            return;
        }
        try {
            setSaving(true);
            const token = await getValidToken();
            if (!token) return;
            await websiteSettingsService.updateSettings(token, {
                manufacturer_discount: discount,
                seller_markup: markup,
            });
            NotificationService.success("Налаштування збережено");
        } catch {
            NotificationService.error("Не вдалося зберегти налаштування");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-[1920px] mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Налаштування</h1>
                <p className="text-gray-600">Глобальні відсотки для ціноутворення на сайті</p>
            </div>

            {loading ? (
                <div className="text-sm text-gray-500">Завантаження...</div>
            ) : (
                <div className="border border-gray-200 rounded-2xl p-6 max-w-2xl">
                    <h2 className="text-sm font-semibold mb-1">Ціноутворення</h2>
                    <p className="text-xs text-gray-500 mb-5">
                        Формула: Базова ціна × (1 − знижка виробника) × (1 + націнка продавця)
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Знижка виробника, %
                            </label>
                            <p className="text-xs text-gray-400 mb-2">
                                Зменшує базову ціну товару
                            </p>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                step={0.01}
                                value={manufacturerDiscount}
                                onChange={(e) => setManufacturerDiscount(e.target.value)}
                                className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Націнка продавця, %
                            </label>
                            <p className="text-xs text-gray-400 mb-2">
                                Збільшує ціну після знижки
                            </p>
                            <input
                                type="number"
                                min={0}
                                max={100}
                                step={0.01}
                                value={sellerMarkup}
                                onChange={(e) => setSellerMarkup(e.target.value)}
                                className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black"
                            />
                        </div>
                    </div>

                    {data && (
                        <div className="mt-5 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                            <span className="font-medium">Приклад:</span>{" "}
                            товар з ціною 1000 грн →{" "}
                            {Math.round(1000 * (1 - parseFloat(manufacturerDiscount || "0") / 100) * (1 + parseFloat(sellerMarkup || "0") / 100))} грн
                        </div>
                    )}

                    <div className="mt-5">
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50"
                        >
                            {saving ? "Збереження..." : "Зберегти"}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
