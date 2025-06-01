import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { CreateMessageSchema, ReadCreatedMessageSchema, ReadMessages } from "../types/types";

class MessageService {
    private endpoint = endpoints.messages;

    async createMessage(message: CreateMessageSchema) {
        const response = await http.post<ReadCreatedMessageSchema>(this.endpoint, message);
        return response.data;
    };

    async getMessages(token: string, limit: number = 20, offset: number = 0) {
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}?limit=${encodeURIComponent(limit)}&offset=${encodeURIComponent(offset)}`
        const response = await http.get<ReadMessages>(url, token)
        return response.data
    }

    async deleteMessage(token: string, messageId: number) {
        const url = `${this.endpoint}${messageId}`
        await http.delete<null>(url, token)
    }
}

export const messageService = new MessageService();