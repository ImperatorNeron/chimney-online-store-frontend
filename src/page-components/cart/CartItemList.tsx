import CartItem from "./CartItem";

export default function CartItemList({ cart, updateCartItem, removeCartItem, updateLoading, removeLoading }: CartItemListProps) {
    return (
        <div className="lg:col-span-2 space-y-4">
            {cart.items
                .slice()
                .sort((a: any, b: any) => a.id - b.id)
                .map((item: any) => (
                    <CartItem
                        key={item.id}
                        item={item}
                        removeCartItem={removeCartItem}
                        updateCartItem={updateCartItem}
                        updateLoading={updateLoading}
                        removeLoading={removeLoading}
                    />
                ))}
        </div>
    );
}
