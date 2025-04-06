class CategoryService {
    async getCategories(): Promise<{ data: ApiResponseOne<Category[]> }> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`);

        if (!response.ok) {
            throw new Error('Failed to fetch categories');
        }
        const result: ApiResponseOne<Category[]> = await response.json();
        if (result.errors.length) throw new Error(result.errors[0].message);

        return { data: result };
    }
}

export const categoryService = new CategoryService()