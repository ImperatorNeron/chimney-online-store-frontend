import { catalogService } from "@/services/catalog.services";
import Catalog from "@/components/modules/catalog/components/Catalog";

export default async function SearchPage({ searchParams }: {
    searchParams?: Promise<{ text: string, page?: string; limit?: string; field?: string; ordering?: string; }>;
}) {
    const { items, currentPage, totalPages, limit } = await catalogService.getCatalogData(
        searchParams!
    );

    return (
        <div className="w-full lg:w-3/4">
            <h1 className="text-xl mb-4">Результати пошуку для {(await searchParams)?.text}</h1>
            <Catalog items={items} currentPage={currentPage} totalPages={totalPages} limit={limit} />
        </div>
    );
};