import { ClockIcon, HeartIcon, ShoppingBagIcon, UserIcon } from "@heroicons/react/24/outline";

export const menuItems = [
    { id: 1, title: "Персональні дані", href: "/profile/me", icon: UserIcon },
    { id: 2, title: "Улюблене", href: "/profile/favorites", icon: HeartIcon },
    { id: 3, title: "Історія", href: "/profile/history", icon: ClockIcon },
    { id: 4, title: "Поточні замовлення", href: "/profile/orders", icon: ShoppingBagIcon },
];