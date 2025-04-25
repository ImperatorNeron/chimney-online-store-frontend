import { endpoints } from "../endpoints";
import { http } from '@/api/http';

class MessageService {
    private endpoint = endpoints.messages;

    async createMessage(message: CreateMessageSchema) {
        const response = await http.post<ApiResponseOne<ReadMessageSchema>>(this.endpoint, message);
        return response.data;
    };
}

export const messageService = new MessageService();