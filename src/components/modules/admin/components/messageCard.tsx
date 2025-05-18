import { CalendarIcon, PhoneIcon, TrashIcon, UserCircleIcon } from "@heroicons/react/24/outline";

interface Message {
    user_name: string;
    phone_number: string;
    message?: string;
    id: number;
    created_at: Date;
}

interface MessageCardProps {
    message: Message;
    onDelete: (id: number) => void;
    isDeleting: boolean;
}

export default function MessageCard({ message, onDelete, isDeleting }: MessageCardProps) {
    return (
        <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
            <div className="text-gray-900 mb-4 space-y-3">
                <p className="flex items-center gap-2 text-lg">
                    <UserCircleIcon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Ім’я:</span>
                    {message.user_name || 'Без імені'}
                </p>
                <p className="flex items-center gap-2">
                    <PhoneIcon className="h-5 w-5 text-gray-600" />
                    <span className="font-medium">Телефон:</span>
                    <a
                        href={`tel:${message.phone_number}`}
                        className="text-gray-700 underline hover:text-gray-900"
                    >
                        {message.phone_number}
                    </a>
                </p>
                <p className="flex items-center gap-2 text-gray-500">
                    <CalendarIcon className="h-5 w-5 text-gray-600" />
                    {new Date(message.created_at).toLocaleString('uk-UA')}
                </p>
            </div>

            <div className="border-t-2 border-b-2 border-gray-300 py-4 mb-4">
                <div className="text-gray-700 text-lg leading-relaxed break-words">
                    <p className="font-medium mb-2">Повідомлення:</p>
                    {message.message || 'Передзвоніть мені'}
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => onDelete(message.id)}
                    disabled={isDeleting}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                >
                    <TrashIcon className="h-5 w-5" />
                    <span className="font-medium">
                        {isDeleting ? 'Видалення...' : 'Видалити'}
                    </span>
                </button>
            </div>
        </div>
    );
}