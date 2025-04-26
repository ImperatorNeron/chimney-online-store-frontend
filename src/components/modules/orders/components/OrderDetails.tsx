import { CreditCardIcon } from "@heroicons/react/24/outline";
import { TruckIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function OrderDetails({ order }: { order: ReadExtendedOrderSchema }) {
    return (
        <div className="border-t border-gray-100 p-5">
            <div className="flex flex-wrap gap-2 mb-4 text-sm">
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md truncate">
                    <TruckIcon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="capitalize truncate">
                        {order.shipping_method.replace('_', ' ')}
                    </span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md truncate">
                    <CreditCardIcon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="capitalize truncate">
                        {order.payment_method}
                    </span>
                </div>
            </div>
            <div className="flex justify-between items-center mb-4">
                <div className="sm:text-lg font-semibold">
                    {order.total_quantity} товар(ів)
                </div>
                <div className="sm:text-xl font-semibold text-gray-900">
                    {order.total_price.toFixed(2)} ₴
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                {order.items.map(item => (
                    <div
                        key={item.id}
                        className="py-4 flex justify-between items-center gap-4"
                    >
                        <Link
                            href={`/products/${item.product.slug}`}
                            className="text-xs sm:text-base font-medium text-gray-900 hover:underline"
                        >
                            {item.product.name}
                        </Link>
                        <div className="flex-shrink-0 text-right whitespace-nowrap">
                            <div className="sm:text-lg font-medium text-gray-900">
                                {item.price_at_order.toFixed(2)} ₴
                            </div>
                            <div className="text-sm sm:text-sm text-gray-500 mt-1">
                                {item.quantity} × {item.product.discount_price.toFixed(2)} ₴
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}