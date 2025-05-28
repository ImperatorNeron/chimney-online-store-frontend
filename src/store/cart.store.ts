import { cartService } from '@/api/services/cart.service';
import { ReadCartSchema } from '@/api/types/types';
import { create } from 'zustand';


interface CartState {
    cart: ReadCartSchema | null;
    error: string;
    loading: boolean;
    fetchCart: () => Promise<void>;
    addToCart: (productId: number, quantity?: number) => Promise<void>;
    changeQuantity: (cartItemId: number, action: 'increment' | 'decrement', quantity?: number) => Promise<void>;
    removeFromCart: (cartItemId: number) => Promise<void>;
}

export const useCartStore = create<CartState>((set) => ({
    cart: null,
    error: '',
    loading: false,

    fetchCart: async () => {
        set({ loading: true, error: '' });
        try {
            const data = await cartService.fetchCart();
            set({ cart: data, loading: false });
        } catch (err: any) {
            set({ error: err.message || 'Невідома помилка', loading: false });
        }
    },

    addToCart: async (productId, quantity = 1) => {
        set({ loading: true, error: '' });
        try {
            await cartService.addToCart(productId, quantity);
            await useCartStore.getState().fetchCart();
        } catch (err: any) {
            set({ error: err.message || 'Невідома помилка', loading: false });
        }
    },

    changeQuantity: async (cartItemId, action, quantity = 1) => {
        set({ loading: true, error: '' });
        try {
            await cartService.changeItemQuantity(cartItemId, action, quantity);
            await useCartStore.getState().fetchCart();
        } catch (err: any) {
            set({ error: err.message || 'Невідома помилка', loading: false });
        }
    },

    removeFromCart: async (cartItemId) => {
        set({ loading: true, error: '' });
        try {
            await cartService.removeItemFromCart(cartItemId);
            await useCartStore.getState().fetchCart();
        } catch (err: any) {
            set({ error: err.message || 'Невідома помилка', loading: false });
        }
    },
}));
