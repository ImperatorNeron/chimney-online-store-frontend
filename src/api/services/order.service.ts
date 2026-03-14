import { http } from '@/api/http';
import { endpoints } from '../endpoints';
import { Update_AReadOrderBaseSchema, CreateOrderSchema, ALReadExtendedOrderSchema, Create_AReadOrderBaseSchema, AlistReadExtendedOrderSchema, UpdateOrderSchema } from '../types/types';


export class OrderService {
    private endpoint = endpoints.orders;

    async createOrder(order: CreateOrderSchema, token?: string) {
        const response = await http.post<Create_AReadOrderBaseSchema>(this.endpoint, order, token);
        return response.data;
    }

    async getUserHistory(token: string) {
        const url = `${this.endpoint}/history`;
        const response = await http.get<AlistReadExtendedOrderSchema>(url, token);
        return response.data;
    }

    async getUserOrders(token: string) {
        const url = `${this.endpoint}/active`;
        const response = await http.get<AlistReadExtendedOrderSchema>(url, token);
        return response.data;
    }

    async getOrders(token: string, limit: number = 20, offset: number = 0) {
        const url = `${this.endpoint}?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
        const response = await http.get<ALReadExtendedOrderSchema>(url, token);
        return response.data;
    }

    async updateOrderInfo(token: string, updateOrder: UpdateOrderSchema, orderId: number) {
        const url = `${this.endpoint}/${encodeURIComponent(orderId)}`;
        const response = await http.patch<Update_AReadOrderBaseSchema>(url, updateOrder, token);
        return response.data
    }

}

export const orderService = new OrderService();
