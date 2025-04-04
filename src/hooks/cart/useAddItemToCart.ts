'use client'

import { useCart } from "@/contexts/CartContext";
import { NotificationService } from "@/helpers/notification";
import { handleAddToCart } from "@/services/cartService";
import { useState, useCallback } from "react";

export default function useAddItemToCart() {
    const [localLoading, setLocalLoading] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { refreshCart } = useCart();

    const addCartItem = useCallback(async (itemId: number) => {
        try {
            setLocalLoading(itemId);
            await handleAddToCart(itemId, 1);
            NotificationService.success("Товар додано до корзини")
            await refreshCart();
        } catch (error) {
            setError((error as Error).message);
            NotificationService.error('Помилка при додаванні товару')
        } finally {
            setLocalLoading(null);
        }
    }, []);

    return { addCartItem: addCartItem, localLoading, error };
};

