import { messageService } from "@/api/services/message.service";
import { paths } from '@/api/types/openapi';
import useFetchData from "../common/useFetchData";

type ReadMessages = paths["/api/v1/messages/"]["get"]["responses"]["200"]["content"]["application/json"]["data"]

export default function useFetchMessages(limit: number = 20, offset: number = 0) {
    const { data: messages, ...rest } = useFetchData<ReadMessages>(
        (token) => messageService.getMessages(token, limit, offset),
        [limit, offset]
    );

    return { messages, ...rest };
}