import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export default function EmptySearch() {
    return (
        <div className="w-full flex h-[500px] flex-col items-center justify-center space-y-4">
            <div className="bg-gray-100 p-6 rounded-full">
                <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
            </div>
            <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-gray-900">
                    Нічого не знайдено
                </h3>
                <p className="text-gray-500 max-w-prose mx-auto">
                    На жаль, за вашим запитом або встановленими фільтрами<br />
                    не знайдено жодного товару. Спробуйте змінити критерії пошуку.
                </p>
            </div>
        </div>
    )
}