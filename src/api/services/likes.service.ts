import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { CreateLikeSchema, AReadLikeSchema, ReadLikedProductIdsSchema } from "../types/types";

class LikeService {
    private endpoint = endpoints.likes;

    async createLike(like: CreateLikeSchema, token: string) {
        const params = new URLSearchParams();
        params.append("product_id", String(like.product_id));
        const url = `${this.endpoint}?${params.toString()}`
        const response = await http.post<AReadLikeSchema>(url, null, token);
        return response.data;
    };

    async removeLike(productId: number, token: string) {
        const url = `${this.endpoint}/${encodeURIComponent(productId)}`
        await http.delete<null>(url, token);
    }

    async getLikedProductIds(token: string) {
        const response = await http.get<ReadLikedProductIdsSchema>(this.endpoint, token);
        return response.data;
    }
}

export const likeService = new LikeService();