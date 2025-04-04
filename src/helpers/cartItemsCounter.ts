import { useCart } from "@/contexts/CartContext";

export const CartCounter = () => {
    const { cart } = useCart();

    if (!cart) return 0;

    const totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    return totalItems;
};