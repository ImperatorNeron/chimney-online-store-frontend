'use client';
import useAddItemToCart from "@/hooks/cart/useAddItemToCart";

export default function AddToCartButton({ productId }: { productId: number }) {
    const { addCartItem, localLoading } = useAddItemToCart();

    return (
        <button
            className="flex-1 border-2 border-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            onClick={() => addCartItem(productId)}
            disabled={localLoading === productId}
        >
            {localLoading === productId ? (
                <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : ("Додати в кошик")}
        </button>
    );
};