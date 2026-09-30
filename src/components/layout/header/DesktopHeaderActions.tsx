import OpenCartButton from "@/components/modules/cart/components/OpenCartButton";
import ProfileFavouriteNavigationIcons from "@/components/shared/ProfileNavigationIcon";

export default function DesktopHeaderActions() {
    return (
        <div className="flex items-center gap-4 ml-4">
            <ProfileFavouriteNavigationIcons />
            <OpenCartButton />
        </div>
    );
};

