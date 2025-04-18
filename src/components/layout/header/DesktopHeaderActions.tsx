import OpenCartButton from "@/components/modules/cart/components/OpenCartButton";
import NavigationIcon from "@/components/shared/NavigationIcon";
import ProfileNavigationIcon from "@/components/shared/ProfileNavigationIcon";

export default function DesktopHeaderActions() {
    return (
        <div className="flex items-center gap-4 ml-4">
            <ProfileNavigationIcon />
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

