'use client';
import { NotificationService } from "@/api/services/notification.service";
import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function OrderActions({ productId, productName }: { productId: number; productName: string }) {
    const [loading, setLoading] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCartStore();
    const router = useRouter();

    const handleQuantityChange = (value: string) => {
        if (value.includes('.') || isNaN(Number(value))) return;
        let numValue = Math.max(1, parseInt(value) || 1);
        if (numValue > 100) numValue = 100;
        setQuantity(numValue);
    };

    const add = async (redirect: boolean) => {
        if (quantity < 1 || quantity > 100) {
            NotificationService.error("Перевищено ліміт додавання в корзину!");
            return;
        }
        setLoading(true);
        try {
            await addToCart(productId, quantity);
            if (redirect) {
                router.push('/checkout');
            } else {
                NotificationService.success("Товар успішно додано в корзину!");
                setLoading(false);
            }
        } catch {
            setLoading(false);
        }
    };

    return (
        <>
            <button
                className="px-14 bg-gray-900 text-sm xs:text-base text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
                onClick={() => add(true)}
                disabled={loading}
                aria-label={`Замовити ${productName}`}
            >
                Замовити
            </button>

            <div className="flex gap-2 flex-1">
                <div className="flex items-center border-2 border-gray-900 rounded-lg">
                    <button
                        className="px-3 py-2.5 hover:bg-gray-50 disabled:opacity-50 rounded-lg"
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                        disabled={quantity === 1 || loading}
                    >
                        -
                    </button>
                    <input
                        type="text"
                        inputMode="numeric"
                        className="w-12 text-center outline-none bg-transparent"
                        value={quantity}
                        min={1}
                        max={100}
                        onChange={(e) => handleQuantityChange(e.target.value)}
                        onBlur={() => setQuantity(q => q < 1 ? 1 : q)}
                        onKeyDown={(e) => ['e', 'E', '.', '-'].includes(e.key) && e.preventDefault()}
                        disabled={loading}
                    />
                    <button
                        className="px-3 py-2.5 hover:bg-gray-50 disabled:opacity-50 rounded-lg"
                        onClick={() => setQuantity(q => q + 1)}
                        disabled={loading}
                    >
                        +
                    </button>
                </div>

                <button
                    className="flex-1 border-2 border-gray-900 text-sm xs:text-base py-2.5 rounded-lg font-medium hover:bg-gray-50 transition disabled:opacity-50"
                    onClick={() => add(false)}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                    ) : "Додати в кошик"}
                </button>
            </div>
        </>
    );
}
