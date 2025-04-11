import BannerSlider from "@/app/(full-layout)/(home)/components/BannerSlider"
import FeaturesGrid from "@/app/(full-layout)/(home)/components/Features"

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