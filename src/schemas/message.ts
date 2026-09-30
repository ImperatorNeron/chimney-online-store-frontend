import { z } from "zod";
import { nameField, phoneField } from "./fields";

export const messageSchema = z.object({
    message: z
        .string()
        .max(1000, "Повідомлення не може перевищувати 1000 символів")
        .optional(),

    user_name: nameField,
    phone_number: phoneField,
});

export type MessageSchema = z.infer<typeof messageSchema>;
