'use client'

import MobileMenuOverlay from '@/components/modules/menu/components/MobileMenuOverlay';
import Image from 'next/image';
import useMobileMenu from '../hooks/useMobileMenu';

export default function BurgerButton() {
    const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useMobileMenu();

    return (
        <div className="lg:hidden flex items-center gap-4">
            <button onClick={toggleMobileMenu} className="text-gray-600">
                <Image src="/icons/menu.png" alt="menu" width={24} height={24} />
            </button>
            <MobileMenuOverlay
                isOpen={isMobileMenuOpen}
                onClose={closeMobileMenu}
            />
        </div>
    )
}
