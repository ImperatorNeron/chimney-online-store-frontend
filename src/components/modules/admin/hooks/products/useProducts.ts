import { productService } from "@/api/services/products.service";
import { ReadUniqueResponseData } from '@/api/types/types';
import useFetchData from "../common/useFetchData";

export default function useProductsData(limit: number, offset: number) {
  return useFetchData<ReadUniqueResponseData>(
    (token) => productService.getUniqueProducts(token, limit, offset),
    [limit, offset]
  );
}