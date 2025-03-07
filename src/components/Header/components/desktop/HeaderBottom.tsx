'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MobileMenu } from '../mobile/MobileMenu';
import { Burger } from '../mobile/Burger';
import { DesktopMenu } from './DesktopMenu';

export const HeaderBottom = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
    }, [isMobileMenuOpen]);

    return (
        <div>
            <div className="px-6 py-4 max-w-screen-2xl bg-white mx-auto">
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="text-xl font-bold text-gray-800 lg:ml-10 lg:mr-16">ChimneyHub</Link>
                    <DesktopMenu />
                    <MobileMenu
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                    <Burger
                        onOpen={() => setIsMobileMenuOpen(true)}
                    />
                </div>
            </div>
        </div>
    );
}