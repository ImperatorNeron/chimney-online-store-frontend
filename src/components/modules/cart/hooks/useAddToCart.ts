import { NotificationService } from "@/services/notification.service";
import { cartService } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useAddToCart() {
    const queryClient = useQueryClient();

    const {
        mutate: addToCart,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ['add cart item'],
        mutationFn: async ({ productId, quantity }: { productId: number; quantity?: number }) => {
            return await cartService.addToCart(productId, quantity ?? 1);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            NotificationService.success("Товар успішно додано до кошика!")
        },
        onError: () => {
            NotificationService.error("Не вдалося додати товар до кошика!")
        }
    });

    return {
        addToCart,
        isPending,
        isError
    };
};
