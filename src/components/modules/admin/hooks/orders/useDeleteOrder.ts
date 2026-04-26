import { orderService } from "@/api/services/order.service";
import useDeleteItem from "../common/useDeleteItem";

export default function useDeleteOrder({ onReload }: { onReload: () => Promise<void> }) {
    return useDeleteItem<number>({
        onReload,
        deleteService: (token, id) => orderService.deleteOrder(token, id),
        confirmationMessage: "Ви впевнені, що хочете видалити це замовлення?",
        errorMessage: "Не вдалося видалити замовлення",
    });
}
