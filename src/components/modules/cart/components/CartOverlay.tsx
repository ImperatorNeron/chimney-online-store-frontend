'use client'

import EmptyCart from "@/components/modules/cart/components/EmptyCart";
import CartItemList from "@/components/modules/cart/components/CartItemList";
import Overlay from "@/components/ui/Overlay";
import OverlayHeader from "@/components/shared/OverlayHeader";
import { ReadFullCartSchema } from "@/api/types/types";
import OrderSummary from "./OrderSummary";

export default function CartOverlay({ cart, isOpen, onClose }: {
    cart?: ReadFullCartSchema;
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Overlay isOpen={isOpen} onClose={onClose} className="w-full sm:w-4/6">
            <OverlayHeader onClose={onClose} title={"Корзина"} />
            {
                cart?.items.length ? (
                    <div className="flex flex-col gap-12 py-5 px-4 sm:px-8 ">
                        <CartItemList cart={cart} />
                        {cart && <OrderSummary onClose={onClose} totalQuantity={cart.total_quantity} totalPrice={cart.total_price} />}
                    </div>
                ) : (
                    <div className="flex flex-col h-[calc(100%-55px)] justify-center">
                        <EmptyCart onClose={onClose} />
                    </div>
                )
            }
        </Overlay>
    )
}