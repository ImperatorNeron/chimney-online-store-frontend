import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function FieldErrorMessage({ message }: { message?: string }) {
    return (
        <div className="flex items-start ml-1 mt-2" role="alert" aria-live="polite">
            <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="ml-2 text-sm font-medium text-red-600">{message}</span>
        </div>
    );
};