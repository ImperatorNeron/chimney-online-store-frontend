import CardsBlock from "@/components/CardsBlock/CardsBlock";
import Pagination from "@/page-components/catalog/Pagination";
import { fetchProducts } from "@/services/productService";

export default async function CatalogPage({ searchParams }: { searchParams?: { page?: string } }) {
    const search = await searchParams
    const initialPage = Math.max(1, parseInt(search?.page || "1"));
    const limit = 12;
    const { items, pagination } = await fetchProducts((initialPage - 1) * limit, limit);
    const totalPages = Math.max(1, Math.ceil(pagination.total / limit));
    const currentPage = Math.min(initialPage, totalPages);

    return (
        <div className="w-full md:w-3/4">
            <CardsBlock items={items} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3" />
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} />}
        </div>
    );
};