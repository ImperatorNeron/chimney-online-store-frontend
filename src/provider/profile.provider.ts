import { ReadUserSchema } from "@/api/types/types";
import { createContext } from "react";

export const ProfileContext = createContext<ReadUserSchema | null>(null);
