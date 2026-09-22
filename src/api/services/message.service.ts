import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { ChangeMessageStatusSchema, CreateMessageSchema, AReadMessageSchema, ALReadMessageSchema } from "../types/types";

export type MessageStatus = 'new' | 'progress' | 'read';

class MessageService {
    private endpoint = endpoints.messages;

    async createMessage(message: CreateMessageSchema) {
        const response = await http.post<AReadMessageSchema>(this.endpoint, message);
        return response.data;
    };

    async getMessages(
        token: string,
        limit: number = 20,
        offset: number = 0,
        params?: {
            text?: string;
            status?: string;
            field?: string;
            ordering?: string;
            date_from?: string;
            date_to?: string;
        },
    ) {
        const query = new URLSearchParams({
            limit: String(limit),
            offset: String(offset),
        });
        if (params?.text) {
            query.append("text", params.text);
        }
        if (params?.status) {
            query.append("status", params.status);
        }
        if (params?.field && params?.ordering) {
            query.append("field", params.field);
            query.append("ordering", params.ordering);
        }
        if (params?.date_from) query.append("date_from", params.date_from);
        if (params?.date_to) query.append("date_to", params.date_to);
        const url = `${this.endpoint}?${query.toString()}`
        const response = await http.get<ALReadMessageSchema>(url, token)
        return response.data
    }

    async deleteMessage(token: string, messageId: number) {
        const url = `${this.endpoint}${messageId}`
        await http.delete<null>(url, token)
    }

    async changeMessageStatus(token: string, messageId: number, messageIn: ChangeMessageStatusSchema) {
        console.log(token, messageId, messageIn)
        const url = `${this.endpoint}change-status/${messageId}`
        const response = await http.patch<AReadMessageSchema>(url, messageIn, token)
        return response.data
    }
}

export const messageService = new MessageService();