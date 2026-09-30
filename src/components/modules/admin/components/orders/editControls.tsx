import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function EditControls({
    isEditing,
    onSave,
    onCancel
}: {
    isEditing: boolean;
    onSave: () => void;
    onCancel: () => void;
}) {
    return isEditing ? (
        <div className="flex gap-3 mb-6">
            <button
                onClick={onSave}
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
                <CheckIcon className="w-5 h-5 mr-2" />
                Зберегти
            </button>
            <button
                onClick={onCancel}
                className="inline-flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
            >
                <XMarkIcon className="w-5 h-5 mr-2" />
                Скасувати
            </button>
        </div>
    ) : null;
}