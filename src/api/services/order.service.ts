import { http } from '@/api/http';
import { endpoints } from '../endpoints';

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
}

export const orderService = new OrderService();
