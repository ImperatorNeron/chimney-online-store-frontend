import { paths } from "./openapi";

// ТИПИ ДЛЯ ВІДПОВІДЕЙ (responses)
type Res<T, Status extends number = 200> = T extends { responses: { [K in Status]: { content: { "application/json": infer R } } } } ? R : never;

// ТИПИ ДЛЯ ЗАПИТІВ (requestBody)
type Req<T> = T extends { requestBody: { content: { "application/json": infer R } } } ? R : never;

// ORDERS
export type ALReadExtendedOrderSchema = Res<paths["/api/v1/orders"]["get"]>;
export type LReadExtendedOrderSchema = ALReadExtendedOrderSchema["data"];
export type ReadExtendedOrderSchema = NonNullable<LReadExtendedOrderSchema>["items"][number];
export type ReadOrderItemSchema = ReadExtendedOrderSchema["items"][number];
export type ReadProductSchema = ReadOrderItemSchema["product"];
export type UpdateOrderSchema = Req<paths["/api/v1/orders/{order_id}"]["patch"]>;
export type Update_AReadOrderBaseSchema = Res<paths["/api/v1/orders/{order_id}"]["patch"]>;
export type CreateOrderSchema = Req<paths["/api/v1/orders"]["post"]>;
export type Create_AReadOrderBaseSchema = Update_AReadOrderBaseSchema;
export type AlistReadExtendedOrderSchema = Res<paths["/api/v1/orders/history"]["get"]>;
export type listReadExtendedOrderSchemaData = AlistReadExtendedOrderSchema["data"];

// PAGINATION
export type PaginationIn = paths["/api/v1/orders"]["get"]["parameters"]["query"];

// CATEGORIES
export type AlistReadCategorySchema = Res<paths["/api/v1/categories"]["get"]>;
export type listReadCategorySchema = Res<paths["/api/v1/categories"]["get"]>["data"];
// TODO: add schema to backend
export type ReadCategoriesBySlug = Res<paths["/api/v1/categories/by-slugs"]["get"]>;

// PRODUCTS
export type ALReadFullUniqueProductSchema = Res<paths["/api/v1/products/unique"]["get"]>;
export type LReadFullUniqueProductSchema = ALReadFullUniqueProductSchema["data"];
export type AlistReadPreviewProductSchema = Res<paths["/api/v1/products/by-ids"]["get"]>;
export type Get_AReadAbsoluteProductSchema = Res<paths["/api/v1/products/{product_slug}"]["get"]>;
export type Get_ReadAbsoluteProductSchema = NonNullable<Get_AReadAbsoluteProductSchema>["data"];
export type ReadProductVariationSchema = NonNullable<Get_ReadAbsoluteProductSchema>["variations"][number];
export type Create_AReadAbsoluteProductSchema = Get_AReadAbsoluteProductSchema;
export type Create_ReadAbsoluteProductSchema = Create_AReadAbsoluteProductSchema["data"];
export type listReadProductImageSchema = NonNullable<Create_ReadAbsoluteProductSchema>["images"];
export type listReadProductVariationSchema = NonNullable<Create_ReadAbsoluteProductSchema>["variations"];
export type AReadFiltersSchema = Res<paths["/api/v1/products/filters"]["get"]>;
export type ProductFiltersSchema = paths["/api/v1/products"]["get"]["parameters"]["query"];

export type ALReadPreviewProductSchema = Res<paths["/api/v1/products"]["get"]>;
export type LReadPreviewProductSchema = NonNullable<ALReadPreviewProductSchema>["data"];
export type ReadPreviewProductSchema = NonNullable<LReadPreviewProductSchema>["items"][number];

// FAQS
export type AlistReadFAQSchema = Res<paths["/api/v1/faq"]["get"]>;
export type ReadFAQSSchema = Res<paths["/api/v1/faq/{faq_id}"]["get"]>["data"]

// AUTH
export type TokenInfoSchema = Res<paths["/api/v1/auth/login"]["post"]>;
export type LoginUserSchema = Req<paths["/api/v1/auth/login"]["post"]>;
export type AReadUserSchema = Res<paths["/api/v1/auth/register"]["post"]>;
export type RegisterUserSchema = Req<paths["/api/v1/auth/register"]["post"]>;

// USERS
export type ReadUserSchema = Res<paths["/api/v1/users/me"]["get"]>;
export type UserUpdateWithPasswordSchema = Req<paths["/api/v1/users/me/update"]["patch"]>;

// CARTS
export type AReadFullCartSchema = Res<paths["/api/v1/cart"]["get"]>;
export type AReadCartItemSchema = Res<paths["/api/v1/cart"]["post"]>;
export type ReadFullCartSchema = AReadFullCartSchema["data"];
export type ReadCartItemWithTotalPriceSchema = NonNullable<ReadFullCartSchema>["items"][number];

// LIKES
export type CreateLikeSchema = paths["/api/v1/like"]["post"]["parameters"]["query"];
export type AReadLikeSchema = Res<paths["/api/v1/like"]["post"]>;
// TODO: add res model to backend
export type ReadLikedProductIdsSchema = Res<paths["/api/v1/like"]["get"]>;

// MESSAGES
export type ALReadMessageSchema = Res<paths["/api/v1/messages/"]["get"]>;
export type LReadMessageSchema = ALReadMessageSchema["data"];
export type ReadMessage = NonNullable<LReadMessageSchema>["items"][number];
export type CreateMessageSchema = Req<paths["/api/v1/messages/"]["post"]>;
export type AReadMessageSchema = Res<paths["/api/v1/messages/"]["post"]>;
export type ChangeMessageStatusSchema = Req<paths["/api/v1/messages/change-status/{message_id}"]["patch"]>;