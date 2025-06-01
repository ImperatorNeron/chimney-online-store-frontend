import { create } from 'zustand';
import { likeService } from '@/api/services/likes.service';
import { useAuthStore } from './auth.store';

interface FavouritesState {
    likedProductIds: number[];
    loading: boolean;
    fetchLikedProducts: () => Promise<void>;
    addLike: (productId: number, token: string) => Promise<void>;
    removeLike: (productId: number, token: string) => Promise<void>;
    toggleLike: (productId: number, token: string) => Promise<void>;
    isLiked: (productId: number) => boolean;
    getLikedCount: () => number;
    resetLikes: () => void;
}

export const useFavouritesStore = create<FavouritesState>((set, get) => ({
    likedProductIds: [],
    loading: false,

    fetchLikedProducts: async () => {
        const { getValidToken } = useAuthStore.getState();
        try {
            set({ loading: true });
            const token = await getValidToken();
            if (!token) return;
            const ids = await likeService.getLikedProductIds(token);
            console.log(ids)
            set({ likedProductIds: Array.isArray(ids) ? ids : [] });
        } catch {
            set({ likedProductIds: [] });
        } finally {
            set({ loading: false });
        }
    },

    addLike: async (productId, token) => {
        const current = get().likedProductIds;
        if (!current.includes(productId)) {
            await likeService.createLike({ product_id: productId }, token);
            set({ likedProductIds: [...current, productId] });
        }
    },

    removeLike: async (productId, token) => {
        const current = get().likedProductIds;
        if (current.includes(productId)) {
            await likeService.removeLike(productId, token);
            set({ likedProductIds: current.filter(id => id !== productId) });
        }
    },

    toggleLike: async (productId, token) => {
        const state = get();
        if (state.isLiked(productId)) {
            await state.removeLike(productId, token);
        } else {
            await state.addLike(productId, token);
        }
    },

    isLiked: (productId) => get().likedProductIds.includes(productId),
    getLikedCount: () => get().likedProductIds.length,
    resetLikes: () => set({ likedProductIds: [] }),
}));
