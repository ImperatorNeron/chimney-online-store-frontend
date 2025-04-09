import { cartService } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useRemoveFromCart() {
    const queryClient = useQueryClient();

    const {
        mutate: removeFromCart,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ['remove from cart'],
        mutationFn: async ({ itemId }: { itemId: number }) => {
            return await cartService.removeFromCart(itemId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });

    return {
        removeFromCart,
        isPending,
        isError
    };
};
