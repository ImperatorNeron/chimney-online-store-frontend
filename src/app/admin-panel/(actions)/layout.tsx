import BackToPageButton from "@/components/ui/BackToPageButton"

export default function AdminPanelLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <BackToPageButton href="/admin-panel" title="Повернутися до панелі адміністратора" />
            {children}
        </>

    )
}