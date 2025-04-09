import { categoryService } from "@/services/category.service"
import Categories from "./Categories"

export default async function CategoriesServer() {
    try {
        const { data } = await categoryService.getCategories()
        if (!data.data) {
            throw new Error('Invalid categories data structure')
        }

        const categories = data.data
        return <Categories categories={categories} />
    } catch (error) {
        console.error('Failed to fetch categories:', error)
        return (
            <div className="max-w-7xl mx-auto text-red-500 text-center p-4">
                Помилка завантаження категорій: {(error as Error).message}
            </div>
        )
    }
}