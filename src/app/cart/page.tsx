'use client';

import useFetchCart from '@/hooks/cart/useFetchCart';
import useUpdateCartItem from '@/hooks/cart/useUpdateCartItem';
import useRemoveCartItem from '@/hooks/cart/useRemoveCartItem';
import LoadingCart from '@/page-components/cart/LoadingCart';
import EmptyCart from '@/page-components/cart/EmptyCart';
import CartItemList from '@/page-components/cart/CartItemList';
import OrderSummary from '@/page-components/cart/OrderSummary';

export default function CartPage() {
    const { cart, loading, error, fetchCart } = useFetchCart();
    const { updateCartItem, localLoading: updateLoading } = useUpdateCartItem(fetchCart);
    const { removeCartItem, localLoading: removeLoading } = useRemoveCartItem(fetchCart);

    if (loading) return <LoadingCart />;
    if (!cart?.items.length) return <EmptyCart />;

    return (
        <div className="max-w-7xl mx-auto py-8">
            <h1 className="text-4xl font-bold mb-12 text-black text-center">КОШИК</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <CartItemList
                    cart={cart}
                    updateCartItem={updateCartItem}
                    removeCartItem={removeCartItem}
                    updateLoading={updateLoading}
                    removeLoading={removeLoading}
                />
                <OrderSummary totalQuantity={cart.total_quantity} totalPrice={cart.total_price} />
            </div>
        </div>
    );
}
