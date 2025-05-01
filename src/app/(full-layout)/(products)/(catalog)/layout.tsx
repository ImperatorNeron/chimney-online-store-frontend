import Breadcrumbs from "@/components/layout/Breadcrumbs"

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

            {children}

        </div>

    )
}