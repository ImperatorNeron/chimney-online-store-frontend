import { Header } from "@/components/Header/Header";

export default function CatalogLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <Header />
            <main className="max-w-screen-2xl mt-20 lg:mt-32 mx-auto px-3">
                {children}
            </main>
        </>
    );
};