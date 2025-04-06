'use client';
import useAddToCart from '@/hooks/cart/useAddToCart';

export default function ButtonAddToCart({ productId }: { productId: number }) {
    const { addToCart, isError, isPending } = useAddToCart();

    return (
        <button
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => addToCart({ productId: productId })}
            disabled={isPending}
        >
            {isPending ? (
                <div className="h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (<svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
            </svg>)}
        </button>
    );
};

