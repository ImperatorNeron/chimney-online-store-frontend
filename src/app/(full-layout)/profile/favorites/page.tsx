'use client'

import useFavourites from "@/components/modules/orders/hooks/useFavourites";
import ProductList from "@/components/modules/products/components/ProductList";
import EmptyState from "@/components/shared/EmptyState";
import { HeartIcon } from "@heroicons/react/24/outline";

export default function FavoritesPage() {
  const { data, loading, error } = useFavourites();

  const handleExploreProducts = () => {
    // Навігація до каталогу продуктів
    console.log('Navigate to product catalog');
  };

  return (
    <div className="lg:px-8 lg:py-4 min-h-[550px] flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
        Улюблене
      </h1>
      
      {data?.length ? (
        <ProductList 
          items={data} 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3" 
        />
      ) : (
        <EmptyState
          title="Немає улюблених товарів"
          icon={HeartIcon}
          description="Додавайте товари до улюблених, щоб знайти їх пізніше"
          buttonText="До покупок"
          onAction={handleExploreProducts}
        />
      )}
    </div>
  );
}