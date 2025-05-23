import { components, paths } from "./openapi";

// ORDERS
export type OrderResponse = paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadOrderResponseData = paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"]
export type OrderWithItemsResponse = Extract<
    paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"],
    Array<unknown>
>
export type Order = OrderWithItemsResponse[number];
export type OrderItem = Order["items"][number];
export type Product = OrderItem["product"];


// CATEGORIES
export type ReadCategories = paths["/api/v1/categories"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadCategoriesData = paths["/api/v1/categories"]["get"]["responses"]["200"]["content"]["application/json"]["data"]

// PRODUCTS
export type ReadUniqueResponseData = paths["/api/v1/products/unique"]["get"]["responses"]["200"]["content"]["application/json"]["data"];
export type ReadProductByIdsResponse = paths["/api/v1/products/by-ids"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadUniqueResponse = paths["/api/v1/products/unique"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadVariationResponse = paths["/api/v1/products/unique/{unique_product_id}/variation"]["get"]["responses"]["200"]["content"]["application/json"]
export type ReadProductResponse = paths["/api/v1/products/"]["post"]["responses"]["200"]["content"]["application/json"]
export type ReadProduct = ReadProductResponse extends Record<string, never> ? never : NonNullable<ReadProductResponse["data"]>;
export type ReadImages = ReadProduct["images"]
export type ReadVariations = ReadProduct["variations"]