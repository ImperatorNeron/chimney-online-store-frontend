import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { paths } from "../types/openapi";

type ReadMessages = paths["/api/v1/messages/"]["get"]["responses"]["200"]["content"]["application/json"]

class MessageService {
    private endpoint = endpoints.messages;

    async createMessage(message: CreateMessageSchema) {
        const response = await http.post<ApiResponseOne<ReadMessageSchema>>(this.endpoint, message);
        return response.data;
    };

    async getMessages(token: string, limit: number = 20, offset: number = 0) {
        const url = `${this.endpoint}/?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
        const response = await http.get<ReadMessages>(url, token)
        return response.data
    }

    async deleteMessage(token: string, messageId: number){
        const url = `${this.endpoint}/${messageId}`
        await http.delete(url, token)
    }
}

export const messageService = new MessageService();