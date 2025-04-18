import { z } from "zod";

export const loginSchema = z.object({
    username: z
        .string()
        .min(3, "Логін має містити не менше 3 символів")
        .max(50, "Логін має містити не більше 50 символів")
        .regex(/^[a-zA-Z0-9_-]+$/, "Логін може містити лише літери, цифри, _ та -"),
    password: z
        .string()
        .min(4, "Пароль має містити не менше 4 символів")
        .max(255, "Пароль занадто довгий"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
