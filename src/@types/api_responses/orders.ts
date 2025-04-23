interface OrderItemFields {
    order_id: number;
    quantity: number;
    price_at_order: number;
}

interface ReadOrderItemSchema extends OrderItemFields {
    id: number;
    product: Product;
}

interface ReadOrderItemBaseSchema extends OrderItemFields {
    id: number;
    product_id: number;
}

interface CreateOrderItemSchema extends OrderItemFields {
    product_id: number;
}

interface UserIdField {
    user_id?: number;
}

interface OrderFields {
    first_name?: string;
    last_name?: string;
    patronymic?: string;
    phone_number?: string;
    email?: string;
    address: string;
    shipping_method: 'nova_poshta' | 'ukrposhta' | 'courier';
    payment_method: 'cash' | 'card' | 'online';
}

interface BaseOrderSchema extends OrderFields {
    id: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    created_at: string;
    updated_at: string;
    price_discount: number;
}

type ReadOrderBaseSchema = BaseOrderSchema;

interface ReadOrderSchema extends BaseOrderSchema {
    items: ReadOrderItemSchema[];
}

interface ReadExtendedOrderSchema extends ReadOrderSchema {
    total_price: number;
    total_quantity: number;
}

type CreateOrderSchema = OrderFields;

interface CreateOrderWithUserSchema extends OrderFields, UserIdField { }
