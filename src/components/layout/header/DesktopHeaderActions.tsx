'use client';

import OpenCartButton from "@/components/modules/cart/components/OpenCartButton";
import NavigationIcon from "@/components/shared/NavigationIcon";

export default function DesktopHeaderActions() {
    return (
        <div className="flex items-center gap-4 ml-4">
            <NavigationIcon
                href="/auth/login"
                iconSrc="/icons/person.png"
                alt="Увійти"
                label="Увійти"
            />
            <NavigationIcon
                href="#"
                iconSrc="/icons/heart.png"
                alt="Улюблене"
                count={0}
                countColor="bg-green-500"
                label="Улюблене"
            />
            <OpenCartButton />
        </div>
    );
};

