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
            description: 'Натисніть сюди, щоб переглянути звернення від клієнтів у зручному вигляді',
        },
        {
            title: 'Статус замовлень',
            icon: <DocumentTextIcon className="h-10 w-10" />,
            href: '/admin-panel/orders',
            description: 'Натисніть сюди, щоб переглянути замовлення, оновіть статуси, додайти номер накладної або знижку',
        },
        {
            title: 'Додати товар',
            icon: <PlusCircleIcon className="h-10 w-10" />,
            href: '/admin-panel/products',
            description: 'Натисніть сюди, щоб переглянути, додавати чи оновити товар до каталогу',
        },
    ];

    return (
        <div className="py-8 px-4 sm:px-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-10 border-b pb-4">
                Оберіть дію
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        className="group flex flex-col items-start p-6 bg-white border border-gray-300 rounded-xl hover:shadow-md hover:border-gray-400 transition"
                    >
                        <div className="flex items-center gap-4 mb-2">
                            <div className="text-gray-700 group-hover:text-black">
                                {item.icon}
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800">
                                {item.title}
                            </h2>
                        </div>
                        <p className="text-base text-gray-600 leading-relaxed">
                            {item.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
