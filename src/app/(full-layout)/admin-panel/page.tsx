'use client'

import Link from 'next/link';
import {
    ChatBubbleLeftRightIcon,
    DocumentTextIcon,
    PlusCircleIcon,
} from '@heroicons/react/24/outline';

export default function AdminPanel() {
    const menuItems = [
        {
            title: 'Повідомлення',
            icon: <ChatBubbleLeftRightIcon className="h-10 w-10" />,
            href: '/admin-panel/messages',
            description: 'Переглянути повідомлення від клієнтів'
        },
        {
            title: 'Статус замовлень',
            icon: <DocumentTextIcon className="h-10 w-10" />,
            href: '/admin/orders',
            description: 'Оновити статус замовлень або додати номер накладної'
        },
        {
            title: 'Додати товар',
            icon: <PlusCircleIcon className="h-10 w-10" />,
            href: '/admin/add-product',
            description: 'Створення нових карток товарів у каталозі'
        },
    ];

    return (
        <div className="min-h-screen bg-white py-6 sm:py-8 px-2 sm:px-6">
            <h1 className="text-3xl font-bold text-black mb-8 border-b-2 border-gray-200 pb-4">
                Оберіть дію, яку Ви хочете зробити
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="group flex flex-col items-start p-6 bg-white border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 group-hover:text-black">
                                {item.icon}
                            </span>
                            <h2 className="text-2xl font-semibold text-black">
                                {item.title}
                            </h2>
                        </div>
                        <p className="mt-4 text-lg text-gray-600">
                            {item.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}