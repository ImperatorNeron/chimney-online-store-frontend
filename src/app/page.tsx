import BannerSlider from "@/page-components/home/BannerSlider";
import FeaturesGrid from "@/page-components/home/Features";
import ProductsGrid from "@/page-components/home/ProductGrid";

const Home = () => {

    return (
        <div>
            <BannerSlider />
            <FeaturesGrid />
            <ProductsGrid />
        </div>
    );
}

export default Home;
