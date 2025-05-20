'use client';

import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/solid';

export default function AdminHeader() {
    return (
        <header className="w-full bg-gray-200 text-gray-900 py-4 shadow-sm">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto">
                <h1 className="text-lg font-semibold sm:text-left text-center mb-2 sm:mb-0">
                    Панель адміністрування
                </h1>

                <Link
                    href="/"
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-800 transition"
                >
                    <HomeIcon className="h-5 w-5" />
                    <span className="text-sm">На сайт</span>
                </Link>
            </div>
        </header>
    );
}
