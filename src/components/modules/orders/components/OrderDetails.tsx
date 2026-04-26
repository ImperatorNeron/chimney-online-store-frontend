import { ReadExtendedOrderSchema } from "@/api/types/types";
import { PAYMENT_METHODS, SHIPPING_METHODS } from "@/constants/orders";
import { CreditCardIcon, TruckIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function OrderDetails({ order }: { order: ReadExtendedOrderSchema }) {
    return (
        <div className="border-t border-gray-100 p-5">
            <div className="flex flex-wrap gap-2 mb-4 text-sm">
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md truncate">
                    <TruckIcon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="truncate">
                        {SHIPPING_METHODS[order.shipping_method as keyof typeof SHIPPING_METHODS]}
                    </span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md truncate">
                    <CreditCardIcon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="truncate">
                        {PAYMENT_METHODS[order.payment_method as keyof typeof PAYMENT_METHODS]}
                    </span>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded-md truncate">
                    <DocumentTextIcon className="w-4 h-4 text-gray-500 shrink-0" />
                    <span className="truncate">
                        ТТН {order.waybill_number || 'Відсутній'}
                    </span>
                </div>
            </div>
            <div className="space-y-1 py-4">
                <div className="flex justify-between items-center">
                    <span className="text-base sm:text-md text-gray-700">Кількість товарів:</span>
                    <span className="text-base sm:text-md font-semibold text-gray-900">
                        {order.total_quantity} шт.
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-base sm:text-md text-gray-700">Загальна вартість:</span>
                    <span className="text-base sm:text-md font-semibold text-gray-900">
                        {order.total_price.toFixed(0)} ₴
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-base sm:text-md text-gray-700">Знижка:</span>
                    <span className="text-base sm:text-md font-semibold text-red-600">
                        {order.price_discount === 0
                            ? '0 ₴'
                            : `-${order.price_discount.toFixed(0)} ₴`}
                    </span>
                </div>

                <div className="flex justify-between items-center py-2 border-y border-gray-200">
                    <span className="text-base sm:text-md font-semibold text-gray-800">Фінальна вартість:</span>
                    <span className="text-base sm:text-md font-bold text-green-600">
                        {(order.total_price - order.price_discount).toFixed(0)} ₴
                    </span>
                </div>
            </div>

            <div className="divide-y divide-gray-200">
                {order.items.map(item => (
                    <div
                        key={item.id}
                        className="py-4 flex justify-between items-center gap-4"
                    >
                        <div>
                            {item.product_slug && item.product_id ? (
                                <Link
                                    href={`/products/${item.product_slug}/${item.product_id}`}
                                    className="text-xs sm:text-base font-medium text-gray-900 hover:underline"
                                >
                                    {item.product_name}
                                </Link>
                            ) : (
                                <span className="text-xs sm:text-base font-medium text-gray-900">
                                    {item.product_name || "Товар (видалено)"}
                                </span>
                            )}
                        </div>

                        <div className="flex-shrink-0 text-right whitespace-nowrap">
                            <div className="sm:text-lg font-medium text-gray-900">
                                {item.price_at_order.toFixed(0)} ₴
                            </div>
                            <div className="text-sm sm:text-sm text-gray-500 mt-1">
                                {item.quantity} × {item.product_price.toFixed(0)} ₴
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}