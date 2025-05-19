import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { paths } from '../types/openapi';
import { OrderResponse } from '../types/types';

type UpdateOrderInfoRequest = paths["/api/v1/orders/{order_id}"]["patch"]["requestBody"]["content"]["application/json"]
type UpdateDiscountRequest = paths["/api/v1/orders/set-discount/{order_id}"]["patch"]["requestBody"]["content"]["application/json"]
type BaseOrderResponse = paths["/api/v1/orders/{order_id}"]["patch"]["responses"]["200"]["content"]["application/json"]

export class OrderService {
    private endpoint = endpoints.orders;

    async createOrder(order: CreateOrderSchema, token?: string) {
        const response = await http.post<ApiResponseOne<ReadOrderBaseSchema>>(this.endpoint, order, token);
        return response.data;
    }

    async getUserHistory(token: string) {
        const url = `${this.endpoint}/history`;
        const response = await http.get<ApiResponseList<ReadExtendedOrderSchema>>(url, token);
        return response.data;
    }

    async getUserOrders(token: string) {
        const url = `${this.endpoint}/active`;
        const response = await http.get<ApiResponseList<ReadExtendedOrderSchema>>(url, token);
        return response.data;
    }

    async getOrders(token: string) {
        const response = await http.get<OrderResponse>(this.endpoint, token);
        return response.data;
    }

    async updateOrderInfo(token: string, updateOrder: UpdateOrderInfoRequest, orderId: number) {
        const url = `${this.endpoint}/${encodeURIComponent(orderId)}`;
        const response = await http.patch<BaseOrderResponse>(url, updateOrder, token);
        return response.data
    }

    async updateOrderDiscount(token: string, orderId: number, updateDiscount: UpdateDiscountRequest) {
        const url = `${this.endpoint}/set-discount/${encodeURIComponent(orderId)}`;
        const response = await http.patch<BaseOrderResponse>(url, updateDiscount, token);
        return response.data
    }
}

export const orderService = new OrderService();
