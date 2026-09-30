'use client'
import { inputPatterns } from "@/utils/field.patterns";
import { z } from "zod";

export const allowedImageExt = ["jpg", "jpeg", "png", "webp"];

export function optional<T extends z.ZodTypeAny>(schema: T) {
    return z
        .union([schema, z.literal("")])
        .transform((value) => (value === "" ? undefined : value))
        .optional();
}

export const nameField = z
    .string()
    .min(2, "Поле має містити щонайменше 2 символи")
    .max(50, "Поле має містити не більше 50 символів")
    .regex(
        inputPatterns.name,
        "Поле може містити лише літери, дефіси, апострофи та пробіли"
    );

export const phoneField = z
    .string()
    .min(9, "Номер телефону має бути щонайменше 9 символів")
    .max(11, "Номер телефону не може бути довше 11 символів")
    .regex(inputPatterns.phone, "Номер телефону має містити лише цифри");

export const emailField = z
    .string()
    .email("Невірний формат електронної пошти")
    .min(5, "Email має містити не менше 5 символів")
    .max(255, "Email має містити не більше 255 символів");

export const usernameField = z
    .string()
    .min(3, "Логін має містити не менше 3 символів")
    .max(50, "Логін має містити не більше 50 символів")
    .regex(inputPatterns.username, "Логін може містити лише літери, цифри, _ та -");

export const passwordField = z
    .string()
    .min(4, "Пароль має містити не менше 4 символів")
    .max(255, "Пароль занадто довгий")
    .regex(inputPatterns.password, {
        message: "Пароль може містити лише латинські літери, цифри та символи @$!%*?&",
    });

export const images = typeof window === "undefined"
    ? z.any() :
    z.instanceof(FileList, { message: "Потрібно завантажити файли" })
        .refine((list) => list.length > 0, "Додайте хоча б одне фото")
        .refine(
            (list) =>
                Array.from(list).every((file) => {
                    const ext = file.name.split(".").pop()?.toLowerCase();
                    return ext != null && allowedImageExt.includes(ext);
                }),
            `Файли мають бути одного з форматів: ${allowedImageExt.join(", ")}`
        )