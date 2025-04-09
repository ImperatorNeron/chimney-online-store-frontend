export default function LoadingSkeleton({ count }: { count: number }) {
    return (
        <div className="animate-pulse">
            <div className="h-10 bg-gray-200 w-1/3 mx-auto my-3 border-b-2" />
            <div>
                {Array.from({ length: count }).map((_, index) => (
                    <div key={index} className="relative p-4 bg-white border-b">
                        <div className="flex gap-3">
                            <div className="w-24 h-24 flex-shrink-0 bg-gray-200 rounded-lg" />
                            <div className="flex-1 space-y-3">
                                <div className="flex justify-between">
                                    <div className="h-5 bg-gray-200 rounded w-2/3" />
                                    <div className="w-6 h-6 bg-gray-200 rounded-full" />
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center border border-gray-200 rounded-md mt-6">
                                        <div className="h-8 w-8 bg-gray-200" />
                                        <div className="h-5 w-6 bg-gray-200 mx-2 rounded" />
                                        <div className="h-8 w-8 bg-gray-200" />
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <div className="h-5 bg-gray-200 w-12 rounded" />
                                        <div className="h-4 bg-gray-200 w-10 rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mx-4 mb-4 mt-8 space-y-5">
                <div className="flex justify-between">
                    <div className="h-5 bg-gray-200 w-16 rounded" />
                    <div className="h-5 bg-gray-200 w-20 rounded" />
                </div>
                <div className="h-12 bg-gray-200 rounded-lg" />
            </div>
        </div>
    );
}