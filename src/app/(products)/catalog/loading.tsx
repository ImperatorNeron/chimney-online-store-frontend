import LoadingCardsBlock from "@/components/CardsBlock/LoadingCardsBlock";

export default function LoadingPage() {
    return <LoadingCardsBlock totalCards={8} className="w-full md:w-3/4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3" />;
};