'use client';

import Link from 'next/link';
import { HomeIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import AdminMenuOverlay from '@/components/modules/admin/components/common/AdminMenuOverlay';

export default function AdminHeader() {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <header className="border-b border-gray-200 relative z-20">
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <button
                            aria-label="menu"
                            onClick={() => setMenuOpen(true)}
                            className="p-2 rounded-md hover:bg-gray-100"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>

                        <Link href="/admin-panel" className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg font-semibold">
                                AD
                            </div>
                            <div>
                                <h1 className="text-lg font-semibold leading-4">Admin Panel</h1>
                                <p className="text-xs text-gray-500">Початкова сторінка</p>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            <HomeIcon className="h-5 w-5" /> На сайт
                        </Link>
                        <Link className="flex items-center gap-2 p-1 rounded-md hover:bg-gray-50" href="/profile/me">
                            <UserCircleIcon className="h-8 w-8 text-gray-700" />
                            <div className="text-sm">
                                <div className="font-medium">Адмін</div>
                                <div className="text-xs text-gray-500">Перейти до профілю</div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <AdminMenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}
