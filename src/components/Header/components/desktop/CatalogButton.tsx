'use client';
import { useState } from 'react';
import Image from 'next/image';

const CatalogButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-gray-800 text-white px-12 py-2 rounded-lg hover:bg-gray-700 flex items-center justify-center"
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
    );
};

export default CatalogButton;