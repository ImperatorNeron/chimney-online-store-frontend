import Link from "next/link";

export default function OrderSummary({ totalQuantity, totalPrice, onClose }: OrderSummaryProps) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Сума замовлення</h2>

            <div className="space-y-4">
                <div className="flex justify-between items-center text-sm sm:text-base">
                    <span className="text-gray-600">Товари</span>
                    <span className="font-medium text-gray-900">{totalQuantity} од.</span>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-gray-200 sm:text-lg">
                    <span className="text-gray-600">Всього</span>
                    <span className="font-bold text-gray-900">{totalPrice} ₴</span>
                </div>

                <div className="pt-4">
                    <Link
                        href="/checkout"
                        onClick={onClose}
                        className="block bg-black text-white py-3 rounded-lg font-medium text-center hover:bg-gray-800 transition-colors active:scale-[0.98]">
                        Оформити замовлення
                    </Link>
                </div>
            </div>
        </div>
    );
}