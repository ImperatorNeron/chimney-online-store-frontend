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
    return (
        <article
            className={`${className} group bg-white rounded-lg shadow hover:shadow-md transition-all duration-200 border border-gray-200 flex flex-col `}
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
                                src={`${process.env.NEXT_PUBLIC_MEDIA_PATH}/${product.slug}/${product.preview.filename}`}
                                alt={product.preview.alt ?? 'Product image'}
                                fill
                                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 400px"
                                className="object-cover p-3 hover:scale-105 transition-transform duration-200 mx-auto"
                                itemProp="image"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                                No Image
                            </div>
                        )}
                    </div>
                </Link>

                {product.discount_percentage > 0 && (
                    <span className="absolute top-1.5 left-1.5 bg-red-600 text-white px-2 py-0.5 text-[0.7rem] font-bold rounded">
                        -{product.discount_percentage}%
                    </span>
                )}

                <AddProductToLikeButton productId={product.id} />
            </div>

            <div className="p-3 flex flex-col justify-between h-full flex-1">
                <div className="flex flex-col gap-2">
                    <Link
                        href={`/products/${product.slug}/${product.id}`}
                        className="hover:text-gray-900 transition-colors"
                        itemProp="url"
                    >
                        <h3 className="text-xs sm:text-sm font-medium text-gray-800">
                            {product.name}
                        </h3>
                    </Link>

                    <ProductCharacteristics product={product} />
                </div>

                <div className='flex flex-col mt-1' itemScope itemProp="offers" itemType="https://schema.org/Offer">
                    <meta itemProp="priceCurrency" content="UAH" />
                    <meta itemProp="availability" content="https://schema.org/InStock" />
                    <div className="flex items-center gap-1.5 mt-2">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <span className="text-[0.7rem] font-medium uppercase tracking-wide text-green-500">
                            У наявності
                        </span>
                    </div>
                    <div className="flex justify-between items-end">
                        <div className="flex flex-col h-[30px] justify-center">
                            {product.discount_percentage > 0 && (
                                <div className="text-sm text-gray-400 line-through leading-none">
                                    ₴{product.price.toFixed(2)}
                                </div>
                            )}
                            <div className={`text-base font-bold leading-none ${product.discount_percentage > 0 ? "text-red-600" : "text-gray-900"}`} itemProp="price">
                                ₴{(product.discount_percentage > 0
                                    ? product.price - (product.price * product.discount_percentage / 100)
                                    : product.price).toFixed(2)}
                            </div>
                        </div>
                        <AddProductToCartButton productId={product.id} />
                    </div>
                </div>
            </div>
        </article>
    );
}
