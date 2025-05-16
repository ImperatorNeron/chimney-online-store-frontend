'use client'

import useFavourites from "@/components/modules/orders/hooks/useFavourites";
import ProductList from "@/components/modules/products/components/ProductList";

export default function FavoritesPage() {
    const { data, loading, error } = useFavourites();

    return (
        <div className="lg:px-8 lg:py-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
                Улюблене
            </h1>
            <ProductList items={data} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3" />
        </div>
    );
}