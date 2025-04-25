import { z } from "zod";
import { emailField, nameField, optional, phoneField } from "./fields";

export const profileSchema = z.object({
    email: optional(emailField.trim()),
    phone_number: optional(phoneField.trim()),
    first_name: optional(nameField.trim()),
    last_name: optional(nameField.trim()),
    patronymic: optional(nameField.trim()),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
