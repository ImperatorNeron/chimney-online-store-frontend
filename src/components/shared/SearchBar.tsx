import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function SearchBar() {
    return (
        <div className="flex-1 flex items-center">
            <input
                type="text"
                placeholder="Пошук товарів..."
                className="w-full border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:border-gray-700"
            />
            <button className="bg-gray-800 text-white px-3 lg:px-6 py-2 rounded-r-lg hover:bg-gray-700 border-t border-b border-r border-gray-800">
                <div className="hidden lg:block">Пошук</div>
                <MagnifyingGlassIcon className="h-6 lg:hidden" />
            </button>
        </div>
    )
}