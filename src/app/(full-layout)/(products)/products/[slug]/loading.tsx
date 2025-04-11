import LoadingProductList from "@/components/shared/LoadingProductList";

export default function ProductLoagingPage() {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-1 pb-6">
                <div className="flex gap-2 py-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                            {i < 3 && <span className="text-gray-300">/</span>}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col lg:flex-row gap-8 mt-8">
                    <div className="lg:w-1/2 bg-gray-100 h-96 rounded-xl animate-pulse" />
                    <div className="lg:w-1/2 space-y-6">
                        <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />

                        <div className="flex justify-between items-start">
                            <div className="space-y-4">
                                <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                            </div>
                            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse" />
                        </div>

                        <div className="space-y-4">
                            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />

                            <div className="flex gap-4">
                                <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" />
                                <div className="flex-1 h-12 bg-gray-200 rounded-lg animate-pulse" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8 mt-12">
                    <div className="space-y-4">
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-4 bg-gray-200 rounded animate-pulse" />
                        ))}
                    </div>

                    <div className="space-y-4">
                        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse" />
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex justify-between py-2">
                                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12">
                    <div className="h-6 w-48 bg-gray-200 rounded animate-pulse mb-6" />
                    <div className="col-start-1 col-end-2 md:col-start-1 md:col-end-3 overflow-x-auto lg:overflow-x-visible-mx-4 -mx-4 px-4">
                        <LoadingProductList totalCards={5} className="flex gap-2 pb-8" itemClassName="flex-1 min-w-[188px]" />
                    </div>
                </div>
            </div>
        </div>
    )

}