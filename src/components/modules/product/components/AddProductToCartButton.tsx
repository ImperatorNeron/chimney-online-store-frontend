'use client';
import { NotificationService } from "@/services/notification.service";
import { useCartStore } from "@/store/cart.store";
import { useState } from "react";

export default function AddProductToCartButton({ productId }: { productId: number }) {
    const [addLoading, setAddLoading] = useState(false);
    const { addToCart } = useCartStore();

    const handleAdd = async () => {
        setAddLoading(true);
        try {
            await addToCart(productId);
        } finally {
            setAddLoading(false);
            NotificationService.success("Товар успішно додано в корзину!")
        }
    };

    return (
        <button
            className="flex-1 border-2 border-gray-900 text-sm xs:text-base py-2.5 rounded-lg font-medium hover:bg-gray-50 transition"
            onClick={handleAdd}
            disabled={addLoading}
        >
            {addLoading ? (
                <div className="h-6 w-6 mx-auto border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : ("Додати в кошик")}
        </button>
    );
};