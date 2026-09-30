export default function SideBarLoader() {
    return (
        <aside className="hidden lg:block max-w-72 min-w-72 p-4 border-r border-gray-200">
            <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-gray-50 border border-gray-200">
                <div className="w-10 h-10 bg-gray-200 rounded-full shadow-inner" />
                <div className="flex-1 min-w-0 space-y-2">
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
            </div>
            <nav>
                <ul className="space-y-2">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <li key={index}>
                            <div className="flex items-center gap-3 px-4 py-3 bg-gray-100 rounded relative">
                                <div className="h-5 w-5 bg-gray-300 rounded" />
                                <div className="h-4 w-24 bg-gray-300 rounded" />
                            </div>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    )
}