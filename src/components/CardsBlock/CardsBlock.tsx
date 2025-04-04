import ItemCard from "../ItemCard/ItemCard";

export default async function CardsBlock({ items, className, itemClassName }: { items: any, className?: string, itemClassName?: string }) {
    return (
        <div className={className}>
            {items.map((product: any) => (
                <ItemCard key={product.id} product={product} className={itemClassName} />
            ))}
        </div>
    )
}