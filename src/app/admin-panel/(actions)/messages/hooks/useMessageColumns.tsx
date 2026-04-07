import { TrashIcon } from "@heroicons/react/24/outline";

import type { MessageStatus } from "@/api/services/message.service";
import type { ReadMessage } from "@/api/types/types";
import type { Column } from "@/components/shared/AdminTable";
import SelectFilter from "@/components/shared/AdminTableSelectFilter";
import SortableHeader from "@/components/shared/AdminTableSortableHeader";
import type { MessageSortField, SortOrdering } from "@/constants/orderFields";
import formatDate from "@/utils/formatDate";

export default function useMessageColumns(
    changeStatus: (id: number, status: MessageStatus) => void,
    handleDelete: (id: number) => void,
    sortField: MessageSortField,
    sortOrdering: SortOrdering,
    onSort: (field: MessageSortField) => void,
): Column<ReadMessage>[] {
    return [
        {
            header: (
                <SortableHeader
                    label="Клієнт"
                    sortField="user_name"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (m) => <b>{m.user_name}</b>,
            className: "break-words break-all",
        },
        {
            header: (
                <SortableHeader
                    label="Контакти"
                    sortField="phone_number"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (m) => m.phone_number,
        },
        {
            header: (
                <SortableHeader
                    label="Дата"
                    sortField="created_at"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (m) => formatDate(m.created_at),
            className: "text-sm text-gray-500",
        },
        {
            header: (
                <SortableHeader
                    label="Повідомлення"
                    sortField="message"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (m) => m.message,
            className: "break-words break-all mr-1",
        },
        {
            header: (
                <SortableHeader
                    label="Статус"
                    sortField="status"
                    activeField={sortField}
                    ordering={sortOrdering}
                    onSort={onSort}
                />
            ),
            render: (m) => (
                <SelectFilter
                    value={m.status}
                    onChange={(val) => changeStatus(m.id, val as MessageStatus)}
                    options={[
                        { value: "new", label: "Нове" },
                        { value: "progress", label: "Обробляється" },
                        { value: "read", label: "Прочитано" },
                    ]}
                />
            ),
        },
        {
            header: "Дії",
            render: (m) => (
                <button
                    onClick={() => handleDelete(m.id)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-full bg-gray-50"
                >
                    <TrashIcon className="h-5 w-5" />
                </button>
            ),
        },
    ];
}
