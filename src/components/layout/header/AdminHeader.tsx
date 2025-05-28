'use client';

import Link from 'next/link';
import { HomeIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function AdminHeader() {
    return (
        <header className="w-full bg-gray-50 border-b border-gray-200 py-4 shadow-sm">
            <div className="container mx-auto px-4 flex flex-col gap-4 sm:flex-row items-center justify-between max-w-7xl">
                <div className="flex items-center gap-3">
                    <Cog6ToothIcon className="h-6 w-6 text-gray-700" />
                    <h1 className="text-xl font-semibold tracking-tight text-gray-800">
                        Панель адміністратора
                    </h1>
                </div>

                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
                >
                    <HomeIcon className="h-5 w-5" />
                    <span>Повернутись на сайт</span>
                </Link>
            </div>
        </header>
    );
}
