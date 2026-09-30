import { z } from "zod";
import { emailField, nameField, optional, passwordField, phoneField, usernameField } from "./fields";

export const registrationSchema = z.object({
    username: usernameField,
    password: passwordField,
    confirm_password: passwordField,
    email: optional(emailField.trim()),
    phone_number: optional(phoneField.trim()),
    first_name: optional(nameField.trim()),
    last_name: optional(nameField.trim()),
    patronymic: optional(nameField.trim()),
}).refine((data) => data.password === data.confirm_password, {
    message: "Паролі не співпадають",
    path: ["confirm_password"],
});

export type RegistrationSchema = z.infer<typeof registrationSchema>;
