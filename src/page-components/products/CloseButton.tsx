import { XMarkIcon } from "@heroicons/react/24/solid";

export const CloseButton = ({ onClick }: { onClick: () => void }) => (
    <button
        onClick={onClick}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-opacity"
    >
        <XMarkIcon className="w-6 h-6 text-gray-700" />
    </button>
);