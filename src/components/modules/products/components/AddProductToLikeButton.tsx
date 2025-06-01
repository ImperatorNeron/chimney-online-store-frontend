'use client';

import { NotificationService } from '@/api/services/notification.service';
import { useAuthStore } from '@/store/auth.store';
import { useFavouritesStore } from '@/store/favourite.store';
import { useState, useEffect } from 'react';

export default function AddProductToLikeButton({ productId }: { productId: number }) {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    const { getValidToken } = useAuthStore.getState();
    const isLiked = useFavouritesStore(state => state.isLiked(productId));
    const toggleLike = useFavouritesStore(state => state.toggleLike);
    const likeLoading = useFavouritesStore(state => state.loading)

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleClick = async () => {
        setLoading(true);
        try {
            const token = await getValidToken();
            if (!token) {
                NotificationService.error("Увійдіть у акаунт, щоб додати або прибрати товар з обраного.");
                return;
            }

            await toggleLike(productId, token);
            NotificationService.success(
                isLiked
                    ? "Товар видалено з обраного!"
                    : "Товар додано до обраного!"
            );
        } catch {
            NotificationService.error("Помилка. Спробуйте пізніше.");
        } finally {
            setLoading(false);
        }
    };

    if (!mounted) return null;

    return (
        <button
            className="absolute top-1.5 right-1.5 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10"
            onClick={handleClick}
            disabled={loading}
        >
            {likeLoading && loading ? (
                <div className="h-6 w-6 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
            ) : (
                <svg
                    className={`w-6 h-6 ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
                    fill={isLiked ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                </svg>
            )}
        </button>
    );
}
