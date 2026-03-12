import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function AddProductButton() {
    return (
        <Link
            href="/admin-panel/products/create"
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 h-[35px] hover:bg-gray-50 text-sm"
        >
            <PlusIcon className="h-4 w-4" />
            Додати
        </Link>
    );
}