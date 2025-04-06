'use client';
import useAddToCart from "@/hooks/cart/useAddToCart";

export default function AddToCartButton({ productId }: { productId: number }) {
    const { addToCart, isPending, isError } = useAddToCart();

    return (
        <button
            className="flex-1 border-2 border-gray-900 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
            onClick={() => addToCart({ productId: productId })}
            disabled={isPending}
        >
            {isPending ? (
                <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : ("Додати в кошик")}
        </button>
    );
};