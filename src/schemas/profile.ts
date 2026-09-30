import { z } from "zod";
import { emailField, nameField, optional, passwordField, phoneField } from "./fields";

export const profileSchema = z.object({
    email: optional(emailField.trim()),
    phone_number: optional(phoneField.trim()),
    first_name: optional(nameField.trim()),
    last_name: optional(nameField.trim()),
    patronymic: optional(nameField.trim()),
    password: optional(passwordField.trim()),
    confirm_password: optional(passwordField.trim()),
}).superRefine((data, ctx) => {
    const hasPassword = !!data.password;
    const hasConfirm = !!data.confirm_password;

    if (hasPassword || hasConfirm) {
        if (!hasPassword || !hasConfirm) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Обидва поля 'Пароль' та 'Підтвердження пароля' мають бути заповнені",
                path: ["confirm_password"],
            });
        } else if (data.password !== data.confirm_password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Паролі не співпадають",
                path: ["confirm_password"],
            });
        }
    }
});

export type ProfileSchema = z.infer<typeof profileSchema>;
