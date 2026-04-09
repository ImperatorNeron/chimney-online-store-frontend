import type { Column } from "@/components/shared/AdminTable";
import type { ReactNode } from "react";

export default function OrdersTable<T>({
    data,
    columns,
    rowKey,
    columnTemplate,
    expandedRowKey,
    renderExpandedRow,
}: {
    data: T[];
    columns: Column<T>[];
    rowKey: (row: T) => string;
    columnTemplate?: string;
    expandedRowKey?: string | null;
    renderExpandedRow: (row: T) => ReactNode;
}) {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto border border-gray-200">
            {/* Заголовки — менший шрифт та padding */}
            <div
                className="hidden md:grid text-xs text-gray-600 font-medium bg-gray-100 px-2 py-1.5 border-b gap-2"
                style={{
                    gridTemplateColumns: columnTemplate || `repeat(${columns.length - 1}, minmax(80px, 1fr)) 40px`,
                }}
            >
                {columns.map((col, i) => (
                    <div key={i}>{col.header}</div>
                ))}
            </div>

            <div className="divide-y divide-gray-200">
                {data.map((row) => {
                    const key = rowKey(row);
                    const expanded = expandedRowKey === key;
                    return (
                        <div key={key}>
                            <div
                                className="grid items-center gap-2 px-2 py-2 hover:bg-gray-50 transition-colors"
                                style={{
                                    gridTemplateColumns:
                                        columnTemplate ||
                                        `${"minmax(0, 1fr) ".repeat(columns.length - 1)} 40px`,
                                }}
                            >
                                {columns.map((col, i) => (
                                    <div key={i} className={`${col.className || ""}`}>
                                        {col.render(row)}
                                    </div>
                                ))}
                            </div>
                            {expanded ? (
                                <div className="px-2 pb-4 pt-1 bg-gray-50 border-t border-gray-100">
                                    {renderExpandedRow(row)}
                                </div>
                            ) : null}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}