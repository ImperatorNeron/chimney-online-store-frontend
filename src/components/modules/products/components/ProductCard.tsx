import Image from 'next/image';
import Link from 'next/link';
import AddProductToCartButton from './AddProductToCartButton';
import AddProductToLikeButton from './AddProductToLikeButton';


export default function ProductCard({ product, className }: ItemCardProps) {
    return (
        <article className={`${className} group bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200`}>
            <div className="relative aspect-square flex items-center">
                <Link
                    href={`/products/${product.slug}/${product.id}`}
                    className="w-full h-full flex items-center"
                >
                    <Image
                        // src="/images/test.png"
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/${product.preview.filename}`}
                        alt={product.preview.alt}
                        width={253}
                        height={253}
                        className="object-contain p-3 hover:scale-105 transition-transform duration-200 mx-auto"
                    />
                </Link>

                {product.discount_percentage > 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-red-600 text-white px-2 py-0.5 text-[0.7rem] font-bold rounded">
                        -{product.discount_percentage}%
                    </span>
                )}

                <AddProductToLikeButton productId={product.id} />
            </div>
            <div className="p-3 flex flex-col h-[133px] sm:h-[155px]">
                <Link
                    href={`/products/${product.slug}/${product.id}`}
                    className="hover:text-gray-900 transition-colors"
                >
                    <h3 className="text-xs sm:text-sm font-medium text-gray-800 flex-1 line-clamp-3 h-[48px] sm:h-[60px]">
                        {product.name}
                    </h3>
                </Link>
                <div className="mt-2 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    <span className="text-[0.7rem] font-medium uppercase tracking-wide text-green-500">
                        У наявності
                    </span>
                </div>
                <div className="mt-auto flex justify-between items-center">
                    <div className="flex flex-col">
                        {product.discount_percentage > 0 && (
                            <div className="text-sm text-gray-400 line-through leading-none">
                                ₴{product.price.toFixed(2)}
                            </div>
                        )}
                        <div className={`text-base font-bold leading-none ${product.discount_percentage > 0 ? "text-red-600" : "text-gray-900"}`}>
                            ₴{(product.discount_percentage > 0
                                ? product.price - (product.price * product.discount_percentage / 100)
                                : product.price).toFixed(2)}
                        </div>
                    </div>
                    <AddProductToCartButton productId={product.id} />
                </div>
            </div>
        </article>
    );
};
