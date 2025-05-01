import Urls from "@/constants/Urls";
import Overlay from "@/components/ui/Overlay";
import OverlayHeader from "@/components/shared/OverlayHeader";
import OpenCatalogButton from "@/components/modules/menu/components/OpenCatalogButton";
import PrimaryInformation from "@/components/shared/PrimaryInformation";
import NavigationLink from "@/components/shared/NavigationLink";
import SearchBar from "@/components/modules/catalog/components/SearchBar";
import { useAuthStore } from "@/store/auth.store";

export default function MobileMenuOverlay({ isOpen, onClose }: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const { isAuthenticated } = useAuthStore();
    return (
        <Overlay isOpen={isOpen} onClose={onClose}>
            <OverlayHeader onClose={onClose} title="Меню" />
            <div className="p-4 h-[calc(100%-64px)] overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <SearchBar />

                    <OpenCatalogButton />

                    <nav className="flex flex-col">
                        <NavigationLink
                            href="#"
                            iconSrc="/icons/heart.png"
                            alt="Улюблене"
                            label="Улюблене"
                            count={0}
                            countColor="bg-green-500"
                            onClose={onClose}
                        />
                        <NavigationLink
                            href={isAuthenticated ? "/profile/me" : "/auth/login"}
                            iconSrc="/icons/person.png"
                            alt={isAuthenticated ? "Профіль" : "Увійти"}
                            label={isAuthenticated ? "Профіль" : "Увійти"}
                            onClose={onClose}
                        />
                        <NavigationLink
                            href={Urls.contacts}
                            iconSrc="/icons/contact-us.png"
                            alt="Контакти"
                            label="Контакти"
                            onClose={onClose}
                        />
                        <NavigationLink
                            href={Urls.delivery}
                            iconSrc="/icons/delivery.png"
                            alt="Доставка"
                            label="Доставка"
                            onClose={onClose}
                        />
                        <NavigationLink
                            href={Urls.faq}
                            iconSrc="/icons/chat.png"
                            alt="Питання та відповіді"
                            label="Питання та відповіді"
                            onClose={onClose}
                        />
                    </nav>

                    <hr className="border-gray-200 my-6" />
                    <PrimaryInformation />
                </div>
            </div>
        </Overlay>
    )
}