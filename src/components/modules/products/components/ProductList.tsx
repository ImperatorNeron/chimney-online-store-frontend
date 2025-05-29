import ProductCard from "./ProductCard";

export default function ProductList({ items, className, itemClassName }: { items: any, className?: string, itemClassName?: string }) {
    return (
        <div className={className} role="list">
            {items.map((product: any) => (
                <ProductCard key={product.id} product={product} className={itemClassName} />
            ))}
        </div>
    )
}