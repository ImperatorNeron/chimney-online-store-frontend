export default function MessageSkeleton() {
    return (
        <div className="px-6">
            <div className="lg:p-8 max-w-6xl mx-auto min-h-screen my-16">
                <div className="text-center mb-10">
                    <div className="h-10 w-72 bg-gray-300 mx-auto rounded animate-pulse" />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="bg-white border-2 border-gray-200 rounded-lg p-6 animate-pulse space-y-4">
                            <div className="space-y-2">
                                <div className="h-5 bg-gray-300 rounded w-1/2" />
                                <div className="h-5 bg-gray-300 rounded w-1/3" />
                                <div className="h-4 bg-gray-300 rounded w-1/4" />
                            </div>
                            <div className="border-t-2 border-b-2 border-gray-300 py-4">
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-300 rounded w-1/3" />
                                    <div className="h-4 bg-gray-200 rounded w-full" />
                                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                                </div>
                            </div>
                            <div className="flex justify-end">
                                <div className="h-8 w-24 bg-gray-300 rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
