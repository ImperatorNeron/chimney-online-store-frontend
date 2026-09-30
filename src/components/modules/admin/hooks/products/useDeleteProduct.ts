import { productService } from "@/api/services/products.service";
import useDeleteItem from "../common/useDeleteItem";

interface UseDeleteProductProps {
    onReload: () => Promise<void>;
    onAfterDelete?: () => void;
}

export default function useDeleteProduct({
    onReload,
    onAfterDelete
}: UseDeleteProductProps) {
    return useDeleteItem<number>({
        onReload,
        onAfterDelete,
        deleteService: (token, id) => productService.deleteUniqueProduct(token, id),
        confirmationMessage: 'Ви впевнені, що хочете видалити цей продукт?',
        errorMessage: 'Помилка видалення продукту'
    });
}