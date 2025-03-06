import ItemCard from "@/components/ItemCard/ItemCard";

const ProductsGrid = () => {
    const products = [
        // Масив з 10 товарів (для прикладу 3, додайте решту)
        {
            id: 1,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 2,
            title: "Коліно димохідне двостінне 45° (Eco thermo AISI 201)",
            price: 699.0,
            oldPrice: 899.0,
            discount: 25,
            image: "/images/test.png",
        },
        {
            id: 3,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л ",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 4,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 5,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 699.0,
            oldPrice: 899.0,
            discount: 10,
            image: "/images/test.png",
        },
        {
            id: 6,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 7,
            title: "Коліно димохідне двостінне 45° (Eco thermo AISI 201)",
            price: 699.0,
            oldPrice: 899.0,
            discount: 25,
            image: "/images/test.png",
        },
        {
            id: 8,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 9,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 899.0,
            image: "/images/test.png",
        },
        {
            id: 10,
            title: "Труба димохідна діаметр Ø120 нерж товщина 1мм марка стали 321 з баком 70л",
            price: 699.0,
            oldPrice: 899.0,
            discount: 10,
            image: "/images/test.png",
        },
    ];

    return (
        <section className="max-w-7xl mx-auto py-6 lg:py-8">
            <h2 className="text-xl lg:text-3xl font-black mb-6 lg:mb-8 text-center uppercase tracking-tight">
                Найпопулярніші товари
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-3">
                {products.map((product) => (
                    <ItemCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductsGrid;