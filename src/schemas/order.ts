import { inputPatterns } from "@/utils/field.patterns";
import { z } from "zod";

export const orderSchema = z.object({
    email: z
        .string()
        .email("Невірний формат електронної пошти")
        .min(5, "Email має містити не менше 5 символів")
        .max(255, "Email має містити не більше 255 символів")
        .optional(),

    phone_number: z
        .string()
        .min(9, "Номер телефону має бути щонайменше 9 символів")
        .max(11, "Номер телефону не може бути довше 11 символів")
        .regex(inputPatterns.phone, "Номер телефону має містити лише цифри"),

    first_name: z
        .string()
        .min(2, "Ім’я має містити щонайменше 2 символи")
        .max(50, "Ім’я має містити не більше 50 символів")
        .regex(inputPatterns.name, "Ім’я може містити лише літери, дефіси, апострофи та пробіли"),

    last_name: z
        .string()
        .min(2, "Прізвище має містити щонайменше 2 символи")
        .max(50, "Прізвище має містити не більше 50 символів")
        .regex(inputPatterns.name, "Прізвище може містити лише літери, дефіси, апострофи та пробіли"),

    patronymic: z
        .string()
        .min(2, "По батькові має містити щонайменше 2 символи")
        .max(50, "По батькові має містити не більше 50 символів")
        .regex(inputPatterns.name, "По батькові може містити лише літери, дефіси, апострофи та пробіли"),

    address: z.string().min(5, "Адреса має містити не менше 5 символів").max(200, "Адреса має містити не більше 200 символів"),

    shipping_method: z.enum(["nova_poshta", "ukrposhta", "courier"], {
        errorMap: () => ({ message: "Оберіть спосіб доставки" })
    }),

    payment_method: z.enum(["cash", "card", "online"], {
        errorMap: () => ({ message: "Оберіть спосіб оплати" })
    }),
});

export type CreateOrderZodSchema = z.infer<typeof orderSchema>;
