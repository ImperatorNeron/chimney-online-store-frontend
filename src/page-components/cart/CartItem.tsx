import Image from "next/image";

export default function CartItem({ item, removeCartItem, updateCartItem, updateLoading, removeLoading }: CartItemProps) {
    const hasDiscount = item.product.discount_percentage > 0;
    return (
        <div className="relative p-4 rounded-xl bg-white shadow-sm border border-gray-200">
            {/* Discount Badge */}
            {hasDiscount && (
                <div className="absolute top-2 left-2 z-10 bg-red-600 text-white px-2 py-0.5 rounded text-xs font-bold shadow-sm">
                    -{item.product.discount_percentage}%
                </div>
            )}

            <div className="flex gap-2">
                <div className="relative w-24 h-24 sm:h-36 sm:w-36 flex-shrink-0">
                    <Image
                        src="/images/test.png"
                        alt={item.product.preview.alt}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Content Section - Right */}
                <div className="flex-1 flex flex-col">
                    {/* Top Row - Name and Delete Button */}
                    <div className="flex justify-between items-start">
                        <h3 className="text-sm sm:text-lg font-medium text-gray-900 line-clamp-2 pr-2">
                            {item.product.name}
                        </h3>
                        <button
                            onClick={() => removeCartItem(item.id)}
                            className="text-gray-400 hover:text-gray-600 transition-colors p-1 -mr-1"
                            disabled={removeLoading === item.id}
                            aria-label="Remove item"
                        >
                            {removeLoading === item.id ? (
                                <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="M5 5L19 19M5 19L19 5" strokeLinecap="round" />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Bottom Section - Price and Quantity */}
                    <div className="mt-auto">
                        {/* Price Row */}
                        <div className="flex items-baseline gap-2 mt-2 sm:mt-3">
                            <span className={`text-base sm:text-lg font-bold ${hasDiscount ? 'text-red-600' : 'text-gray-900'}`}>
                                {item.product.discount_price} ₴
                            </span>
                            {hasDiscount && (
                                <span className="text-gray-400 line-through text-sm font-medium">
                                    {item.product.price} ₴
                                </span>
                            )}
                        </div>

                        {/* Quantity Control */}
                        <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center rounded-md border border-gray-200 bg-white overflow-hidden">
                                <button
                                    onClick={() => updateCartItem(item.id, "decrement")}
                                    className="px-3 py-1 text-gray-600 hover:text-red-600 hover:bg-red-50 disabled:opacity-40 transition-colors text-lg"
                                    disabled={item.quantity <= 1 || updateLoading === item.id}
                                >
                                    −
                                </button>
                                <span className="px-3 py-1 text-gray-900 font-medium text-md min-w-[32px] text-center">
                                    {updateLoading === item.id ? (
                                        <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mx-auto" />
                                    ) : (
                                        item.quantity
                                    )}
                                </span>
                                <button
                                    onClick={() => updateCartItem(item.id, "increment")}
                                    className="px-3 py-1 text-gray-600 hover:text-green-600 hover:bg-green-50 disabled:opacity-40 transition-colors text-lg"
                                    disabled={updateLoading === item.id}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}