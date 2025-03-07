import { XMarkIcon } from "@heroicons/react/24/solid";
import type { FC } from "react";



export const MobileMenuHeader: FC<MobileMenuHeaderProps> = ({ onClose }) => (
    <div className="flex justify-between items-center px-4 py-1.5 bg-gray-100">
        <h2 className="text-xl font-bold">Меню</h2>
        <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            aria-label="Close menu"
        >
            <XMarkIcon className="w-6 h-6 text-black stroke-2 cursor-pointer" />
        </button>
    </div>
);