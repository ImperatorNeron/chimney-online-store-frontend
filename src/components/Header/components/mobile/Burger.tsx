'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';
import MobileMenuOverlay from '@/components/Overlay/MobileMenuOverlay';

export const Burger = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMobileMenuOpen]);

    return (
        <div className="lg:hidden flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-gray-600">
                <Image src="/icons/menu.png" alt="menu" width={24} height={24} />
            </button>
            <MobileMenuOverlay
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
            />
        </div>
    )
}
