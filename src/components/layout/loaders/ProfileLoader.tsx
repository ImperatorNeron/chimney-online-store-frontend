export default function ProfileLoading() {
    return (
        <div className="flex-1 px-3 py-6 md:px-8 md:py-8">
            <div className="lg:px-8 lg:py-4 min-h-[550px] flex flex-col">
                <div className="h-8 w-64 bg-gray-200 rounded mb-6" />
                <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, idx) => (
                        <div key={idx} className="h-24 bg-gray-100 rounded-lg" />
                    ))}
                </div>
            </div>
        </div>
    )
}