import { categoryService } from "@/api/services/category.service";
import { CategoriesMobile } from "./CategoriesMobile";

export default async function CategoriesServer() {
  try {
    const categories = await categoryService.getCategories();

    if (!categories) {
      throw new Error("Invalid categories data structure");
    }

    return <CategoriesMobile categories={categories} />;
  } catch {
    return (
      <div className="mx-auto flex min-h-[240px] max-w-7xl items-center justify-center rounded-3xl bg-zinc-50 px-6 py-10 text-center text-zinc-500">
        Помилка завантаження категорій
      </div>
    );
  }
}