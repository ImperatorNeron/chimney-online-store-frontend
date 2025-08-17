import { paths } from "./openapi";

// ORDERS
export type OrderResponse = paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadOrderResponseData = paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"]
export type ReadOrder = paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]
export type OrderWithItemsResponse = ReadOrderResponseData extends Record<string, never> ? never : NonNullable<ReadOrder["data"]>;
export type Order = OrderWithItemsResponse["items"][number];
export type OrderItem = Order["items"][number];
export type Product = OrderItem["product"];
export type UpdateOrderInfoRequest = paths["/api/v1/orders/{order_id}"]["patch"]["requestBody"]["content"]["application/json"]
export type BaseOrderResponse = paths["/api/v1/orders/{order_id}"]["patch"]["responses"]["200"]["content"]["application/json"]
export type CreateOrder = paths["/api/v1/orders"]["post"]["requestBody"]["content"]["application/json"]
export type ReadCreatedOrder = paths["/api/v1/orders"]["post"]["responses"]["200"]["content"]["application/json"]
export type ReadExtendedOrder = paths["/api/v1/orders/history"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadExtendedOrderDataSchema = paths["/api/v1/orders/history"]["get"]["responses"]["200"]["content"]["application/json"]["data"]

// PAGINATION
export type PaginationIn = paths["/api/v1/orders"]["get"]["parameters"]["query"]

// CATEGORIES
export type ReadCategories = paths["/api/v1/categories"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadCategoriesData = paths["/api/v1/categories"]["get"]["responses"]["200"]["content"]["application/json"]["data"]
export type ReadCategoriesBySlug = paths["/api/v1/categories/by-slugs"]["get"]["responses"]["200"]["content"]["application/json"]

// PRODUCTS
export type ReadUniqueResponseData = paths["/api/v1/products/unique"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
export type ReadProductByIdsResponse = paths["/api/v1/products/by-ids"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadUniqueResponse = paths["/api/v1/products/unique"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadVariationResponse = paths["/api/v1/products/{product_slug}"]["get"]["responses"]["200"]["content"]["application/json"]
export type ThroughtVariationSchema = ReadVariationResponse["data"] extends Record<string, never> ? never : NonNullable<ReadVariationResponse["data"]>;
export type ReadVariationSchema = ThroughtVariationSchema["variations"][number];
export type ReadProductResponse = paths["/api/v1/products"]["post"]["responses"]["200"]["content"]["application/json"]
export type ReadDataProductResponse = paths["/api/v1/products"]["post"]["responses"]["200"]["content"]["application/json"]["data"]
export type ReadProduct = ReadProductResponse extends Record<string, never> ? never : NonNullable<ReadProductResponse["data"]>;
export type ReadImages = ReadProduct["images"]
export type ReadVariations = ReadProduct["variations"]
export type CatalogFiltersSchema = paths["/api/v1/products/filters"]["get"]["responses"]["200"]["content"]["application/json"]
export type ProductFiltersSchema = paths["/api/v1/products"]["get"]["parameters"]["query"]
export type FullProductsSchema = paths["/api/v1/products"]["get"]["responses"]["200"]["content"]["application/json"]
export type ThroughtProductSchema = FullProductsSchema["data"] extends Record<string, never> ? never : NonNullable<FullProductsSchema["data"]>;
export type ProductSchema = ThroughtProductSchema["items"][number]

// FAQS
export type ReadFAQSResponseData = paths["/api/v1/faq"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadFAQSSchema = { youtube_url?: string | null; question: string; answer: string; id: number; embed_url?: string | null; }


// AUTH
export type TokenInfoSchema = paths["/api/v1/auth/login"]["post"]["responses"]["200"]["content"]["application/json"]
export type LoginSchema = paths["/api/v1/auth/login"]["post"]["requestBody"]["content"]["application/json"]
export type ReadUserDataSchema = paths["/api/v1/auth/register"]["post"]["responses"]["200"]["content"]["application/json"]
export type CreateUserDataSchema = paths["/api/v1/auth/register"]["post"]["requestBody"]["content"]["application/json"]

// USERS
export type UserSchema = paths["/api/v1/users/me"]["get"]["responses"]["200"]["content"]["application/json"]
export type UpdateUserSchema = paths["/api/v1/users/me/update"]["patch"]["requestBody"]["content"]["application/json"]

// CARTS
export type ReadCartSchema = paths["/api/v1/cart"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadPostPatchCartSchema = paths["/api/v1/cart"]["post"]["responses"]["200"]["content"]["application/json"]
export type ReadFullCartSchema = ReadCartSchema["data"]
export type ThroughtCartSchema = ReadFullCartSchema extends Record<string, never> ? never : NonNullable<ReadFullCartSchema>;
export type ReadCartItemSchema = ThroughtCartSchema["items"][number]

// LIKES
export type CreateLikeRequest = paths["/api/v1/like"]["post"]["parameters"]["query"]
export type CreateLikeResponse = paths["/api/v1/like"]["post"]["responses"]["200"]["content"]["application/json"]
export type ReadLikedProductIds = paths["/api/v1/like"]["get"]["responses"]["200"]["content"]["application/json"]

// MESSAGES
export type ReadMessages = paths["/api/v1/messages/"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadDataMessages = ReadMessages["data"]
export type ThroughtMessagesSchema = ReadDataMessages extends Record<string, never> ? never : NonNullable<ReadDataMessages>;
export type ReadMessage = ThroughtMessagesSchema["items"][number]
export type CreateMessageSchema = paths["/api/v1/messages/"]["post"]["requestBody"]["content"]["application/json"]
export type ReadCreatedMessageSchema = paths["/api/v1/messages/"]["post"]["responses"]["200"]["content"]["application/json"]
export type ChangeMessageStatusSchema = paths["/api/v1/messages/change-status/{message_id}"]["patch"]["requestBody"]["content"]["application/json"]
