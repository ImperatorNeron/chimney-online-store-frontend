import { z } from "zod";
import { inputPatterns } from "@/utils/field.patterns";

export const allowedImageExt = ["jpg", "jpeg", "png", "webp"];

export const uniqueProductSchema = z.object({

    name: z
        .string()
        .min(2, "Назва товару має містити щонайменше 2 символи")
        .max(100, "Назва товару не може бути довше 100 символів")
        .regex(
            inputPatterns.message,
            "Назва товару може містити лише літери, цифри, пропіби та .,!?()'`«»:-"
        ),
    slug: z
        .string()
        .min(3, "Slug має містити щонайменше 3 символи")
        .max(100, "Slug не може бути довше 100 символів")
        .regex(
            inputPatterns.slug,
            "Slug має містити лише латинські малі літери, цифри та дефіси"
        ),
    description: z
        .string()
        .min(10, "Опис має бути не менше 10 символів")
        .max(1000, "Опис не може бути довше 1000 символів")
        .regex(
            inputPatterns.message,
            "Назва товару може містити лише літери, цифри, пропіби та .,!?()'`«»:-"
        ),
    category_id: z
        .number({
            required_error: "ID категорії обов’язкове",
            invalid_type_error: "ID категорії має бути числом",
        })
        .int("ID категорії має бути цілим числом")
        .positive("ID категорії має бути додатнім числом"),
    images: z
        .instanceof(FileList, { message: "Потрібно завантажити файли" })
        .refine((list) => list.length > 0, "Додайте хоча б одне фото")
        .refine(
            (list) =>
                Array.from(list).every((file) => {
                    const ext = file.name.split(".").pop()?.toLowerCase();
                    return ext != null && allowedImageExt.includes(ext);
                }),
            `Файли мають бути одного з форматів: ${allowedImageExt.join(", ")}`
        ),
});

export type UniqueProductSchema = z.infer<typeof uniqueProductSchema>;
