import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"
import DesktopFilterBlock from "@/page-components/catalog/filters/DesktopFilterBlock"
import MobileFilterButton from "@/page-components/catalog/filters/MobileFilterButton"

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