import { ReadMessage } from "@/api/types/types";
import { CalendarIcon, PhoneIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface MessageCardProps {
    message: ReadMessage;
    onDelete: (id: number) => void;
    isDeleting: boolean;
}

export default function MessageCard({ message, onDelete, isDeleting }: MessageCardProps) {
    const isNew = Date.now() - new Date(message.created_at).getTime() < 1000 * 60 * 60 * 24;

    return (
        <div className="bg-white border-2 border-gray-300 rounded-2xl p-6 shadow-sm transition hover:shadow-md">
            <div className="mb-4 space-y-3 text-gray-800 text-lg">
                <div className="flex items-center gap-2">
                    <UserCircleIcon className="h-6 w-6 text-gray-600" />
                    <span className="font-semibold">Ім’я:</span>
                    {message.user_name || 'Без імені'}
                </div>

                <div className="flex items-center gap-2">
                    <PhoneIcon className="h-6 w-6 text-gray-600" />
                    <span className="font-semibold">Телефон:</span>
                    <a href={`tel:${message.phone_number}`} className="underline hover:text-blue-800">
                        {message.phone_number}
                    </a>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <CalendarIcon className="h-5 w-5 text-gray-500" />
                    {new Date(message.created_at).toLocaleString('uk-UA')}
                    {isNew && (
                        <span className="ml-2 text-sm bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            НОВЕ
                        </span>
                    )}
                </div>
            </div>

            <div className="border-y border-gray-200 py-4 mb-4">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
                    <span className="font-semibold block mb-1">Повідомлення:</span>
                    {message.message || 'Передзвоніть мені'}
                </p>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => onDelete(message.id)}
                    disabled={isDeleting}
                    className="flex items-center gap-2 text-gray-700 hover:text-red-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition disabled:opacity-50"
                >
                    <TrashIcon className="h-5 w-5" />
                    <span>{isDeleting ? 'Видалення...' : 'Видалити'}</span>
                </button>
            </div>
        </div>
    );
}
