import CategoriesDesktopServer from "@/components/modules/categories/components/CategoriesDesktopServer";
import BannerSlider from "@/app/(full-layout)/(home)/components/BannerSlider";

export default function CatalogBanner() {
    return (
        <section className="my-4 grid grid-cols-1 gap-2 lg:grid-cols-[440px_minmax(0,1fr)]">
            <div className="hidden min-h-full lg:block">
                <CategoriesDesktopServer />
            </div>

            <div className="min-w-0">
                <BannerSlider />
            </div>
        </section>
    );
}