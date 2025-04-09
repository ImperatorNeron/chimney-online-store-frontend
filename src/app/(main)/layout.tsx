import { Header } from "@/components/Header/Header";

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="max-w-screen-2xl mt-[72px] lg:mt-[114px] mx-auto px-3">
                {children}
            </main>
        </>
    );
};