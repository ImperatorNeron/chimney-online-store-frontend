// components/LoadingSkeleton.tsx
export default function LoadingSkeleton() {
    return (
        <div className="py-12 md:py-16 lg:py-20 xl:py-24 2xl:py-28">
            <div className="mx-auto sm:px-6 lg:px-8 max-w-4xl lg:max-w-5xl xl:max-w-6xl">
                {/* Заголовок і підзаголовок */}
                <div className="text-center mb-12 md:mb-16 lg:mb-20 xl:mb-24 animate-pulse">
                    <div className="h-8 w-1/2 mx-auto bg-gray-300 rounded-md mb-4"></div>
                    <div className="h-6 w-1/3 mx-auto bg-gray-300 rounded-md"></div>
                </div>

                {/* Перелік питань */}
                <div className="space-y-4 md:space-y-5 lg:space-y-6 animate-pulse">
                    {[...Array(5)].map((_, index) => (
                        <div key={index} className="border-b border-gray-200 last:border-0 py-4 sm:py-5 md:py-6 lg:py-8">
                            {/* Питання */}
                            <div className="flex justify-between items-center">
                                <div className="w-3/4 h-5 bg-gray-300 rounded-md"></div>
                                <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
