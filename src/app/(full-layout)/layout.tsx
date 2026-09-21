import FeedBackButton from "@/components/layout/FeedBackButton";
import Footer from "@/components/layout/footer/Footer";
import Header from "@/components/layout/header/Header";
import CartInitializer from "@/components/modules/cart/components/CartInitializer";
import LikeInitializer from "@/components/modules/profile/components/LikeInitializer";

export const dynamic = "force-dynamic";

export default function FullLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col min-h-screen w-full">
            <CartInitializer />
            <LikeInitializer />
            <Header />
            
            {/* ГОЛОВНИЙ КОНТЕНТ */}
            <main className="
                flex-1                // розтягується по вертикалі
                w-full                // займає всю ширину батька
                max-w-screen-2xl      // але обмежена максимальна ширина
                mx-auto               // центрується після обмеження
                mt-[72px] lg:mt-[114px]
                px-3
            ">
                {children}
            </main>
            
            <Footer />
            <FeedBackButton />
        </div>
    );
};