'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchUserCart } from '@/services/cartService';

interface CartContextType {
    cart: CartData | null;
    refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartData | null>(null);

    const refreshCart = async () => {
        try {
            const response = await fetchUserCart();
            setCart(response.data);
        } catch (error) {
            console.error('Помилка оновлення корзини:', error);
        }
    };

    useEffect(() => {
        refreshCart();
    }, []);

    return (
        <CartContext.Provider value={{ cart, refreshCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart повинен використовуватись в CartProvider');
    return context;
};