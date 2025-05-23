import { inputPatterns } from "@/utils/field.patterns";
import { z } from "zod";
import { images } from "./fields";

export const baseProductVariationSchema = z.object({
    price: z.number().positive("Ціна має бути більше за 0"),
    discount_percentage: z.number().min(0, "Знижка не може бути меншою за 0").max(100, "Знижка не може бути більша за 100"),
    diameter: z.string().regex(inputPatterns.message).nullable().optional(),
    length: z.string().regex(inputPatterns.message).nullable().optional(),
    thickness: z.string().regex(inputPatterns.message).nullable().optional(),
    angle: z.string().regex(inputPatterns.message).nullable().optional(),
    metal_type: z.string().regex(inputPatterns.message).nullable().optional(),
});

export const baseAbsoluteProductSchema = z.object({
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
        .positive("ID категорії має бути додатнім числом")
});

export const createProductVariationSchema = baseProductVariationSchema
export const updateProductVariationSchema = baseProductVariationSchema.extend({
    id: z.number().nullable(),
})

export const createAbsoluteProductSchema = baseAbsoluteProductSchema.extend({
    images: images,
    variations: z.array(createProductVariationSchema),
})

export const updateAbsoluteProductSchema = baseAbsoluteProductSchema.extend({
    images: images.optional(),
    variations: z.array(updateProductVariationSchema),
})


export type CreateAbsoluteProductSchema = z.infer<typeof createAbsoluteProductSchema>;
export type UpdateAbsoluteProductSchema = z.infer<typeof updateAbsoluteProductSchema>;