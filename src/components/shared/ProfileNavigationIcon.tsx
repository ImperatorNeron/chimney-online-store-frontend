'use client'

import { useAuthStore } from "@/store/auth.store";
import NavigationIcon from "./NavigationIcon";

export default function ProfileNavigationIcon() {
    const { isAuthenticated } = useAuthStore();
    return (
        <NavigationIcon
            href={isAuthenticated ? "/profile/me" : "/auth/login"}
            iconSrc="/icons/person.png"
            alt={isAuthenticated ? "Профіль" : "Увійти"}
            label={isAuthenticated ? "Профіль" : "Увійти"}
        />
    )
}