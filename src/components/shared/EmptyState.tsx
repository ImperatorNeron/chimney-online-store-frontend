export default function EmptyState({
    title,
    description,
    buttonText,
    onAction,
    icon: Icon = undefined
}: {
    title: string;
    description: string;
    buttonText: string;
    onAction: () => void;
    icon?: React.ElementType;
}) {
    return (
        <div className="flex flex-col items-center flex-1 justify-center py-12 text-center">
            {Icon ? (
                <Icon className="h-16 w-16 text-gray-400 mb-4" />
            ) : null}
            <h3 className="text-xl font-medium text-black mb-2">{title}</h3>
            <p className="text-gray-600 mb-6 max-w-md">{description}</p>
            <button
                onClick={onAction}
                className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
                {buttonText}
            </button>
        </div>
    );
}