'use client';

import { useState } from 'react';
import { UserIcon, HeartIcon, ClockIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import SideMenu from './components/SideMenu';
import MobileMenu from './components/MobileMenu';
import useUserData from '@/components/modules/profile/hooks/useUserData';
import PersonalDataForm from '@/components/modules/profile/components/PersonalDataForm';

export default function DashboardPage() {
    const { user, loading, error } = useUserData();
    const [activeSection, setActiveSection] = useState(1);

    const menuItems = [
        { id: 1, title: "Персональні дані", icon: UserIcon },
        { id: 2, title: "Улюблене", icon: HeartIcon },
        { id: 3, title: "Історія", icon: ClockIcon },
        { id: 4, title: "Поточні замовлення", icon: ShoppingBagIcon },
    ];

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>Помилка: {error}</div>;
    if (!user) return <div>Користувач не знайдений</div>;

    return (
        <div className="flex flex-col md:flex-row bg-white">
            <SideMenu
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                menuItems={menuItems}
                username={user.username}
            />
            <MobileMenu
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                menuItems={menuItems}
            />
            <main className="flex-1 px-4 py-6 md:p-8">
                {activeSection === 1 && <PersonalDataForm user={user} />}
            </main>
        </div>
    );
}
