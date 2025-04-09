import CategoriesServer from "@/components/modules/categories/components/CategoriesServer";
import ProductsGrid from "@/components/modules/products/components/ProductGrid";

export default function Home() {
    return (
        <div className="space-y-16 sm:space-y-24 mt-8 sm:my-16">
            <CategoriesServer />
            <ProductsGrid title={"Найпопулярніші товари"} />
            <ProductsGrid title={"Нові надходження"} />
        </div>
    );
};
