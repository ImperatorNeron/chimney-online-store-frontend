import LoadingProductList from "@/components/shared/LoadingProductList";

export default function LoadingPage() {
    return <LoadingProductList totalCards={8} className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3" />;
};