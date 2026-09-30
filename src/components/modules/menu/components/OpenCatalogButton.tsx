'use client';
import { useState } from 'react';
import Image from 'next/image';
import CategoriesOverlay from '@/components/modules/categories/components/CategoriesOverlay';

export default function OpenCatalogButton({ closeCatalog }: { closeCatalog?: () => void }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
        if (closeCatalog) {
            closeCatalog();
        }
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gray-800 text-white px-4 lg:px-12 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center"
            >
                <Image
                    src={isOpen ? "/icons/thin-close.png" : "/icons/category.png"}
                    alt="menu"
                    width={20}
                    height={20}
                    className="mr-2 filter invert"
                />
                <span>Каталог товарів</span>
            </button>
            <CategoriesOverlay isOpen={isOpen} onClose={handleClose} />
        </>
    );
};