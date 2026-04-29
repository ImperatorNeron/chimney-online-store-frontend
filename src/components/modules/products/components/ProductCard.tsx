import Image from 'next/image';
import Link from 'next/link';
import AddProductToCartButton from './AddProductToCartButton';
import AddProductToLikeButton from './AddProductToLikeButton';
import ProductCharacteristics from '../../admin/components/orders/productCharacteristics';
import { ReadPreviewProductSchema } from '@/api/types/types';

export default function ProductCard({ product, className }: {
    product: ReadPreviewProductSchema;
    className?: string;
}) {
    const hasDiscount = product.discount_percentage > 0;
    const finalPrice = hasDiscount
        ? product.price - (product.price * product.discount_percentage / 100)
        : product.price;

    return (
        <article
            className={`${className} group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 flex flex-col overflow-hidden`}
            itemScope
            itemType="https://schema.org/Product"
        >
            <div className="relative aspect-square flex items-center">
                <Link
                    href={`/products/${product.slug}/${product.id}`}
                    className="w-full h-full flex items-center"
                    itemProp="url"
                >
                    <div className="relative aspect-square w-full max-w-[400px] overflow-hidden">
                        {product.preview ? (
                            <Image
                                src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}/${process.env.NEXT_PUBLIC_MEDIA_ITEMS}/${product.slug}/${product.preview.filename}`}
                                alt={product.preview.alt ?? 'Product image'}
                                fill
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
                                className="object-cover p-4 group-hover:scale-105 transition-transform duration-300 mx-auto"
                                itemProp="image"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400 text-sm">
                                Немає фото
                            </div>
                        )}
                    </div>
                </Link>

                {hasDiscount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2.5 py-1 text-xs font-semibold rounded-lg">
                        -{product.discount_percentage}%
                    </span>
                )}

                <AddProductToLikeButton productId={product.id} />
            </div>

            <div className="p-3.5 flex flex-col justify-between flex-1">
                <div className="flex flex-col gap-1.5">
                    <Link
                        href={`/products/${product.slug}/${product.id}`}
                        className="hover:text-gray-900 transition-colors"
                        itemProp="url"
                    >
                        <h3 className="text-xs sm:text-sm font-medium text-gray-800 line-clamp-2 leading-snug">
                            {product.name}
                        </h3>
                    </Link>

                    <ProductCharacteristics product={product} />
                </div>

                <div className="mt-3" itemScope itemProp="offers" itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="UAH" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />

                    <div className="flex items-center gap-1.5 mb-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[0.65rem] font-medium uppercase tracking-wide text-green-600">
                            У наявності
                        </span>
                    </div>

                    <div className="flex justify-between items-end">
                        <div className="flex flex-col">
                            {hasDiscount && (
                                <span className="text-xs text-gray-400 line-through leading-none mb-0.5">
                                    {product.price.toFixed(0)} ₴
                                </span>
                            )}
                            <span className={`text-lg font-bold leading-none ${hasDiscount ? "text-red-600" : "text-gray-900"}`} itemProp="price">
                                {finalPrice.toFixed(0)} ₴
                            </span>
                        </div>
                        <AddProductToCartButton productId={product.id} />
                    </div>
                </div>
            </div>
        </article>
    );
}
