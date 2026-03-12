export interface Column<T> {
    header: string;
    render: (row: T) => React.ReactNode;
    className?: string;
}

export default function GenericTable<T>({
    data,
    columns,
    rowKey,
    columnTemplate,
}: {
    data: T[];
    columns: Column<T>[];
    rowKey: (row: T) => string;
    columnTemplate?: string;
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-200">
            {/* Header */}
            <div
                className="hidden md:grid text-sm text-gray-600 font-semibold bg-gray-100 px-3 py-2 border-b gap-2"
                style={{
                    gridTemplateColumns: columnTemplate || `repeat(${columns.length - 1}, minmax(80px, 1fr)) 40px`,
                }}
            >
                {columns.map((col, i) => (
                    <div
                        key={i}
                    >
                        {col.header}
                    </div>
                ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-gray-200 text-xs">
                {data.map((row) => (
                    <div
                        key={rowKey(row)}
                        className="grid items-center gap-2 px-3 py-3 hover:bg-gray-50 transition-colors"
                        style={{
                            gridTemplateColumns: columnTemplate || `${"minmax(0, 1fr) ".repeat(
                                columns.length - 1
                            )} 40px`,
                        }}
                    >
                        {columns.map((col, i) => (
                            <div
                                key={i}
                                className={` ${col.className || ""}`}
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
