import { messageService } from "@/api/services/message.service";
import useDeleteItem from "../common/useDeleteItem";

interface UseDeleteMessageProps {
    onReload: () => Promise<void>;
    onAfterDelete?: () => void;
}

export default function useDeleteMessage({
    onReload,
    onAfterDelete
}: UseDeleteMessageProps) {
    return useDeleteItem<number>({
        onReload,
        onAfterDelete,
        deleteService: (token, id) => messageService.deleteMessage(token, id),
        confirmationMessage: 'Ви впевнені, що хочете видалити це повідомлення?',
        errorMessage: 'Не вдалося видалити повідомлення'
    });
}