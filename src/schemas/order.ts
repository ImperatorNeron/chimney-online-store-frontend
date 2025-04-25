import { z } from "zod";
import { emailField, nameField, phoneField } from "./fields";

export const orderSchema = z.object({
    address: z.string().min(5, "Адреса має містити не менше 5 символів").max(200, "Адреса має містити не більше 200 символів"),

    shipping_method: z.enum(["nova_poshta", "ukrposhta", "courier"], {
        errorMap: () => ({ message: "Оберіть спосіб доставки" })
    }),

    payment_method: z.enum(["cash", "card", "online"], {
        errorMap: () => ({ message: "Оберіть спосіб оплати" })
    }),

    email: emailField.optional(),
    phone_number: phoneField,
    first_name: nameField,
    last_name: nameField,
    patronymic: nameField,
});

export type CreateOrderZodSchema = z.infer<typeof orderSchema>;
