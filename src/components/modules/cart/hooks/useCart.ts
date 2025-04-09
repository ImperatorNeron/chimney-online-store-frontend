import { cartService } from "@/services/cart.service";
import { useQuery } from "@tanstack/react-query";

export default function useCart() {
    const { data: cart, isLoading, isError } = useQuery({
        queryKey: ['cart'],
        queryFn: cartService.getCart
    });

    return {
        cart,
        isLoading,
        isError,
        totalQuantity: cart?.data?.total_quantity ?? 0,
    };
};
