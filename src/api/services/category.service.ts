import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { ReadCategories } from "../types/types";


class CategoryService {
    private endpoint = endpoints.categories;

    async getCategories() {
        const response = await http.get<ReadCategories>(this.endpoint);
        return response.data;
    }
}

export const categoryService = new CategoryService();