import { Product } from '@/api/types/types';

export default function ProductCharacteristics({ product }: { product: Product }) {
    const characteristics = [
        product.diameter && `Діаметр: ${product.diameter} мм`,
        product.length && `Довжина: ${product.length} м`,
        product.thickness && `Товщина: ${product.thickness} мм`,
        product.angle && product.angle !== "0" && `Кут: ${product.angle}°`,
        product.metal_type && `Метал: ${product.metal_type}`
    ].filter(Boolean);

    return characteristics.length > 0 ? (
        <p className="text-xs text-gray-600 mt-1 flex flex-wrap gap-x-1">
            {characteristics.map((item, index) => (
                <span key={index} className="whitespace-nowrap">
                    {item}
                    {index < characteristics.length - 1 && ','}
                </span>
            ))}
        </p>
    ) : null;
}
