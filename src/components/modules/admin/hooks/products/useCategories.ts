import { ReadCategoriesData } from '@/api/types/types';
import useFetchData from "../common/useFetchData";
import { categoryService } from "@/api/services/category.service";

export default function useCategories() {
  return useFetchData<ReadCategoriesData>(
    () => categoryService.getCategories(),
    []
  );
}