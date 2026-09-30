import { categoryService } from "@/api/services/category.service";
import { listReadCategorySchema } from "@/api/types/types";
import { useEffect, useState } from "react";


export default function useCatalog() {
    const [categories, setCategories] = useState<listReadCategorySchema>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 1024);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await categoryService.getCategories();
                setCategories(response);
            } catch {
                setError("Помилка завантаження категорій");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const mainCategories = (categories ?? []).filter(cat => cat.parent_id === null);
    const childCategories = (parentId: number) =>
        (categories ?? []).filter(cat => cat.parent_id === parentId);

    return { isLoading, error, mainCategories, childCategories, isMobile };
};
