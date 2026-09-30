import { z } from "zod";
import { passwordField, usernameField } from "./fields";

export const loginSchema = z.object({
    username: usernameField,
    password: passwordField,
});

export type LoginSchema = z.infer<typeof loginSchema>;
