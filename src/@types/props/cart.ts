interface CartItemProps {
    item: any;
    removeCartItem: (id: number) => void;
    updateCartItem: (id: number, action: "increment" | "decrement") => void;
    updateLoading: number | null;
    removeLoading: number | null;
}

interface CartItemListProps {
    cart: any;
    updateCartItem: (id: number, action: "increment" | "decrement") => void;
    removeCartItem: (id: number) => void;
    updateLoading: number | null;
    removeLoading: number | null;
}

interface OrderSummaryProps {
    onClose: () => void;
    totalQuantity: number;
    totalPrice: number;
}