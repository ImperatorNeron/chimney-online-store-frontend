import { useEffect, useState } from "react";
import { categoryService } from "@/services/category.service";

export default function useCatalog() {
    const [categories, setCategories] = useState<any[]>([]);
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
                setCategories(response.data.data);
            } catch (err) {
                setError("Помилка завантаження категорій");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const mainCategories = categories.filter(cat => cat.parent_id === null);
    const childCategories = (parentId: number) =>
        categories.filter(cat => cat.parent_id === parentId);

    return { isLoading, error, mainCategories, childCategories, isMobile };
};
