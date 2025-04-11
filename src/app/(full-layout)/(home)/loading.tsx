import LoadingProductList from "@/components/shared/LoadingProductList";

export default function LoadingPromoCards() {
    return (
        <>
            <section className="max-w-7xl mx-auto py-6 lg:py-8">
                <h2 className="text-xl lg:text-3xl font-black mb-6 lg:mb-8 text-center uppercase tracking-tight">
                    Найпопулярніші товари
                </h2>
                <LoadingProductList totalCards={10} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3" />;
            </section>
            <section className="max-w-7xl mx-auto py-6 lg:py-8">
                <h2 className="text-xl lg:text-3xl font-black mb-6 lg:mb-8 text-center uppercase tracking-tight">
                    Нові надходження
                </h2>
                <LoadingProductList totalCards={10} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3" />;
            </section>
        </>
    );
};