import { Product } from '@/api/types/types';


export default function ProductCharacteristics({ product }: { product: Product }) {
    const characteristics = [
        product.diameter && `Діаметр: ${product.diameter} мм`,
        product.length && `Довжина: ${product.length} мм`,
        product.thickness && `Товщина: ${product.thickness} мм`,
        product.angle && product.angle !== "0" && `Кут: ${product.angle}°`,
        product.metal_type && `Метал: ${product.metal_type}`
    ].filter(Boolean).join(', ');

    return characteristics ? (
        <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {characteristics}
        </p>
    ) : null;
}
