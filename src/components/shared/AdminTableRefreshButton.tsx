import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function RefreshButton({
    onClick,
    loading,
}: {
    onClick: () => void;
    loading: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 h-[41px] hover:bg-gray-50"
            disabled={loading}
        >
            <ArrowPathIcon className={`h-5 w-5 ${loading ? "animate-spin" : ""}`} />
            Оновити
        </button>
    );
}