'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useFavouritesStore } from '@/store/favourite.store';

export default function LikeInitializer() {
    const isInitialized = useAuthStore(state => state.isInitialized);
    const fetchLikes = useFavouritesStore(state => state.fetchLikedProducts);

    useEffect(() => {
        if (isInitialized) {
            fetchLikes();
        }
    }, [isInitialized, fetchLikes]);

    return null;
}
