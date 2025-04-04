interface CartItem {
    id: number;
    quantity: number;
    product: Product;
    total_price: number;
}

interface CartData {
    id: number;
    items: CartItem[];
    total_price: number;
    total_quantity: number;
}