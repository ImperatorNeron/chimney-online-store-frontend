import { InboxIcon } from "@heroicons/react/24/outline";

export default function EmptyMessages() {
    return (
        <div className="text-center text-gray-500 text-xl py-16 flex flex-col items-center">
            <InboxIcon className="h-12 w-12 text-gray-400 mb-4" />
            Немає нових повідомлень
        </div>
    );
}