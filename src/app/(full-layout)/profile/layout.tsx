'use client'
import useUserData from '@/components/modules/profile/hooks/useUserData';
import SideMenu from './components/SideMenu';
import { ProfileContext } from '@/provider/profile.provider';
import { useMemo } from 'react';
import ProfileSkeleton from './loading';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    const { user, loading, error } = useUserData();
    const userValue = useMemo(() => user, [user]);

    if (loading) return <ProfileSkeleton />;
    if (error) return <div>Помилка: {error}</div>;
    if (!user) return <div>Користувач не знайдений</div>;

    return (
        <ProfileContext.Provider value={userValue}>
            <div className="flex flex-col lg:flex-row">
                <SideMenu username={userValue.username} isAdmin={userValue.is_superuser} />

                <div className="flex-1 px-3 py-6 md:px-8 md:py-8 min-h-[60vh]">
                    {children}
                </div>
            </div>
        </ProfileContext.Provider>
    );
};