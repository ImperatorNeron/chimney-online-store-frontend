import { z } from "zod";

export const messageSchema = z.object({
    user_name: z
        .string()
        .min(2, "Ім’я має містити щонайменше 2 символи")
        .max(50, "Ім’я не може перевищувати 50 символів")
        .regex(/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ'`\s-]+$/, "Ім’я може містити лише літери, пробіли, апострофи та дефіси"),
    phone_number: z
        .string()
        .min(9, "Номер телефону має бути щонайменше 9 символів")
        .max(11, "Номер телефону не може бути довше 11 символів")
        .regex(/^\d+$/, "Номер телефону має містити лише цифри"),
    message: z
        .string()
        .max(1000, "Повідомлення не може перевищувати 1000 символів")
});

export type MessageSchema = z.infer<typeof messageSchema>;
