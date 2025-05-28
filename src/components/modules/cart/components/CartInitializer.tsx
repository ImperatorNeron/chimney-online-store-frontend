'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useCartStore } from '@/store/cart.store';

export default function CartInitializer() {
    const isInitialized = useAuthStore(state => state.isInitialized);
    const fetchCart = useCartStore(state => state.fetchCart);

    useEffect(() => {
        if (isInitialized) {
            fetchCart();
        }
    }, [fetchCart, isInitialized]);

    return null;
}
