export default function ContactInfoSectionSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-6 w-48 bg-gray-200 rounded mb-6" />

            <div className="flex flex-col gap-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 border border-gray-200 rounded-xl px-4 py-3 bg-gray-50">
                        <div className="w-5 h-5 bg-gray-300 rounded" />
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 bg-gray-200 rounded" />
                            <div className="h-3 w-1/2 bg-gray-100 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
