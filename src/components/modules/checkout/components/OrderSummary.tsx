/* eslint-disable react-hooks/exhaustive-deps */
import CartItemList from "../../cart/components/CartItemList";
import SectionContainer from "./SectionContainer";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OrderSummary({ isSubmitting }: { isSubmitting: any }) {
    const router = useRouter();
    const { isInitialized } = useAuthStore();
    const { cart, loading, fetchCart } = useCartStore();

    const handleGoHome = () => {
        router.push("/");
    };

    useEffect(() => {
        if (isInitialized) {
            fetchCart();
        }
    }, [isInitialized, fetchCart]);

    useEffect(() => {
        if (!loading && isInitialized && cart) {
            const items = cart?.data?.items ?? [];
            const total = cart?.data?.total_price ?? 0;
            if (items.length === 0 || total === 0) {
                handleGoHome();
            }
        }
    }, [loading, isInitialized, cart, router]);



    return (
        <SectionContainer className="p-0 sm:p-0 border-white">

            <>
                <h2 className="text-2xl font-bold py-4 text-center text-gray-900 border-b">Ваше замовлення</h2>
                <CartItemList cart={cart?.data ?? null} />
                <div className="space-y-5 mx-4 my-4">
                    <div className="flex justify-between text-xl font-bold pt-2">
                        <span className="text-gray-900">Всього:</span>
                        <span className="text-gray-900">₴{cart?.data?.total_price || 0}</span>
                    </div>
                    <div>
                        <button
                            className="w-full py-3 my-3 bg-gray-900 text-white rounded-lg mt-4 hover:bg-gray-800 
                                  transition-colors font-semibold text-base shadow-sm hover:shadow-md"
                            disabled={isSubmitting}
                            type="submit"
                        >
                            {isSubmitting ? "Обробка..." : "Підтвердити замовлення"}
                        </button>
                        <button
                            onClick={handleGoHome}
                            className="w-full py-3 border border-gray-300 rounded-lg 
                                  transition-colors font-semibold text-base shadow-sm hover:bg-gray-100"
                            type="button"
                        >
                            Повернутися на головну
                        </button>
                    </div>
                </div>
            </>

        </SectionContainer>
    )
}