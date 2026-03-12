export default function ErrorState({ error }: { error: string }) {
    return (
        <div className="p-4 text-red-600 text-center">Помилка завантаження: {error}</div>
    );
}
