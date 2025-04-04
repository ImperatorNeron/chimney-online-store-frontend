import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";
import { MobileMenuHeader } from "./MobileMenuHeader";
import { MobileSearchBar } from "./MobileSearchBar";
import { NavItem } from "./NavItem";
import { ContactInfo } from "./ContactInfo";
import Urls from "@/constants/Urls";
import { CartCounter } from "@/helpers/cartItemsCounter";


export const MobileMenu: FC<MobileMenuProps> = ({ isOpen, onClose }) => (
    <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-100 transition-all duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        onClick={onClose}
    >
        <div
            className={`absolute top-0 right-0 w-5/6 h-full bg-white transform transition-all duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            onClick={(e) => e.stopPropagation()}
        >
            <MobileMenuHeader onClose={onClose} />

            <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
                <div className="flex flex-col space-y-4">
                    <MobileSearchBar />

                    <Link
                        href="#"
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors duration-200"
                    >
                        <Image
                            src="/icons/category.png"
                            alt="Каталог"
                            width={20}
                            height={20}
                            className="w-5 h-5 filter invert"
                        />
                        <span className="font-medium">Каталог товарів</span>
                    </Link>

                    <nav className="flex flex-col">
                        <NavItem
                            href="/cart"
                            iconSrc="/icons/shopping-cart.png"
                            alt="Кошик"
                            label="Кошик"
                            count={CartCounter()}
                            countColor="bg-red-500"
                            onClose={onClose}
                        />
                        <NavItem
                            href="#"
                            iconSrc="/icons/heart.png"
                            alt="Улюблене"
                            label="Улюблене"
                            count={0}
                            countColor="bg-green-500"
                            onClose={onClose}
                        />
                        <NavItem
                            href={Urls.login}
                            iconSrc="/icons/person.png"
                            alt="Увійти"
                            label="Увійти"
                            onClose={onClose}
                        />
                        <NavItem
                            href={Urls.contacts}
                            iconSrc="/icons/contact-us.png"
                            alt="Контакти"
                            label="Контакти"
                            onClose={onClose}
                        />
                        <NavItem
                            href={Urls.delivery}
                            iconSrc="/icons/delivery.png"
                            alt="Доставка"
                            label="Доставка"
                            onClose={onClose}
                        />
                        <NavItem
                            href={Urls.faq}
                            iconSrc="/icons/chat.png"
                            alt="Питання та відповіді"
                            label="Питання та відповіді"
                            onClose={onClose}
                        />
                    </nav>

                    <hr className="border-gray-200 my-6" />
                    <ContactInfo />
                </div>
            </div>
        </div>
    </div>
);