'use client'

import AdminHeader from "@/components/layout/header/AdminHeader";
import MainLoader from "@/components/layout/loaders/MainLoader";
import useUserData from "@/components/modules/profile/hooks/useUserData";
import { ProfileContext } from "@/provider/profile.provider";
import { useMemo } from "react";

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    const { user, loading } = useUserData();
    const userValue = useMemo(() => user, [user]);

    if (loading) return <MainLoader />;
    if (!user || !userValue.is_superuser) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-red-600 uppercase">
                    Доступ заборонений
                </h1>
            </div>
        );
    }
    return (
        <ProfileContext.Provider value={userValue}>
            <div>
                <AdminHeader />
                <div className="mx-auto min-h-screen px-4 md:px-8">
                    {children}
                </div>
            </div>
        </ProfileContext.Provider>
    );
};