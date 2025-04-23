export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-white px-4">
            <div className="relative w-16 h-16 mb-4">
                <div className="absolute inset-0 rounded-full border-4 border-gray-200" />
                <div className="absolute inset-0 animate-spin rounded-full border-t-4 border-b-4 border-gray-800" />
            </div>
            <p className="text-center text-base sm:text-lg font-medium tracking-wide text-gray-600">
                Зачекайте, ми готуємо для Вас найкраще...
            </p>
        </div>
    );
}