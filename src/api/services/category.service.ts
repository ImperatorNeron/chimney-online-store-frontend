import { endpoints } from "../endpoints";
import { http } from '@/api/http';
import { AlistReadCategorySchema, Child_AlistReadCategorySchema, ReadCategoriesBySlug } from "../types/types";


class CategoryService {
    private endpoint = endpoints.categories;

    async getCategories() {
        const response = await http.get<AlistReadCategorySchema>(`${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}`);
        return response.data;
    }

    async getCategoriesBySlugs(slugs: string[]) {
        const params = new URLSearchParams();
        slugs.forEach(slug => params.append('slugs', slug));
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/by-slugs?${params.toString()}`
        const response = await http.get<ReadCategoriesBySlug>(url);
        return response.data;
    }

    async getChildCategories(parentIds: number[]) {
        const params = new URLSearchParams();
        parentIds.forEach((id) => params.append('parent_ids', String(id)));
        const url = `${process.env.NEXT_PUBLIC_API_URL}${this.endpoint}/children?${params.toString()}`
        const response = await http.get<Child_AlistReadCategorySchema>(url);
        return response.data;
    }
}

export const categoryService = new CategoryService();
