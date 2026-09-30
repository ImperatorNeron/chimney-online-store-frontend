import { useState, useEffect } from 'react';

export default function useMobileMenu() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen((prev) => !prev);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu };
};
