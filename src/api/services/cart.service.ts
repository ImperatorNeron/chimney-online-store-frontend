import { endpoints } from "../endpoints";
import { http } from "../http";
import { useAuthStore } from "@/store/auth.store";
import { AReadCartItemSchema, AReadFullCartSchema } from "../types/types";

class CartService {
    private endpoint = endpoints.cart;

    async tokenOrNone() {
        const { accessToken, isTokenValid, checkAuthentication } = useAuthStore.getState();
        let token = accessToken;
        if (token && !isTokenValid()) {
            const isAuth = await checkAuthentication();
            token = isAuth ? useAuthStore.getState().accessToken : null;
        }
        return token
    }

    async fetchCart() {
        const token = await this.tokenOrNone()
        const response = await http.get<AReadFullCartSchema>(this.endpoint, token ?? undefined);
        return response;
    }

    async addToCart(productId: number, quantity = 1) {
        const token = await this.tokenOrNone()
        const response = await http.post<AReadCartItemSchema>(this.endpoint, { product_id: productId, quantity }, token ?? undefined);
        return response;
    }

    async changeItemQuantity(cartItemId: number, action: 'increment' | 'decrement', quantity: number = 1) {
        const url = `${this.endpoint}/change-item-quantity/${cartItemId}`
        const token = await this.tokenOrNone()
        const response = await http.patch<AReadCartItemSchema>(url, { action, quantity }, token ?? undefined);
        return response;
    }

    async removeItemFromCart(cartItemId: number) {
        const url = `${this.endpoint}/${cartItemId}`
        const token = await this.tokenOrNone()
        const response = await http.delete<null>(url, token ?? undefined);
        return response;
    }

}

export const cartService = new CartService();