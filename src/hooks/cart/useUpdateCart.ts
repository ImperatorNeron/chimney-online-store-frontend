import { cartService } from "@/services/cart.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateCart() {
    const queryClient = useQueryClient();

    const {
        mutate: updateCart,
        isPending,
        isError,
    } = useMutation({
        mutationKey: ['update cart'],
        mutationFn: async ({ itemId, action }: { itemId: number; action: string }) => {
            return await cartService.updateCartItem(itemId, action);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        }
    });

    return {
        updateCart,
        isPending,
        isError
    };
};
