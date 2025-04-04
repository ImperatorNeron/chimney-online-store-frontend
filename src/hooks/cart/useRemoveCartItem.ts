import { useCart } from "@/contexts/CartContext";
import { NotificationService } from "@/helpers/notification";
import { handleRemoveItem } from "@/services/cartService";
import { useState, useCallback } from "react";

const useRemoveCartItem = (fetchCart: () => Promise<void>) => {
    const [localLoading, setLocalLoading] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const { refreshCart } = useCart();

    const removeCartItem = useCallback(async (itemId: number) => {
        try {
            setLocalLoading(itemId);

            await handleRemoveItem(itemId);
            await refreshCart();
            NotificationService.success("Товар видалено з корзини");
            await fetchCart();
        } catch (error) {
            setError((error as Error).message);
            NotificationService.error("Не вдалось видалити товар")
        } finally {
            setLocalLoading(null);
        }
    }, [fetchCart]);

    return { removeCartItem, localLoading, error };
};

export default useRemoveCartItem;
