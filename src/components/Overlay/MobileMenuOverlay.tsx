import Overlay from "./Overlay";

import Image from "next/image";
import Link from "next/link";
import Urls from "@/constants/Urls";
import { MobileSearchBar } from "../Header/components/mobile/MobileSearchBar";
import { NavItem } from "../Header/components/mobile/NavItem";
import { ContactInfo } from "../Header/components/mobile/ContactInfo";
import MenuHeader from "../Header/components/mobile/MenuHeader";

export default function MobileMenuOverlay({ isOpen, onClose }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <MenuHeader onClose={onClose} title="Меню" />
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
        </Overlay>
    )
}