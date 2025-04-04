export default function LoadingCart() {
    return (
        <div className="max-w-7xl mx-auto py-8 animate-pulse">
            {/* Заголовок */}
            <div className="h-10 bg-gray-100 rounded-full w-64 mx-auto mb-12"></div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Скелетон списку товарів */}
                <div className="lg:col-span-2 space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="p-6 bg-white rounded-xl border border-gray-100">
                            <div className="flex gap-4">
                                {/* Скелетон зображення */}
                                <div className="w-32 h-32 bg-gray-100 rounded-lg"></div>

                                {/* Скелетон контенту */}
                                <div className="flex-1 space-y-3">
                                    <div className="h-5 bg-gray-100 rounded w-4/5"></div>
                                    <div className="h-4 bg-gray-100 rounded w-2/5"></div>
                                    <div className="h-8 bg-gray-100 rounded-md w-24"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Скелетон підсумків */}
                <div className="bg-white p-6 rounded-xl border border-gray-100 h-fit sticky top-28">
                    <div className="h-7 bg-gray-100 rounded-full w-40 mb-6"></div>
                    <div className="space-y-5">
                        <div className="flex justify-between">
                            <div className="h-4 bg-gray-100 rounded w-20"></div>
                            <div className="h-4 bg-gray-100 rounded w-12"></div>
                        </div>
                        <div className="pt-5 border-t border-gray-100">
                            <div className="flex justify-between">
                                <div className="h-4 bg-gray-100 rounded w-16"></div>
                                <div className="h-6 bg-gray-100 rounded w-24"></div>
                            </div>
                        </div>
                        <div className="h-12 bg-gray-100 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};