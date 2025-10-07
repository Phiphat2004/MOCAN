import Filter from "./Filter";
import ProductCard from "../../components/ProductCard";

export default function ProductPage() {
    const products = [
        {
            id: 1,
            name: "Vertical Striped Shirt",
            image: "/assets/Xaphong1.jpg",
            price: 212,
            oldPrice: 232,
            discount: "-20%",
            rating: 5.0,
        },
        {
            id: 2,
            name: "Courage Graphic T-shirt",
            image: "/assets/xaphong2.jpg",
            price: 145,
            rating: 4.0,
        },
        {
            id: 3,
            name: "Loose Fit Bermuda Shorts",
            image: "/assets/xaphong3.jpg",
            price: 80,
            rating: 3.0,
        },
        {
            id: 4,
            name: "Faded Skinny Jeans",
            image: "/assets/xaphong4.jpg",
            price: 210,
            rating: 4.5,
        },
        {
            id: 5,
            name: "Faded Skinny Jeans",
            image: "/assets/xaphong4.jpg",
            price: 210,
            rating: 4.5,
        },
        {
            id: 6,
            name: "Faded Skinny Jeans",
            image: "/assets/xaphong4.jpg",
            price: 210,
            rating: 4.5,
        },
        {
            id: 7,
            name: "Faded Skinny Jeans",
            image: "/assets/xaphong4.jpg",
            price: 210,
            rating: 4.5,
        },
    ];

    return (
        <div className="p-5 flex gap-6">
            {/* Filter */}
            <div className="w-1/5">
                <Filter />
            </div>
            {/* product */}
            <div className="w-4/5">
                <h1 className="font-bold text-2xl mb-4">Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
