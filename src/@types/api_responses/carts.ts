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

interface CartApiResponse {
    data: CartData;
    meta: Record<string, unknown>;
    errors: Array<{
        code: string;
        message: string;
        meta: Record<string, unknown>;
    }>;
}