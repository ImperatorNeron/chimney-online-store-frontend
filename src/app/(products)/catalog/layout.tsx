import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs"

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
                <div className="hidden md:flex flex-col bg-white p-4 shadow-lg rounded-lg border border-gray-200 self-start w-1/4">
                    <h2 className="text-lg font-semibold text-gray-800 mb-3">Фільтри</h2>
                    <div className="space-y-3"></div>
                </div>
                {children}
            </div>
        </div>

    )
}