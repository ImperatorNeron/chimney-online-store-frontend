'use client';
import { useAuthStore } from '@/store/auth.store';
import { useEffect } from 'react';

const RefreshCheck = () => {
    const initialize = useAuthStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);

    return null;
};

export default RefreshCheck;
