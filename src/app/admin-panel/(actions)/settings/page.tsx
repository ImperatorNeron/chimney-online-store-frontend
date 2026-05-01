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
    const [form, setForm] = useState({
        manufacturerDiscount: "",
        sellerMarkup: "",
        phone: "",
        email: "",
        address: "",
        workSchedule: "",
        telegramUrl: "",
        facebookUrl: "",
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (data) {
            setForm({
                manufacturerDiscount: String(data.manufacturer_discount),
                sellerMarkup: String(data.seller_markup),
                phone: (data as any).phone || "",
                email: (data as any).email || "",
                address: (data as any).address || "",
                workSchedule: (data as any).work_schedule || "",
                telegramUrl: (data as any).telegram_url || "",
                facebookUrl: (data as any).facebook_url || "",
            });
        }
    }, [data]);

    const handleSave = async () => {
        const discount = parseFloat(form.manufacturerDiscount);
        const markup = parseFloat(form.sellerMarkup);
        if (isNaN(discount) || isNaN(markup) || discount < 0 || discount > 100 || markup < 0 || markup > 100) {
            NotificationService.error("Відсотки повинні бути від 0 до 100");
            return;
        }
        try {
            setSaving(true);
            const token = await getValidToken();
            if (!token) return;
            await websiteSettingsService.updateSettings(token, {
                manufacturer_discount: discount,
                seller_markup: markup,
                phone: form.phone || undefined,
                email: form.email || undefined,
                address: form.address || undefined,
                work_schedule: form.workSchedule || undefined,
                telegram_url: form.telegramUrl || undefined,
                facebook_url: form.facebookUrl || undefined,
            } as any);
            NotificationService.success("Налаштування збережено");
        } catch {
            NotificationService.error("Не вдалося зберегти налаштування");
        } finally {
            setSaving(false);
        }
    };

    const updateField = (key: string, value: string) => setForm(prev => ({ ...prev, [key]: value }));

    return (
        <div className="max-w-[1920px] mx-auto px-4">
            <div className="mb-6">
                <h1 className="text-2xl md:text-3xl font-bold">Налаштування</h1>
                <p className="text-gray-600">Глобальні параметри сайту</p>
            </div>

            {loading ? (
                <div className="text-sm text-gray-500">Завантаження...</div>
            ) : (
                <div className="space-y-6 max-w-2xl">
                    <div className="border border-gray-200 rounded-2xl p-6">
                        <h2 className="text-sm font-semibold mb-1">Ціноутворення</h2>
                        <p className="text-xs text-gray-500 mb-5">
                            Формула: Базова ціна × (1 − знижка виробника) × (1 + націнка продавця)
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Знижка виробника, %</label>
                                <input type="number" min={0} max={100} step={0.01} value={form.manufacturerDiscount}
                                    onChange={e => updateField("manufacturerDiscount", e.target.value)}
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Націнка продавця, %</label>
                                <input type="number" min={0} max={100} step={0.01} value={form.sellerMarkup}
                                    onChange={e => updateField("sellerMarkup", e.target.value)}
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                        </div>
                        {data && (
                            <div className="mt-5 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
                                <span className="font-medium">Приклад:</span>{" "}
                                товар з ціною 1000 грн →{" "}
                                {Math.round(1000 * (1 - parseFloat(form.manufacturerDiscount || "0") / 100) * (1 + parseFloat(form.sellerMarkup || "0") / 100))} грн
                            </div>
                        )}
                    </div>

                    <div className="border border-gray-200 rounded-2xl p-6">
                        <h2 className="text-sm font-semibold mb-4">Контактна інформація</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
                                <input type="text" value={form.phone} onChange={e => updateField("phone", e.target.value)}
                                    placeholder="+38 (099) 123-45-67"
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input type="email" value={form.email} onChange={e => updateField("email", e.target.value)}
                                    placeholder="info@example.com"
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Адреса</label>
                                <input type="text" value={form.address} onChange={e => updateField("address", e.target.value)}
                                    placeholder="м. Луцьк, вул. Центральна 15"
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Графік роботи</label>
                                <input type="text" value={form.workSchedule} onChange={e => updateField("workSchedule", e.target.value)}
                                    placeholder="Пн-Пт: 9:00-18:00, Сб: 10:00-15:00"
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Telegram</label>
                                <input type="url" value={form.telegramUrl} onChange={e => updateField("telegramUrl", e.target.value)}
                                    placeholder="https://t.me/username"
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
                                <input type="url" value={form.facebookUrl} onChange={e => updateField("facebookUrl", e.target.value)}
                                    placeholder="https://facebook.com/page"
                                    className="w-full h-[35px] rounded-lg border border-gray-300 px-3 text-sm focus:outline-none focus:ring-1 focus:ring-black" />
                            </div>
                        </div>
                    </div>

                    <button onClick={handleSave} disabled={saving}
                        className="px-6 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-800 transition-colors disabled:opacity-50">
                        {saving ? "Збереження..." : "Зберегти"}
                    </button>
                </div>
            )}
        </div>
    );
}
