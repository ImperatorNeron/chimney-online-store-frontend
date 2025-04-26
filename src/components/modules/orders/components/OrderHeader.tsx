import { ChevronDownIcon } from "@heroicons/react/24/outline";
import StatusBadge from "../../../shared/StatusBadge";

export default function OrderHeader({ order, isOpen }: { order: ReadExtendedOrderSchema; isOpen: boolean }) {
    return (
        <div className="flex justify-between items-center w-full flex-wrap gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 flex-1 min-w-0 space-y-1 sm:space-y-0">
                    <h3 className="text-md font-medium text-gray-900">
                        Замовлення: #{order.id}
                    </h3>
                    <time className="text-sm text-gray-500 truncate">
                        {new Date(order.created_at).toLocaleDateString('uk-UA')}
                    </time>
                </div>
            </div>

            <div className="flex items-center ml-2 sm:ml-4 flex-shrink-0">
                <StatusBadge status={order.status} />
                <div className="ml-2">
                    <ChevronDownIcon className={`w-5 h-5 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} text-gray-500`} />
                </div>
            </div>
        </div>
    )
}
