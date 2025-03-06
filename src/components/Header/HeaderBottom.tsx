'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const HeaderBottom = () => {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    
    return (
        <div>
            <div className="px-6 py-4 max-w-screen-2xl bg-white mx-auto">
                <div className="flex justify-between items-center w-full">
                    <Link href="/" className="text-xl font-bold text-gray-800 lg:ml-10 lg:mr-16">ChimneyHub</Link>
                    <div className="hidden lg:flex gap-4 items-center w-full">
                        <div className="relative">
                            <button
                                id="catalogButton"
                                onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                                className="bg-gray-800 text-white px-12 py-2 rounded-lg cursor-pointer hover:bg-gray-700 flex items-center justify-center"
                            >
                                <Image src={isCatalogOpen ? "/icons/thin-close.png" : "/icons/category.png"} alt="menu" width={20} height={20} className="mr-2 filter invert" />
                                <span>Каталог товарів</span>
                            </button>
                        </div>
                        <div className="flex-1 flex items-center">
                            <input
                                type="text"
                                placeholder="Пошук товарів..."
                                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-gray-700"
                            />
                            <button className="bg-gray-800 text-white border-t border-b border-r border-gray-800 px-6 py-2 rounded-r-lg hover:bg-gray-700 focus:outline-none focus:border-gray-700">
                                Пошук
                            </button>
                        </div>

                        <div className="flex items-center gap-4 ml-4">
                            <Link href="/auth/login" className="text-gray-600 flex flex-col items-center cursor-pointer p-2 rounded transition duration-300 transform hover:scale-110 relative group">
                                <Image src="/icons/person.png" alt="login" width={24} height={24} />
                                <span className="absolute bottom-full mb-2 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg">
                                    Увійти
                                </span>
                            </Link>
                            <Link href={"#"} className="text-gray-600 flex flex-col items-center cursor-pointer p-2 rounded transition duration-300 transform hover:scale-110 relative group">
                                <Image src="/icons/heart.png" alt="cart" width={24} height={24} />
                                <span className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center translate-x-2 -translate-y-2">
                                    0
                                </span>
                                <span className="absolute bottom-full mb-2 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg">
                                    Улюблене
                                </span>
                            </Link>
                            <Link href={"#"} className="text-gray-600 flex flex-col items-center cursor-pointer p-2 rounded transition duration-300 transform hover:scale-110 relative group">
                                <Image src="/icons/shopping-cart.png" alt="cart" width={24} height={24} />
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center translate-x-2 -translate-y-2">
                                    0
                                </span>
                                <span className="absolute bottom-full mb-2 hidden group-hover:flex px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-lg">
                                    Кошик
                                </span>
                            </Link>
                        </div>
                    </div>

                    <div className="lg:hidden flex items-center gap-4">
                        <button id="burgerMenu" className="text-gray-600">
                            <Image src="/icons/menu.png" alt="menu" width={24} height={24} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
