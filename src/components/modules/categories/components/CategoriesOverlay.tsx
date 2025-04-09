'use client'

import { useState } from "react";
import Link from "next/link";
import Overlay from "@/components/ui/Overlay";
import OverlayHeader from "@/components/shared/OverlayHeader";
import useCatalog from "../hooks/useCatalog";


export default function CategoriesOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { isLoading, error, mainCategories, childCategories, isMobile } = useCatalog();

    const [openCategoryId, setOpenCategoryId] = useState<number | null>(null);

    if (isLoading) return <div>Завантаження...</div>;
    if (error) return <div>{error}</div>;

    return (
        <Overlay
            isOpen={isOpen}
            onClose={onClose}
            className={`w-full lg:w-[1010px] lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2 
                lg:h-[450px] lg:mt-[116px] rounded-md
                ${isOpen ? 'lg:translate-y-0' : 'lg:-translate-y-full lg:ml-[8px]'}`}
        >
            <OverlayHeader onClose={onClose} title={"Каталог"} className="lg:hidden" />

            <div className="p-4 lg:p-8 mx-auto">
                <div className="grid lg:grid-cols-[1fr_1fr_1fr_auto] gap-2 lg:gap-5">
                    {mainCategories.map((category) => (
                        <div key={category.id} className="group w-auto">
                            <Link
                                href={`/catalog/${category.slug}`}
                                onClick={(e) => {
                                    if (isMobile) {
                                        e.preventDefault();
                                        setOpenCategoryId(openCategoryId === category.id ? null : category.id);
                                    } else {
                                        onClose();
                                    }
                                }}
                                className="flex items-center justify-between lg:justify-center1 p-3 lg:p-0 rounded-md lg:rounded-none
                                transition-colors lg:border-b lg:border-gray-200 lg:hover:border-primary
                                bg-gray-100 lg:bg-transparent hover:bg-gray-200 lg:hover:bg-transparent lg:pb-1"
                            >
                                <span className="font-semibold text-gray-800 lg:text-sm">
                                    {category.name}
                                </span>
                                {isMobile && (
                                    <svg
                                        className={`w-5 h-5 ml-2 transform transition-transform ${openCategoryId === category.id ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                )}
                            </Link>

                            <div className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out
                                ${isMobile
                                    ? openCategoryId === category.id
                                        ? 'max-h-[500px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                    : 'max-h-full opacity-100'
                                }`}
                            >
                                <div className="flex flex-col gap-2 lg:gap-1 pl-4 lg:pl-0 mt-2 lg:mt-3">
                                    {childCategories(category.id).map(child => (
                                        <Link
                                            key={child.id}
                                            href={`/catalog/${child.slug}`}
                                            onClick={() => onClose()}
                                            className="text-sm lg:text-xs lg:text-center1 text-gray-600 hover:text-primary 
                                                py-2 lg:py-0 px-3 lg:px-0 rounded-lg lg:rounded-none 
                                                bg-white lg:bg-transparent hover:bg-gray-50 lg:hover:bg-transparent
                                                transition-colors"
                                        >
                                            {child.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Overlay>
    );
}
