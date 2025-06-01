'use client'

import { useState } from "react";
import { useCartStore } from "@/store/cart.store";
import Image from "next/image";
import Link from "next/link";
import ProductCharacteristics from "../../admin/components/orders/productCharacteristics";
import { ReadCartItemSchema } from "@/api/types/types";

export default function CartItem({ item }: { item: ReadCartItemSchema }) {
    const hasDiscount = item.product.discount_percentage > 0;
    const [updateLoading, setUpdateLoading] = useState(false);
    const [removeLoading, setRemoveLoading] = useState(false);

    const { changeQuantity, removeFromCart } = useCartStore();

    const handleChange = async (action: "increment" | "decrement") => {
        setUpdateLoading(true);
        try {
            await changeQuantity(item.id, action);
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleRemove = async () => {
        setRemoveLoading(true);
        try {
            await removeFromCart(item.id);
        } finally {
            setRemoveLoading(false);
        }
    };

    return (
        <div className="relative p-4 bg-white border-b">
            {hasDiscount && (
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                    -{item.product.discount_percentage}%
                </div>
            )}

            <div className="flex gap-4">
                <div className="relative w-16 h-16 flex-shrink-0">
                    {item.product.preview ? (
                        <Image
                            src={`${process.env.NEXT_PUBLIC_SUPABASE_IMAGES}uploads/${item.product.slug}/${item.product.preview.filename}`}
                            alt={item.product.preview.alt || ""}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-lg text-gray-400 text-xs">
                            No Image
                        </div>
                    )}
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start">
                        <Link
                            href={`/products/${item.product.slug}`}
                            className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2 pr-2">
                            {item.product.name}
                        </Link>
                        <button
                            onClick={handleRemove}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
                            disabled={removeLoading}
                            aria-label="Remove item"
                        >
                            {removeLoading ? (
                                <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M5 5L19 19M5 19L19 5" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <ProductCharacteristics product={item.product} />
                    <div className="flex justify-between items-center mt-auto">
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center rounded-md border border-gray-200 bg-white overflow-hidden">
                                <button
                                    onClick={() => handleChange("decrement")}
                                    className="px-3 py-1 text-gray-600 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors text-lg"
                                    disabled={updateLoading || item.quantity <= 1}
                                >
                                    −
                                </button>
                                <span className="px-3 py-1 text-gray-900 font-medium text-md min-w-[32px] text-center">
                                    {updateLoading ? (
                                        <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" />
                                    ) : (
                                        item.quantity
                                    )}
                                </span>
                                <button
                                    onClick={() => handleChange("increment")}
                                    className="px-3 py-1 text-gray-600 hover:text-green-600 hover:bg-green-50 disabled:opacity-40 transition-colors text-lg"
                                    disabled={updateLoading}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col lg:flex-row items-baseline gap-0 lg:gap-2 mt-1.5">
                            <span className={`text-sm sm:text-base font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                                {item.total_price.toFixed(2)} ₴
                            </span>
                            {hasDiscount && (
                                <span className="text-gray-400 line-through text-xs font-medium">
                                    {(item.product.price * item.quantity).toFixed(2)} ₴
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
