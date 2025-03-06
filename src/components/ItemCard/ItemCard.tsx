import Image from 'next/image';
import Link from 'next/link';


const ItemCard = ({ product }: ItemCardProps) => {
    return (
        <article className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-200 border border-gray-200">
            <div className="relative aspect-square flex items-center">
                <Link
                    href={`/products/${product.slug}`}
                    className="w-full h-full flex items-center"
                >
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={253}
                        height={253}
                        className="object-contain p-3 hover:scale-105 transition-transform duration-200 mx-auto"
                    />
                </Link>

                {product.discount && (
                    <span className="absolute top-1.5 left-1.5 bg-red-600 text-white px-2 py-0.5 text-[0.7rem] font-bold rounded">
                        -{product.discount}%
                    </span>
                )}

                <button className="absolute top-1.5 right-1.5 p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors z-10">
                    <svg
                        className="w-6 h-6 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            </div>

            <div className="p-3 flex flex-col h-[140px]">
                <Link
                    href={`/products/${product.slug}`}
                    className="hover:text-gray-900 transition-colors"
                >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 flex-1 line-clamp-3">
                        {product.title}
                    </h3>
                </Link>

                <div className="mt-auto flex justify-between items-center">
                    <div className="flex flex-col">
                        {product.oldPrice && (
                            <div className="text-sm text-gray-400 line-through leading-none">
                                ₴{product.oldPrice.toFixed(2)}
                            </div>
                        )}
                        <div className={`text-base font-bold ${product.oldPrice ? "text-red-600" : "text-gray-900"}`}>
                            ₴{product.price.toFixed(2)}
                        </div>
                    </div>

                    <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    );
};

export default ItemCard;