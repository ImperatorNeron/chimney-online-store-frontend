'use client';
import Image from 'next/image';
import { useState } from 'react';
import useCart from '@/components/modules/cart/hooks/useCart';
import CartOverlay from '@/components/modules/cart/components/CartOverlay';

export default function OpenCartButton({ hint = true }: { hint?: boolean }) {
    const [isOpen, setIsOpen] = useState(false);
    const { cart, isError, isLoading, totalQuantity } = useCart()
    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="text-gray-600 flex flex-col items-center p-2 rounded transition duration-300 transform hover:scale-110 relative group z-10"
            >
                <Image src="/icons/shopping-cart.png" alt="Кошик" width={24} height={24} />
                {totalQuantity !== undefined && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center translate-x-2 -translate-y-2">
                        {totalQuantity}
                    </span>
                )}
                {hint &&
                    <span className="absolute top-full mt-2 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg">
                        Кошик
                    </span>
                }
            </button>

            <CartOverlay cart={cart?.data} isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
