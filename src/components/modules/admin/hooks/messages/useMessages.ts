import { messageService } from "@/api/services/message.service";
import useFetchData from "../common/useFetchData";
import { LReadMessageSchema } from "@/api/types/types";


export default function useFetchMessages(
    limit: number = 20,
    offset: number = 0,
    params?: {
        text?: string;
        status?: string;
        field?: string;
        ordering?: string;
    },) {
    const { data: messages, ...rest } = useFetchData<LReadMessageSchema>(
        (token) => messageService.getMessages(token, limit, offset, params),
        [limit, offset, params]
    );

    return { messages, ...rest };
}