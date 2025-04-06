import CategoriesServer from "@/page-components/home/categories/CategoriesServer";
import ProductsGrid from "@/page-components/home/ProductGrid";

const Home = () => {
    return (
        <div className="space-y-16 sm:space-y-24 mt-8 sm:my-16">
            <CategoriesServer />
            <ProductsGrid title={"Найпопулярніші товари"} />
            <ProductsGrid title={"Нові надходження"} />
        </div>
    );
}

export default Home;
