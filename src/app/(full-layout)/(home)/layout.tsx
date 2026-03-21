import CatalogBanner from "@/app/(full-layout)/(home)/components/CatalogBanner"
import FeaturesGrid from "@/app/(full-layout)/(home)/components/Features"

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <CatalogBanner />
            <FeaturesGrid />
            {children}
        </div>
    );
};