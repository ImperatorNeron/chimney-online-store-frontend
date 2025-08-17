export interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
    className?: string;
}

export default function GenericTable<T>({
    data,
    columns,
    rowKey,
}: {
    data: T[];
    columns: Column<T>[];
    rowKey: (row: T) => string;
}) {
    return (
        <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
            {/* Header */}
            <div
                className="hidden md:grid gap-4 bg-gray-50 text-gray-500 font-medium px-4 md:px-6 py-3 border-b items-center"
                style={{
                    gridTemplateColumns: `repeat(${columns.length - 1}, minmax(100px, 1fr)) 50px`,
                }}
            >
                {columns.map((col, i) => (
                    <div
                        key={i}
                        className={col.className + (i === columns.length - 1 ? " text-center" : "")}
                    >
                        {col.header}
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div>
                {data.map((row) => (
                    <div
                        key={rowKey(row)}
                        className="grid gap-4 px-4 py-5 md:px-6 hover:bg-gray-50 transition-colors items-center"
                        style={{
                            gridTemplateColumns: `${'minmax(0, 1fr) '.repeat(columns.length - 1)}50px`,
                        }}
                    >
                        {columns.map((col, i) => (
                            <div
                                key={i}
                                className={`${i === columns.length - 1 ? 'text-center' : 'break-words'} min-w-0 ${col.className || ''}`}
                            >
                                {col.render(row)}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
