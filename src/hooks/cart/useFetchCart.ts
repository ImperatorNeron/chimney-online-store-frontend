import { fetchUserCart } from "@/services/cartService";
import { useState, useCallback, useEffect } from "react";

export default function useFetchCart() {
    const [cart, setCart] = useState<CartData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchUserCart()
            setCart(response.data);
        } catch (error) {
            setError((error as Error).message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return { cart, loading, error, fetchCart };
};

