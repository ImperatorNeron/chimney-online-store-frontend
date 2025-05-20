import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { NotificationService } from "@/services/notification.service";
import { allowedImageExt, UniqueProductSchema, uniqueProductSchema } from "@/schemas/uniqueProduct";
import { productService } from "@/api/services/products.service";


function validateImages(files: FileList): { valid: true } | { valid: false; message: string } {
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (!ext || !allowedImageExt.includes(ext)) {
            return { valid: false, message: `Непідтримуваний формат: ${file.name}` };
        }
        if (file.size > 10 * 1024 * 1024) {
            return { valid: false, message: `Файл "${file.name}" перевищує 1 МБ` };
        }
    }
    return { valid: true };
}

export const useProductForm = () => {
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
        reset,
    } = useForm<UniqueProductSchema>({
        resolver: zodResolver(uniqueProductSchema),
    });

    const onSubmit = async (data: UniqueProductSchema) => {
        const token = await getValidToken();
        if (!token) {
            router.push("/auth/login");
            return;
        }

        const validation = validateImages(data.images);
        if (!validation.valid) {
            setError("images", { type: "manual", message: validation.message });
            return;
        }

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("slug", data.slug);
        formData.append("description", data.description || "");
        formData.append("category_id", String(data.category_id));
        Array.from(data.images).forEach((file) => formData.append("images", file, file.name));

        try {
            await productService.createUniqueProduct(token, formData);
            NotificationService.success("Продукт успішно створено");
            router.push("/admin-panel/products");
        } catch (err: any) {
            if (err.response?.status === 401) {
                NotificationService.error("Токен недійсний або сесія закінчився");
                router.push("/auth/login");
            } else {
                NotificationService.error(err.message || "Помилка при створенні продукту");
            }
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        isSubmitting,
        onSubmit,
        reset,
    };
};
