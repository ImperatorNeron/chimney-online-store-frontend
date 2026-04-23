'use client'

import ProfileLoading from "@/components/layout/loaders/ProfileLoader";
import useFavourites from "@/components/modules/orders/hooks/useFavourites";
import ProductList from "@/components/modules/products/components/ProductList";
import EmptyState from "@/components/shared/EmptyState";
import InfiniteScrollSentinel from "@/components/modules/admin/components/InfiniteScrollSentinel";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function FavoritesPage() {
  const { items, total, loading, loadingMore, hasMore, loadMore } = useFavourites();
  const router = useRouter();

  useEffect(() => {
    document.title = "Улюблене";
  }, []);

  if (loading) return <ProfileLoading />;

  return (
    <div className="lg:px-8 lg:py-4 min-h-[550px] flex flex-col">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 border-b pb-4 text-center lg:text-left">
        Улюблене
      </h1>

      {items.length ? (
        <>
          <ProductList
            items={items}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 lg:gap-3"
          />
          <InfiniteScrollSentinel
            hasMore={hasMore}
            loading={loadingMore}
            onLoadMore={loadMore}
            total={total}
            loaded={items.length}
          />
        </>
      ) : (
        <EmptyState
          title="Немає улюблених товарів"
          icon={HeartIcon}
          description="Додавайте товари до улюблених, щоб знайти їх пізніше"
          buttonText="До покупок"
          onAction={() => router.push("/")}
        />
      )}
    </div>
  );
}
