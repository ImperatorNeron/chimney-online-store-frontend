export default function LoadingProductCard({ itemClassName }: { itemClassName?: string }) {
    return (
        <article
            className={`${itemClassName} bg-white rounded-lg shadow-md border border-gray-200 animate-pulse`}
        >
            <div className="relative aspect-square flex items-center">
                <div className="w-full h-full bg-gray-200 rounded-t-lg" />

                <div className="absolute top-1.5 right-1.5 p-2 rounded-full bg-gray-300">
                    <div className="w-6 h-6" />
                </div>
            </div>

            <div className="p-3 flex flex-col h-[140px]">
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-4/5" />
                    <div className="h-3 bg-gray-200 rounded w-3/5" />
                    <div className="h-3 bg-gray-200 rounded w-2/5" />
                </div>

                <div className="mt-auto flex justify-between items-center">
                    <div className="space-y-1">
                        <div className="h-4 bg-gray-200 rounded w-12" />
                        <div className="h-5 bg-gray-200 rounded w-16" />
                    </div>

                    <div className="p-2 rounded-full bg-gray-200">
                        <div className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </article>
    )
}