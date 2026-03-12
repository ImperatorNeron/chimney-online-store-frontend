"use client"

import {
    InboxIcon,
    ClipboardDocumentListIcon,
    PlusCircleIcon,
    MegaphoneIcon,
} from "@heroicons/react/24/outline";
import CardLink from "@/components/modules/admin/components/common/AdminCardLink";

export default function AdminDashboard() {
    return (
        <main className="flex-1 flex items-start justify-center px-4 py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl w-full">
                <CardLink
                    href="/admin-panel/messages"
                    title="Повідомлення"
                    desc="Перегляньте вхідні повідомлення та відповідайте клієнтам"
                    icon={<InboxIcon className="h-6 w-6" />}
                />

                <CardLink
                    href="/admin-panel/orders"
                    title="Статус замовлень"
                    desc="Оновіть статуси замовлень, перегляньте деталі та фільтри"
                    icon={<ClipboardDocumentListIcon className="h-6 w-6" />}
                />

                <CardLink
                    href="/admin-panel/products"
                    title="Додати товар"
                    desc="Швидко додайте новий товар у каталог"
                    icon={<PlusCircleIcon className="h-6 w-6" />}
                />

                <CardLink
                    href="/admin/promotions"
                    title="Акції"
                    desc="Керуйте акційними блоками та банерами"
                    icon={<MegaphoneIcon className="h-6 w-6" />}
                />
            </div>
        </main>
    );
}
