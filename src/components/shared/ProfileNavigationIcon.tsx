'use client'

import { useAuthStore } from "@/store/auth.store";
import NavigationIcon from "./NavigationIcon";
import { useFavouritesStore } from "@/store/favourite.store";

export default function ProfileFavouriteNavigationIcons() {
    const { isAuthenticated } = useAuthStore();
    const likedCount = useFavouritesStore(state => state.getLikedCount());
    return (
        <>
            <NavigationIcon
                href={isAuthenticated ? "/profile/me" : "/auth/login"}
                iconSrc="/icons/person.png"
                alt={isAuthenticated ? "Профіль" : "Увійти"}
                label={isAuthenticated ? "Профіль" : "Увійти"}
            />
            <NavigationIcon
                href={isAuthenticated ? "/profile/favorites" : "/auth/login"}
                iconSrc="/icons/heart.png"
                alt="Улюблене"
                count={likedCount}
                countColor="bg-gray-500"
                label="Улюблене"
            />
        </>
    )
}