import ProductList from "@/components/modules/products/components/ProductList";
import { productService } from "@/services/product.service";

export default async function ProductsGrid({ title }: { title: string }) {
    const paginationIn: PaginationIn = { offset: 0, limit: 10 }
    const { items } = await productService.fetchProducts(paginationIn);
    return (
        <section className="max-w-7xl mx-auto ">
            <h2 className="text-xl lg:text-3xl font-black mb-6 lg:mb-8 text-center uppercase tracking-tight">
                {title}
            </h2>
            <ProductList items={items} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3" />
        </section>
    );
};
