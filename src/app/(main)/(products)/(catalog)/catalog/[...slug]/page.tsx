import { catalogService } from "@/services/catalog.services";
import Catalog from "@/components/modules/catalog/components/Catalog";

export default async function CatalogPage({ params, searchParams }: {
    params: Promise<{ slug: string[] }>;
    searchParams?: Promise<{ page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!,
        (await params).slug.at(-1),
    );
    return (
        <div className="w-full lg:w-3/4">
            <Catalog items={items} currentPage={currentPage} totalPages={totalPages} limit={limit} />
        </div>
    );
};