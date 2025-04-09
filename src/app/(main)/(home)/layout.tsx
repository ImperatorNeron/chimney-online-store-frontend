import BannerSlider from "@/app/(main)/(home)/components/BannerSlider"
import FeaturesGrid from "@/app/(main)/(home)/components/Features"

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <BannerSlider />
            <FeaturesGrid />
            {children}
        </div>
    );
};