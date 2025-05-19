import { paths } from "./openapi";

export type OrderResponse = paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]
export type OrderWithItemsResponse = Extract<
    paths["/api/v1/orders"]["get"]["responses"]["200"]["content"]["application/json"]["data"],
    Array<unknown>
>
export type Order = OrderWithItemsResponse[number];
export type OrderItem = Order["items"][number];
export type Product = OrderItem["product"];