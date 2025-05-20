import FeedBackButton from "@/components/layout/FeedBackButton";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CartInitializer from "@/components/modules/cart/components/CartInitializer";
import LikeInitializer from "@/components/modules/profile/components/LikeInitializer";

export default function FullLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <CartInitializer />
            <LikeInitializer />
            <Header />
            <main className="max-w-screen-2xl mt-[72px] lg:mt-[114px] mx-auto px-3">
                {children}
            </main>
            <Footer />
            <FeedBackButton />
        </>
    );
};