import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { NotificationService } from "@/api/services/notification.service";
import { productService } from "@/api/services/products.service";
import { createAbsoluteProductSchema, CreateAbsoluteProductSchema } from "@/schemas/products";
import { allowedImageExt } from "@/schemas/fields";


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

export const useCreateProduct = () => {
    const router = useRouter();
    const { getValidToken } = useAuthStore.getState();

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateAbsoluteProductSchema>({
        resolver: zodResolver(createAbsoluteProductSchema),
    });

    const { fields, append, prepend, remove } = useFieldArray({ name: "variations", control, keyName: 'rhfId' });

    const onSubmit = async (data: CreateAbsoluteProductSchema) => {
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
        Array.from(data.images as FileList).forEach((file) => formData.append("images", file, file.name));
        formData.append("variations_json", JSON.stringify(data.variations));

        try {
            await productService.createProduct(token, formData);
            NotificationService.success("Продукт успішно створено");
            router.replace(`/admin-panel/products/create/${data.slug}`);
        } catch (err: any) {
            if (err.response?.status === 401) {
                NotificationService.error("Токен недійсний або сесія закінчився");
                router.push("/auth/login");
            } else {
                NotificationService.error("Помилка при створенні продукту");
            }
        }
    };

    return {
        register, control, handleSubmit, errors, isSubmitting, onSubmit, fields, append, prepend, remove, watch
    };
};
