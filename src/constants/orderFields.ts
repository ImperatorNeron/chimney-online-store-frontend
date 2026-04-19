export type MessageSortField = "user_name" | "phone_number" | "created_at" | "message" | "status";
export type OrderSortField =
    | "id"
    | "created_at"
    | "last_name"
    | "first_name"
    | "patronymic"
    | "phone_number"
    | "email"
    | "status"
    | "shipping_method"
    | "payment_method"
    | "price_discount"
    | "is_paid";
export type ProductSortField = "name" | "slug" | "category_id" | "created_at";
export type VariationSortField = "price" | "discount_percentage" | "diameter" | "length" | "thickness" | "angle" | "metal_type";
export type SortOrdering = "asc" | "desc";
