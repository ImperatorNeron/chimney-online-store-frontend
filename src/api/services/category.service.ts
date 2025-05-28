import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { ReadCategories, ReadCategoriesBySlug } from "../types/types";


class CategoryService {
    private endpoint = endpoints.categories;

    async getCategories() {
        const response = await http.get<ReadCategories>(this.endpoint);
        return response.data;
    }

    async getCategoriesBySlugs(slugs: string[]) {
        const params = new URLSearchParams();
        slugs.forEach(slug => params.append('slugs', slug));
        const url = `${this.endpoint}/by-slugs?${params.toString()}`
        console.log(url)
        const response = await http.get<ReadCategoriesBySlug>(url);
        return response.data;
    }
}

export const categoryService = new CategoryService();