import { messageService } from "@/api/services/message.service";
import useFetchData from "../common/useFetchData";
import { ReadDataMessages } from "@/api/types/types";


export default function useFetchMessages(limit: number = 20, offset: number = 0) {
    const { data: messages, ...rest } = useFetchData<ReadDataMessages>(
        (token) => messageService.getMessages(token, limit, offset),
        [limit, offset]
    );

    return { messages, ...rest };
}