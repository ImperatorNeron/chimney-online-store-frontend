import BannerSlider from "@/page-components/home/BannerSlider"
import FeaturesGrid from "@/page-components/home/Features"

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