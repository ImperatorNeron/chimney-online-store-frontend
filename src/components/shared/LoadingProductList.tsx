import LoadingProductCard from "./LoadingProductCard";

export default function LoadingProductList({ totalCards, className, itemClassName }: { totalCards: number, className?: string, itemClassName?: string }) {
    return (
        <div className={className}>
            {Array.from({ length: totalCards }).map((_, index) => (
                <LoadingProductCard key={index} itemClassName={itemClassName} />
            ))}
        </div>
    )
} 