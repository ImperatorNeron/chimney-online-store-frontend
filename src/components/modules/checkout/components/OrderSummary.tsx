import LoadingSkeleton from "./LoadingSkeleton";
import CartItemList from "../../cart/components/CartItemList";
import useCart from "@/components/modules/cart/hooks/useCart";
import SectionContainer from "./SectionContainer";

export default function OrderSummary() {

    const { cart, isLoading, isError } = useCart();

    return (
        <SectionContainer className="p-0 sm:p-0 border-white">
            {isLoading ? (
                <LoadingSkeleton count={2} />
            ) : (
                <>
                    <h2 className="text-2xl font-bold py-4 text-center text-gray-900 border-b">Ваше замовлення</h2>
                    <CartItemList cart={cart?.data} />
                    <div className="space-y-5 mx-4 my-4">
                        <div className="flex justify-between text-xl font-bold pt-2">
                            <span className="text-gray-900">Всього:</span>
                            <span className="text-gray-900">₴{cart?.data.total_price}</span>
                        </div>
                        <button
                            className="w-full py-3 my-3 bg-gray-900 text-white rounded-lg mt-4 hover:bg-gray-800 
                                  transition-colors font-semibold text-base shadow-sm hover:shadow-md"
                        >
                            Підтвердити замовлення
                        </button>
                    </div>
                </>
            )}
        </SectionContainer>
    )
}