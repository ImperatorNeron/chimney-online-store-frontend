import LoadingProductList from "@/components/shared/LoadingProductList";

export default function LoadingPage() {
    return (
        <>
            <div className="flex gap-2 py-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-2">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                        {i < 3 && <span className="text-gray-300">/</span>}
                    </div>
                ))}
            </div>
            <div className="flex gap-8">
                <div className="hidden lg:block w-1/5 space-y-4">
                    <div className="h-[450px] bg-gray-200 rounded-lg animate-pulse" />
                </div>
                <div className="flex flex-col flex-1">
                    <div className="flex gap-3 mb-4">
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                    <LoadingProductList totalCards={8} className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3" />
                </div>
            </div>
        </>

    )
};