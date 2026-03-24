import { CatalogNavigationProvider } from "@/components/modules/catalog/providers/CatalogNavigationProvider";

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {

    return (
        <CatalogNavigationProvider>{children}</CatalogNavigationProvider>
    )
}
