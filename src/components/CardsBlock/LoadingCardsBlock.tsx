import LoadingItemCart from "../ItemCard/LoadingItemCard";

export default function LoadingCardsBlock({ totalCards, className, itemClassName }: { totalCards: number, className?: string, itemClassName?: string }) {
    return (
        <div className={className}>
            {Array.from({ length: totalCards }).map((_, index) => (
                <LoadingItemCart key={index} itemClassName={itemClassName}/>
            ))}
        </div>
    )
} 