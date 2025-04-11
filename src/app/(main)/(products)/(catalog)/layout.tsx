import Breadcrumbs from "@/components/layout/Breadcrumbs"
import DesktopFilterBlock from "@/components/modules/catalog/components/DesktopFilterBlock"
import MobileFilterButton from "@/components/modules/catalog/components/MobileFilterButton"

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <Breadcrumbs items={[
                { title: "Головна", href: "/" },
                { title: "Каталог" },
            ]} />
            <div className="flex gap-4 mt-5">
                <DesktopFilterBlock />
                <MobileFilterButton />
                {children}
            </div>
        </div>

    )
}