import BackToPageButton from "@/components/ui/BackToPageButton";
import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function ProductNavigation() {
    return (
        <>
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />

            <div className="flex flex-col sm:flex-row gap-6 justify-between items-center my-8">
                <h1 className="text-3xl font-semibold text-gray-900 hidden sm:block">Продукти</h1>
                <h1 className="text-2xl sm:text-3xl w-full font-semibold text-gray-900 text-center border-b-2 border-gray-200 pb-2 my-4 block sm:hidden">
                    Продукти
                </h1>
                <Link
                    href="/admin-panel/products/create"
                    className="inline-flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold px-5 py-3 rounded-md shadow-md transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <PlusIcon className="w-5 h-5" />
                    Додати продукт
                </Link>
            </div>
        </>
    )
}