import ProductList from "../../products/components/ProductList";
import LimitSelector from "./LimitSelector";
import OrderSelector from "./OrderSelector";
import Pagination from "./Pagination";



export default async function Catalog({ items, currentPage, totalPages, limit }: CatalogProps) {
    return (
        <>
            <div className="flex gap-3 mb-4">
                <LimitSelector />
                <OrderSelector />
            </div>
            <ProductList items={items} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3" />
            {totalPages > 1 && <Pagination limit={limit} currentPage={currentPage} totalPages={totalPages} />}
        </>
    )
}