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

    async getOrders(
        token: string,
        limit: number = 20,
        offset: number = 0,
        params?: {
            text?: string;
            field?: string;
            ordering?: string;
            status?: string;
            shipping_method?: string;
            payment_method?: string;
            date_from?: string;
            date_to?: string;
        },
    ) {
        const query = new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
        });
        if (params?.text) query.append("text", params.text);
        if (params?.field && params?.ordering) {
            query.append("field", params.field);
            query.append("ordering", params.ordering);
        }
        if (params?.status) query.append("status", params.status);
        if (params?.shipping_method) query.append("shipping_method", params.shipping_method);
        if (params?.payment_method) query.append("payment_method", params.payment_method);
        if (params?.date_from) query.append("date_from", params.date_from);
        if (params?.date_to) query.append("date_to", params.date_to);
        const url = `${this.endpoint}?${query.toString()}`;
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
