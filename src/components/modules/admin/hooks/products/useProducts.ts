import { productService } from "@/api/services/products.service";
import { ReadUniqueResponseData } from '@/api/types/types';
import useFetchData from "../common/useFetchData";

export default function useProductsData(
    limit: number = 20,
    offset: number = 0,
    params?: {
        text?: string;
        field?: string;
        category?: string;
        ordering?: string;
    },) {
    const { data: products, ...rest } = useFetchData<ReadUniqueResponseData>(
        (token) => productService.getUniqueProducts(token, limit, offset, params),
        [limit, offset, params]
    );

    return { products, ...rest };
}