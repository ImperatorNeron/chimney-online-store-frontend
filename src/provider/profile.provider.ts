import { UserSchema } from "@/api/types/types";
import { createContext } from "react";

export const ProfileContext = createContext<UserSchema | null>(null);
