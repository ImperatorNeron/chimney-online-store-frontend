import { XMarkIcon } from "@heroicons/react/24/solid";

export default function MenuHeader({ title, onClose, className }: { title: string, onClose: () => void, className?: string }) {
    return (
        <div className={`flex justify-between items-center px-4 py-1.5 bg-gray-100 ${className}`}>
            <h2 className="text-xl font-bold">{title}</h2>
            <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
                aria-label="Close menu"
            >
                <XMarkIcon className="w-6 h-6 text-black stroke-2 cursor-pointer" />
            </button>
        </div>
    );
}