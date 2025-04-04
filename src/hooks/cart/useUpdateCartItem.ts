import { useCart } from "@/contexts/CartContext";
import { NotificationService } from "@/helpers/notification";
import { handleQuantityChange } from "@/services/cartService";
import { useState, useCallback } from "react";

const useUpdateCartItem = (fetchCart: () => Promise<void>) => {
    const [localLoading, setLocalLoading] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { refreshCart } = useCart();

    const updateCartItem = useCallback(async (itemId: number, action: string) => {
        try {
            setLocalLoading(itemId);
            await handleQuantityChange(itemId, action);
            await refreshCart();
            await fetchCart();
        } catch (error) {
            setError((error as Error).message);
            NotificationService.error("Не вдалось оновити кількість")
        } finally {
            setLocalLoading(null);
        }
    }, [fetchCart]);

    return { updateCartItem, localLoading, error };
};

export default useUpdateCartItem;
