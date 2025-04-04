import ProductsGrid from "@/page-components/home/ProductGrid";

const Home = () => {
    return (
        <>
            <ProductsGrid title={"Найпопулярніші товари"} />
            <ProductsGrid title={"Нові надходження"} />
        </>
    );
}

export default Home;
