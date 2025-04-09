import CartItem from "./CartItem";

export default function CartItemList({ cart }: { cart: CartData | null }) {
    return (
        <div>
            {cart?.items
                .slice()
                .sort((a: any, b: any) => a.id - b.id)
                .map((item: any) => (
                    <CartItem
                        key={item.id}
                        item={item}
                    />
                ))}
        </div>
    );
}
