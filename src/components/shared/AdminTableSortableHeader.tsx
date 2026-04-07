import type { ReactNode } from "react";
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { SortOrdering } from "@/constants/orderFields";


export default function SortableHeader<TField extends string>({
    label,
    sortField,
    activeField,
    ordering,
    onSort,
}: {
    label: ReactNode;
    sortField: TField;
    activeField: TField;
    ordering: SortOrdering;
    onSort: (field: TField) => void;
}) {
    const active = activeField === sortField;

    return (
        <button
            type="button"
            onClick={() => onSort(sortField)}
            className="inline-flex items-center gap-1 hover:text-gray-900 select-none"
        >
            {label}
            {active ? (
                ordering === "asc" ? (
                    <ChevronUpIcon className="h-4 w-4" />
                ) : (
                    <ChevronDownIcon className="h-4 w-4" />
                )
            ) : (
                <ChevronUpDownIcon className="h-4 w-4 text-gray-400" />
            )}
        </button>
    );
}

