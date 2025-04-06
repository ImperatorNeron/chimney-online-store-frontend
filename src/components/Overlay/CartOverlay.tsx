'use client'

import Overlay from "./Overlay";
import MenuHeader from "../Header/components/mobile/MenuHeader";
import OrderSummary from "@/page-components/cart/OrderSummary";
import EmptyCart from "@/page-components/cart/EmptyCart";
import CartItemList from "@/page-components/cart/CartItemList";

export default function CartOverlay({ cart, isOpen, onClose }: {
    cart: CartData;
    isOpen: boolean;
    onClose: () => void;
}) {

    return (
        <Overlay isOpen={isOpen} onClose={onClose} className="w-full">
            <MenuHeader onClose={onClose} title={"Корзина"} />
            {
                cart?.items.length ? (
                    <div className="flex flex-col gap-12 py-5 px-4 sm:px-8 ">
                        <CartItemList cart={cart} />
                        {cart && <OrderSummary onClose={onClose} totalQuantity={cart.total_quantity} totalPrice={cart.total_price} />}
                    </div>
                ) : (
                    <EmptyCart onClose={onClose} />
                )
            }
        </Overlay>
    )
}