import Header from "@/components/layout/header/Header";
import CartInitializer from "@/components/modules/cart/components/CartInitializer";

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CartInitializer />
            <Header />
            <main className="max-w-screen-2xl mt-[72px] lg:mt-[114px] mx-auto px-3">
                {children}
            </main>
        </>
    );
};