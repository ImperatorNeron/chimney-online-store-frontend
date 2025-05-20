import { categoryService } from "@/api/services/category.service"
import Categories from "./Categories"

export default async function CategoriesServer() {
    try {
        const categories = await categoryService.getCategories()
        if (!categories) {
            throw new Error('Invalid categories data structure')
        }
        return <Categories categories={categories} />
    } catch (error) {
        return (
            <div className="max-w-7xl mx-auto text-red-500 text-center p-4">
                Помилка завантаження категорій: {(error as Error).message}
            </div>
        )
    }
}