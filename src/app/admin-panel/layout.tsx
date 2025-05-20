'use client'

import AdminHeader from "@/components/layout/header/AdminHeader";
import useUserData from "@/components/modules/profile/hooks/useUserData";
import { ProfileContext } from "@/provider/profile.provider";
import { useMemo } from "react";

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { user, loading, error } = useUserData();
    const userValue = useMemo(() => user, [user]);

    if (loading) return <div>Завантаження...</div>;
    if (error) return <div>Помилка: {error}</div>;
    if (!user) return <div>Користувач не знайдений</div>;
    return (
        <ProfileContext.Provider value={userValue}>
            <div>
                <AdminHeader />
                <div className="max-w-8xl mx-auto">
                    {children}
                </div>
            </div>
        </ProfileContext.Provider>
    );
};