import { useState } from "react";

export default function useMobileFilters() {
    const [isOpen, setIsOpen] = useState(false);

    const openMenu = () => setIsOpen(true);
    const closeMenu = () => setIsOpen(false);
    const toggleMenu = () => setIsOpen(prev => !prev);

    return {
        isOpen,
        openMenu,
        closeMenu,
        toggleMenu,
    };
};
