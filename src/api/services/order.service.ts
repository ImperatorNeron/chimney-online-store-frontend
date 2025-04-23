import { http } from '@/api/http';
import { endpoints } from '../endpoints';

export class OrderService {
    private endpoint = endpoints.orders;

    async createOrder(order: CreateOrderSchema, token?: string): Promise<ReadOrderBaseSchema> {
        const response = await http.post<{ data: ReadOrderBaseSchema }>(this.endpoint, order, token);
        return response.data;
    }
}

export const orderService = new OrderService();
