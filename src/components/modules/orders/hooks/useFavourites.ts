'use client';

import { useContext, useEffect, useState } from 'react';
import { ProfileContext } from '@/provider/profile.provider';
import { productService } from '@/api/services/products.service';
import { paths } from '@/api/types/openapi';
import { useFavouritesStore } from '@/store/favourite.store';

type CreateProductByIdsResponse = paths["/api/v1/products/by-ids"]["get"]["responses"]["200"]["content"]["application/json"]["data"]

export default function useFavourites() {
    const user = useContext(ProfileContext);
    const likedProductIds = useFavouritesStore(state => state.likedProductIds);

    const [data, setData] = useState<CreateProductByIdsResponse>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (likedProductIds.length === 0) {
                    setData([]);
                    return;
                }
                const likedProducts = await productService.getProductsByIds(likedProductIds);
                setData(likedProducts);
            } catch {
                setError('Не вдалося завантажити обрані товари');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, likedProductIds]);

    return { data, loading, error };
}
